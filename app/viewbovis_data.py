import sqlite3
import glob
from os import path

import numpy as np
import pandas as pd


class InvalidIdException(Exception):
    def __init__(self, id, database):
        meta_query = """SELECT * FROM metadata WHERE Submission=:id or
                        Identifier=:id"""
        meta_data = pd.read_sql_query(meta_query, database,
                                      index_col="Submission",
                                      params={"id": id})
        wgs_query = "SELECT * FROM wgs_metadata WHERE Submission=:id"
        wgs_data = pd.read_sql_query(wgs_query, database,
                                     index_col="Submission",
                                     params={"id": id})
        if not meta_data.empty:
            self.message = f"missing wgs data for {id}"
        elif not wgs_data.empty:
            self.message = f"missing metadata data for {id}"
        else:
            self.message = f"{id} does not exist"

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
            DataFrame containing metadata if it exists in both metadata
            and wgs_metadata, otherwise returns an empty DataFrame.
        """
        query = f"""SELECT metadata.* FROM wgs_metadata INNER JOIN metadata
                    ON metadata.Submission=wgs_metadata.Submission WHERE
                    metadata.Submission IN ({','.join('?' * len(ids))}) OR
                    metadata.Identifier IN ({','.join('?' * len(ids))}) """
        return pd.read_sql_query(query,
                                 self._db,
                                 index_col="Submission",
                                 params=ids+ids)

    # TODO: validate input
    def _submission_movdata(self, submission: str) -> pd.DataFrame:
        """
            Fetches movement data for a given Submission. Returns an
            empty DataFrame if no data exists.
        """
        query = "SELECT * FROM movements WHERE Submission=:submission"
        return pd.read_sql_query(query,
                                 self._db,
                                 index_col="Submission",
                                 params={"submission": submission})

    def _get_lat_long(self, cphs: list) -> tuple:
        """
            Fetches latitude, longitude, x and y for a given a list of
            CPHs. Returns a DataFrame with columns 'lat', 'lon', 'x',
            'y' and the corresponding CPH in the index.
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
        # get metadata for a single id
        df_metadata_sub = self._submission_metadata([id])
        if df_metadata_sub.empty:
            raise InvalidIdException(id, database=self._db)
        df_movements = self._submission_movdata(df_metadata_sub.index[0])
        df_cph_latlon_map = self._get_lat_long(df_movements["Loc"].to_list())
        # construct dictionary of movement data
        move_dict = {str(row["Loc_Num"]):
                     {"cph": row["Loc"][0],
                      "lat": df_cph_latlon_map["Lat"][row["Loc"]],
                      "lon": df_cph_latlon_map["Long"][row["Loc"]],
                      "on_date": row["Loc_StartDate"],
                      "off_date": row["Loc_EndDate"],
                      "stay_length": row["Loc_Duration"],
                      "type": row["CPH_Type"],
                      "county": row["County"]}
                     for _, row in df_movements.iterrows()}
        return {"submission": df_metadata_sub.index[0],
                "clade": df_metadata_sub["Clade"][0],
                "identifier": df_metadata_sub["Identifier"][0],
                "species": df_metadata_sub["Host"][0],
                "animal_type": df_metadata_sub["Animal_Type"][0],
                "slaughter_date": df_metadata_sub["SlaughterDate"][0],
                "cph": df_metadata_sub["CPH"][0],
                "cphh": df_metadata_sub["CPHH"][0],
                "cph_type": df_metadata_sub["CPH_Type"][0],
                "county": df_metadata_sub["County"][0],
                "risk_area": df_metadata_sub["RiskArea"][0],
                "out_of_homerange": df_metadata_sub["OutsideHomeRange"][0],
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
                        "herd": herd cph,
                        "clade": clade of sample,
                        "date": date of slaughter,
                        "distance": distance to the sample of interest
                            in miles}
        """
        # retrieve submission number if eartag is used
        df_metadata_sub = self._submission_metadata([id])
        if df_metadata_sub.empty:
            raise InvalidIdException(id, database=self._db)
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
                 "herd": row["CPHH"],
                 "clade": row["Clade"],
                 "date": row["SlaughterDate"],
                 "distance": np.sqrt((df_cph_latlon_map["x"][row["CPH"]] -
                                      df_cph_latlon_map["x"]
                                      [df_metadata_sub["CPH"][0]])**2 +
                                     (df_cph_latlon_map["y"][row["CPH"]] -
                                      df_cph_latlon_map["y"]
                                      [df_metadata_sub["CPH"][0]])**2) / 1609}
                for index, row in df_metadata_related.iterrows()
                if row["Host"] == "COW"}

    # TODO: not just cows TODO: DRY
    def snp_matrix(self, id: str, snp_threshold: int) -> dict:
        """
        """
        # retrieve submission number if eartag is used
        df_metadata_sub = self._submission_metadata([id])
        if df_metadata_sub.empty:
            raise InvalidIdException(id, database=self._db)
        submission = df_metadata_sub.index[0]
        # retrieve sample name from submission number
        sample_name = self._submission_to_sample(submission)
        clade = df_metadata_sub["Clade"][0]
        # load snp matrix for the required clade
        matrix_path = glob.glob(path.join(self._matrix_dir,
                                          f"{clade}_*_matrix.csv"))
        df_snps = pd.read_csv(matrix_path[0], index_col="snp-dists 0.8.2")
        # get samples within snp_threshold
        related_samples = df_snps.loc[df_snps[sample_name] <= snp_threshold].\
            index.to_list()
        df_snps_related = df_snps.loc[related_samples, related_samples].copy()
        # TODO: below line not inplace!!!
        df_snps_related.index.rename(None, inplace=True)
        # map the index and columns from sample name to submission number
        df_snps_related_processed = df_snps_related.copy().\
            set_index(df_snps_related.index.
                      map(lambda x: self._sample_to_submission(x))).\
            transpose().set_index(df_snps_related.index.
                                  map(lambda x: self._sample_to_submission(x)))
        # restructure matrix
        snps_related = df_snps_related_processed.copy().stack().\
            reset_index().values.tolist()
        # get metadata for all related samples
        df_metadata_related = \
            self._submission_metadata(df_snps_related_processed.index.to_list())
        # get lat/long mappings for CPH of related samples
        cph_set = set(df_metadata_related["CPH"].to_list())
        df_cph_latlon_map = self._get_lat_long(list(cph_set))
        # construct data response for client
        return \
            dict({index:
                 {"animal_id": row["Identifier"],
                  "herd": row["CPHH"],
                  "clade": row["Clade"],
                  "date": row["SlaughterDate"],
                  "distance": np.sqrt((df_cph_latlon_map["x"][row["CPH"]] -
                                       df_cph_latlon_map["x"]
                                       [df_metadata_sub["CPH"][0]])**2 +
                                      (df_cph_latlon_map["y"][row["CPH"]] -
                                       df_cph_latlon_map["y"]
                                       [df_metadata_sub["CPH"][0]])**2) / 1609}
                  for index, row in df_metadata_related.iterrows()
                  if row["Host"] == "COW"}, **{"matrix": snps_related})
