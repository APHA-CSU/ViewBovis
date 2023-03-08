import sqlite3
from os import path

import pandas as pd

class ViewBovisData:
    def __init__(self, data_path):
        self._matrix_dir = path.join(data_path, "snp_matrix")
        db_path = path.join(data_path, "viewbovis.db")
        self._db = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
        self._cursor = self._db.cursor()
    
    def __del__(self):
        self._db.close()

    # TODO: validate input
    def _submission_metadata(self, submission: str) -> pd.DataFrame:
        """
            Fetches metadata for a given a submission. Returns a 
            DataFrame containing metadata if it exists, otherwise 
            returns None. 
        """
        query = "SELECT * FROM metadata WHERE Submission=:submission OR \
            Identifier=:submission"
        # get metadata entry for submission - read into DataFrame 
        df_sample = pd.read_sql_query(query, self._db, 
                                      params={"submission": submission})
        # TODO: below is dropping location columns with NULL but leaving
        # leaving all other columns this is done by splitting the df and
        # re-joining after: there is probably a nicer way to do this.
        df_sample_md = df_sample[df_sample.columns[:10]]
        df_sample_locs = df_sample[df_sample.columns[10:]].dropna(axis=1)
        return df_sample_md.join(df_sample_locs)

    # TODO: validate input
    def _get_lat_long(self, cph: str) -> tuple:
        """
            Returns a tuple containing latitude and longitude for a 
            given cph 
        """
        query = "SELECT Lat, Long FROM latlon WHERE CPH=:cph"
        res = self._cursor.execute(query, {"cph": cph})
        return res.fetchall()[0]

    def submission_movement_metadata(self, submission: str) -> dict:
        """
            Returns metadata and movement data for 'submission' as a 
            dictionary. 
        """
        df_sample_md = self._submission_metadata(submission)
        # calculated the number of locations
        n_locs = int((len(df_sample_md.columns) - 9) / 6)
        move_dict = {}
        for loc_num in range(n_locs):
            cph = df_sample_md[f"Loc{loc_num}"][0]
            sample_latlon = self._get_lat_long(cph)
            move_dict[str(loc_num)] = \
                {"lat": sample_latlon[0],
                 "lon": sample_latlon[1],
                 "on_date": df_sample_md[f"Loc{loc_num}_StartDate"][0], 
                 "off_date": df_sample_md[f"Loc{loc_num}_EndDate"][0], 
                 "type": df_sample_md[f"Loc{loc_num}_Type"][0]} 
        return {"submission": submission,
                "clade": df_sample_md["Clade"][0],
                "identifier": df_sample_md["Identifier"][0],
                "species": df_sample_md["Host"][0],
                "slaughter_date": df_sample_md["SlaughterDate"][0],
                "cph": df_sample_md["CPH"][0],
                "cphh": df_sample_md["CPHH"][0],
                "cph_type": df_sample_md["CPH_Type"][0],
                "county": df_sample_md["County"][0],
                "risk_area": df_sample_md["RiskArea"][0],
                "move": move_dict}

    def related_submissions_metadata(self, 
                                     submission: str, 
                                     snp_threshold: int) -> dict:
        # retrieve af_number if Identifier is used
        df_sample_md = self._submission_metadata(submission)
        af_number = df_sample_md["Submission"][0]
        clade = df_sample_md["Clade"][0]
        df_snp_data = pd.read_csv(path.join(self._matrix_dir, 
                                            f"{clade}_matrix.csv"), 
                                  usecols=["snp-dists 0.7.0", af_number], 
                                  index_col="snp-dists 0.7.0")
        df_snp_data.rename({af_number: "snp_dist"}, axis=1, inplace=True)
        df_snp_data.index.names = ["Submission"]
        # get samples within snp_threshold
        df_related = df_snp_data.loc[df_snp_data["snp_dist"]<=snp_threshold]
        related_metadata = {}
        for index, row in df_related.iterrows():
            df_related_sample_md = self._submission_metadata(index)
            if not df_related_sample_md.empty and \
                  df_related_sample_md["Host"]=="Cow":
                sample_latlon = \
                    self._get_lat_long(df_related_sample_md["CPH"][0])
                related_metadata[index] = \
                    {"lat": sample_latlon[0], 
                    "lon": sample_latlon[1], 
                    "snp_distance": int(row["snp_dist"]), 
                    "animal_id": df_related_sample_md["Identifier"][0], 
                    "date": df_related_sample_md["wsdSlaughterDate"][0]}
        return related_metadata
