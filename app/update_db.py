import sqlite3
import glob
import os

import pandas as pd

def run():
    data_path = "/home/nickpestell/tmp/viewbovis/"
    # parse data CSVs
    df_metadata = pd.read_csv(data_path + "table_1.csv", index_col="Submission", 
                              dtype=str)
    df_latlon = pd.read_csv(data_path + "table_2.csv", index_col="cph", 
                            dtype={"cph": str, 
                                   "x": int, 
                                   "y": int, 
                                   "lat": float,
                                   "lon": float})
    df_snps = {}
    for matrix_path in glob.glob(os.path.join(data_path, "*_matrix.csv")):
        df_snps[os.path.basename(matrix_path).split("_", maxsplit=1)[0]] = \
        pd.read_csv(matrix_path, index_col="submission")
    # connect to sqlite db
    conn = sqlite3.connect("viewbovis.db")
    # write metadata to sqlite db
    df_metadata.to_sql("metadata", con=conn, if_exists="replace")
    # write lat-lon data to sqlite db
    df_latlon.to_sql("latlon", con=conn, if_exists="replace")
    # write snp data to sqlite db - 1 table per sample
    for sample in df_snps.columns:
        df_snps.loc[:, sample].to_frame().rename({sample: "snp_dist"}, axis=1).\
            to_sql(sample, con=conn, if_exists="replace")

if __name__ == "__main__":
    run()