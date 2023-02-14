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

    # TODO: handle eartag in query string.
    def submission_metadata(self, submission):
        """
            Returns metadata and movement data for 'submission' as a 
            dictionary. 
        """
        query = f"SELECT * FROM metadata WHERE Submission='{submission}'"
        # get metadata entry for submission - read into DataFrame 
        df_sample_md = pd.read_sql_query(query, self._db).dropna(axis=1)
        # calculated the number of locations
        n_locs = int((len(df_sample_md.columns) - 9) / 4)
        move_dict = {}
        for loc_num in range(n_locs):
            # get latlon data for cph of location loc_num
            query = f"SELECT latlon.* FROM latlon LEFT JOIN metadata ON \
                latlon.cph = metadata.Loc{loc_num+1} \
                    WHERE metadata.Submission='{submission}'"
            res = self._cursor.execute(query)
            sample_latlon = res.fetchall()[0][3:5]
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
