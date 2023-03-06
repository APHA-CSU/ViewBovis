import sqlite3
from os import path

import pandas as pd

def run():
    data_path = "/home/nickpestell/tmp/viewbovis/"
    DEFAULT_DB_PATH = \
        path.join(path.dirname(path.abspath(__file__)), "data/viewbovis.db")
    conn = sqlite3.connect(DEFAULT_DB_PATH)
    # write metadata to sqlite db
    df_metadata = pd.read_csv(data_path + "WGS_WarehouseExport_Samples.csv", 
                              index_col="Submission", dtype=str)
    df_metadata.to_sql("metadata", conn, if_exists="replace")
    # write lat-lon data to sqlite db
    df_latlon = pd.read_csv(data_path + "WGS_WarehouseExport_Locations.csv", 
                            index_col="CPH", dtype={"CPH": str, 
                                                    #"x": int, 
                                                    #"y": int, 
                                                    "Lat": float,
                                                    "Long": float})
    df_latlon.to_sql("latlon", conn, if_exists="replace")
    conn.close()

if __name__ == "__main__":
    run()
