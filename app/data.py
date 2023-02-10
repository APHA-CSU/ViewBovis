import os
import glob

import pandas as pd

class Data:
    def __init__(self, data_path):
        self.metadata = pd.read_csv(os.path.join(data_path, "table_1.csv"), 
                                    index_col="Submission", dtype=str)
        self.latlon = pd.read_csv(os.path.join(data_path, "table_2.csv"),
                                  index_col="cph", dtype={"cph": str, 
                                                          "x": int,
                                                          "y": int, 
                                                          "lat": float,
                                                          "lon": float})
        self.snps = {}
        for matrix_path in glob.glob(os.path.join(data_path, "*_matrix.csv")):
           self.snps[os.path.basename(matrix_path).split("_", maxsplit=1)[0]] = \
            pd.read_csv(matrix_path, index_col="submission")