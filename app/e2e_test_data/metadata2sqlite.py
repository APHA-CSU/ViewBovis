#!/usr/bin/env python3

import sqlite3
import argparse

import pandas as pd

"""
    Builds a sqlite database from 'metadata' and 'latlon' csv files.
    Writes one database file, 'viewbovis.db', to the working directory.
"""


def convert_to_sqlite(wgs_metadata_path, metadata_path, movements_path,
                      latlon_path, excluded_path):
    conn = sqlite3.connect("viewbovis.db")
    # write filtered wgs metadata to sqlite db
    df_wgs_metadata = pd.read_csv(wgs_metadata_path, index_col="Submission",
                                  dtype=str)
    df_wgs_metadata.to_sql("wgs_metadata", con=conn, if_exists="replace")
    # write metadata to sqlite db
    df_metadata = pd.read_csv(metadata_path, index_col="Submission",
                              dtype=str)
    df_metadata.to_sql("metadata", con=conn, if_exists="replace")
    # write movements to sqlite db
    df_movements = pd.read_csv(movements_path, index_col="Submission",
                               dtype=str)
    df_movements.to_sql("movements", con=conn, if_exists="replace")
    # write lat-lon data to sqlite db
    df_locations = pd.read_csv(latlon_path, index_col="CPH",
                               dtype={"CPH": str, "Lat": float, "Long": float})
    df_locations.to_sql("latlon", con=conn, if_exists="replace")
    # write excluded samples data to sqlite db
    df_excluded = pd.read_csv(excluded_path, index_col="Submission",
                              dtype={"Submission": str, "Exclusion": str})
    df_excluded.to_sql("excluded", con=conn, if_exists="replace")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--wgs_metadata_path', default="test_wgs.csv",
                        help='path to filteredWgsMetadata.csv')
    parser.add_argument('--metadata_path', default="test_samples.csv",
                        help='path to metadata.csv')
    parser.add_argument('--movements_path', default="test_movements.csv",
                        help='path to movements.csv')
    parser.add_argument('--latlon_path', default="test_locations.csv",
                        help='path to latlon.csv')
    parser.add_argument('--excluded_path', default="test_excluded.csv",
                        help='path to all_excluded.csv')
    args = parser.parse_args()
    convert_to_sqlite(**vars(args))
