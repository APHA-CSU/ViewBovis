import sqlite3
from os import path

import pandas as pd

class ViewBovisData:
    _DEFAULT_DB_PATH = \
        path.join(path.dirname(path.dirname(path.abspath(__file__))), 
                  "viewbovis.db")

    def __init__(self, db_path=_DEFAULT_DB_PATH):
        self._db = sqlite3.connect(db_path)
        self._cursor = self._db.cursor()
    
    def __del__(self):
        self._db.close()

    def submission_metadata(self, submission):
        """
            Returns metadata and movement data for 'submission' as a 
            dictionary. 
        """
        query = f"SELECT * FROM metadata WHERE Submission='{submission}' or \
            Identifier='{submission}'"
        # get metadata entry for submission - read into DataFrame 
        df_sample_md = pd.read_sql_query(query, self._db).dropna(axis=1)
        # calculated the number of locations
        n_locs = int((len(df_sample_md.columns) - 9) / 4)
        move_dict = {}
        for loc_num in range(n_locs):
            # get latlon data for cph of location loc_num
            query = f"SELECT latlon.lat, latlon.lon FROM latlon JOIN metadata \
                ON latlon.cph=metadata.Loc{loc_num+1} WHERE \
                    metadata.Submission='{submission}' or \
                        metadata.Identifier='{submission}'"
            res = self._cursor.execute(query)
            sample_latlon = res.fetchall()[0]
            move_dict[str(loc_num)] = \
                {"lat": sample_latlon[0],
                "lon": sample_latlon[1],
                "on_date": df_sample_md[f"Loc{loc_num+1}_StartDate"][0], 
                "off_date": df_sample_md[f"Loc{loc_num+1}_EndDate"][0], 
                "type": df_sample_md[f"Loc{loc_num+1}_type"][0]} 
        return {"submission": submission,
                "clade": df_sample_md["Clade"][0],
                "identifier": df_sample_md["Identifier"][0],
                "species": df_sample_md["Host"][0],
                "slaughter_date": df_sample_md["SlaughterDate"][0],
                "cph": int(df_sample_md["CPH"][0]),
                "cphh": int(df_sample_md["CPHH"][0]),
                "cph_type": df_sample_md["CPH_type"][0],
                "county": df_sample_md["County"][0],
                "risk_area": df_sample_md["RiskArea"][0],
                "move": move_dict}

    def related_submissions_metadata(self, submission, snp_dist):
        """
        TODO: this is failing atm because of this CPH mismatch between latlon tables and metadata tables, where the latlon table has '/'
        """
        # retrieve af_number if Identifier is used
        query = f"SELECT Submission FROM metadata WHERE \
            Submission='{submission}' or Identifier='{submission}'"
        res = self._cursor.execute(query)
        af_number = res.fetchall()[0][0]
        # get samples within snp_dist by querying snp_matrix data
        query = f"SELECT * FROM '{af_number}' WHERE snp_dist<={snp_dist}"
        res = self._cursor.execute(query)
        related_samples = res.fetchall()
        related_sample_metadata = {}
        for sample in related_samples:
            query = f"SELECT metadata.Identifier, metadata.SlaughterDate, \
                latlon.lat, latlon.lon FROM metadata JOIN latlon ON \
                    metadata.CPH=latlon.cph WHERE \
                        metadata.Submission='{sample[0]}'"
            df_sample_md = pd.read_sql_query(query, self._db).dropna(axis=1)
            related_sample_metadata[sample[0]] = \
                {"lat": df_sample_md["lat"], 
                 "lon": df_sample_md["lon"], 
                 "snp_distance": sample[1],
                 "animal_id": df_sample_md["Identifier"],
                 "date": df_sample_md["SlaughterDate"]}
        return related_sample_metadata
