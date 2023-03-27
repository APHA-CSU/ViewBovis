import sqlite3
import glob
from os import path

import pandas as pd


class InvalidIdException(Exception):
    def __init__(self, message="ID does not match a valid eartag or AF-number"):
        super().__init__(message)
        self.message = message

    def __str__(self):
        return self.message


class ViewBovisData:
    def __init__(self, data_path):
        self._matrix_dir = path.join(data_path, "snp_matrix")
        db_path = path.join(data_path, "viewbovis.db")
        self._db = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
        self._cursor = self._db.cursor()

    def __del__(self):
        self._db.close()

    # TODO: validate input
    def _submission_metadata(self, ids: list) -> pd.DataFrame:
        """
            Fetches metadata for a given a list of ids. Returns a
            DataFrame containing metadata if it exists, otherwise
            returns an empty DataFrame.
        """
        query = f"""SELECT * FROM metadata WHERE Submission IN
                    ({','.join('?' * len(ids))}) OR Identifier IN
                    ({','.join('?' * len(ids))})"""
        return pd.read_sql_query(query,
                                 self._db,
                                 index_col="Submission",
                                 params=ids+ids)

    def _clean_metadata(self, df_metadata: pd.DataFrame) -> pd.DataFrame:
        """
            Removes NULL columns from location data in metadata
            DataFrame. Use only for DataFrame with single row.
        """
        if len(df_metadata) > 1:
            # TODO: custom exception
            raise Exception("DataFrame must contain only one row")
        # TODO: below is dropping location columns with NULL but leaving
        # all other columns this is done by splitting the df and
        # re-joining after: there is probably a nicer way to do this.
        df_metadata_0 = df_metadata[df_metadata.columns[:9]]
        df_metadata_1 = df_metadata[df_metadata.columns[9:]].dropna(axis=1)
        return df_metadata_0.join(df_metadata_1)

    # TODO: validate input
    def _get_lat_long(self, cphs: list) -> tuple:
        """
            Fetches latitude and longitude for a given a list of CPHs.
            Returns a DataFrame with columns 'lat' and 'lon' and the
            corresponding CPH in the index.
        """
        query = f"""SELECT * FROM latlon WHERE CPH IN
                   ({','.join('?' * len(cphs))})"""
        return pd.read_sql_query(query,
                                 self._db,
                                 index_col="CPH",
                                 params=cphs)

    def _submission_to_sample(self, submission: str) -> str:
        """
            Maps a sample name to submission number.
        """
        query = "SELECT * FROM wgs_metadata WHERE Submission=:submission"
        df_wgs_sub = pd.read_sql_query(query, self._db,
                                       params={"submission": submission})
        if df_wgs_sub.empty:
            # TODO: custom exception
            raise Exception(f"No WGS data for {submission}")
        return df_wgs_sub["Sample"][0]

    def _sample_to_submission(self, sample: str) -> str:
        """
            Maps a submission number to sample name.
        """
        query = "SELECT * FROM wgs_metadata WHERE Sample=:sample"
        df_wgs_sub = pd.read_sql_query(query, self._db,
                                       params={"sample": sample})
        if df_wgs_sub.empty:
            return None
        return df_wgs_sub["Submission"][0]

    def submission_movement_metadata(self, id: str) -> dict:
        """
            Returns metadata and movement data for 'id' as a dictionary.
        """
        # get cleaned metadata for a single id
        df_metadata_sub = self._submission_metadata([id])\
            .pipe(self._clean_metadata)
        if df_metadata_sub.empty:
            raise InvalidIdException(
                    f"'{id}' does not match a valid eartag or AF-number")
        # calculated the number of locations
        n_locs = len(df_metadata_sub.columns[10::5])
        # get lat/long mappings for CPH of movement data
        df_cph_latlon_map = \
            self._get_lat_long(
                [df_metadata_sub[f"Loc{loc_num}"][0] for loc_num in range(n_locs)])
        # construct dictionary of movement data
        move_dict = {str(loc_num):
                     {"cph":
                         df_metadata_sub[f"Loc{loc_num}"][0],
                      "lat":
                         df_cph_latlon_map["Lat"][df_metadata_sub[f"Loc{loc_num}"][0]],
                      "lon":
                         df_cph_latlon_map["Long"][df_metadata_sub[f"Loc{loc_num}"][0]],
                      "on_date":
                         df_metadata_sub[f"Loc{loc_num}_StartDate"][0],
                      "off_date":
                         df_metadata_sub[f"Loc{loc_num}_EndDate"][0],
                      "stay_length":
                         df_metadata_sub[f"Loc{loc_num}_Duration"][0],
                      "type": df_metadata_sub[f"Loc{loc_num}_Type"][0]}
                     for loc_num in range(n_locs)}
        return {"submission": df_metadata_sub.index[0],
                "clade": df_metadata_sub["Clade"][0],
                "identifier": df_metadata_sub["Identifier"][0],
                "species": df_metadata_sub["Host"][0],
                "slaughter_date": df_metadata_sub["SlaughterDate"][0],
                "cph": df_metadata_sub["CPH"][0],
                "cphh": df_metadata_sub["CPHH"][0],
                "cph_type": df_metadata_sub["CPH_Type"][0],
                "county": df_metadata_sub["County"][0],
                "risk_area": df_metadata_sub["RiskArea"][0],
                "move": move_dict}

    # TODO: not just cows
    def related_submissions_metadata(self,
                                     id: str,
                                     snp_threshold: int) -> dict:
        """
            Returns metadata for genetically related submissions.

            Parameters:
                id (str): eartag or submission number for sample of
                interest.

                snp_threshold (str): maximum SNP distance for genetic
                related samples

            Returns:
                metadata (dict): metadata for related samples
                    {submission_number:
                        "lat": latitude,
                        "lon": longitude,
                        "snp_distance": SNPs to sample of interest,
                        "animal_id": eartag,
                        "date": date of slaughter}
        """
        # retrieve submission number if eartag is used
        df_metadata_sub = self._submission_metadata([id])
        if df_metadata_sub.empty:
            raise \
                Exception(f"'{id}' does not match a valid eartag or AF-number")
        submission = df_metadata_sub.index[0]
        # retrieve sample name from submission number
        sample_name = self._submission_to_sample(submission)
        clade = df_metadata_sub["Clade"][0]
        # load snp matrix for the required clade
        matrix_path = glob.glob(path.join(self._matrix_dir,
                                          f"{clade}_*_matrix.csv"))
        df_snps = pd.read_csv(matrix_path[0],
                              usecols=["snp-dists 0.8.2", sample_name],
                              index_col="snp-dists 0.8.2")
        # get samples within snp_threshold
        df_snps_related = df_snps.loc[df_snps[sample_name] <= snp_threshold]
        # map the index from sample name to submission number
        df_snps_related_processed = df_snps_related.copy().\
            set_index(df_snps_related.index.
                      map(lambda x: self._sample_to_submission(x))).\
            rename({sample_name: "snp_dist"}, axis=1)
        # get metadata for all related samples
        df_metadata_related = \
            self._submission_metadata(df_snps_related_processed.index.to_list())
        # get lat/long mappings for CPH of related samples
        cph_set = set(df_metadata_related["CPH"].to_list())
        df_cph_latlon_map = self._get_lat_long(list(cph_set))
        # construct data response for client
        return {index:
                {"lat": df_cph_latlon_map["Lat"][row["CPH"]],
                 "lon": df_cph_latlon_map["Long"][row["CPH"]],
                 "snp_distance":
                    int(df_snps_related_processed["snp_dist"][index]),
                 "animal_id": row["Identifier"],
                 "date": row["SlaughterDate"]}
                for index, row in df_metadata_related.iterrows()
                if row["Host"] == "COW"}
