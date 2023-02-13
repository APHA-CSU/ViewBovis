import os
import glob

import pandas as pd
import numpy as np

# TODO: dataclass?
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

    # TODO: handle eartag in query string.
    # TODO: doctstring
    def submission_metadata(self, submission):
        sample_metadata = self.metadata.loc[submission]
        n_locs = int((sample_metadata.size - 9) / 4)
        move_dict = {}
        for loc_num in range(n_locs):
            if sample_metadata[f"Loc{loc_num+1}"] is np.nan:
                break
            move_dict[str(loc_num)] = \
                {"lat": self.latlon.loc[sample_metadata[f"Loc{loc_num+1}"]].lat,
                "lon": self.latlon.loc[sample_metadata[f"Loc{loc_num+1}"]].lon,
                "on_date": sample_metadata[f"Loc{loc_num+1}_StartDate"],
                "off_date": sample_metadata[f"Loc{loc_num+1}_EndDate"],
                "type": sample_metadata[f"Loc{loc_num+1}_type"]}
        return {"submission": submission,
                "clade": sample_metadata["Clade"],
                "identifier": sample_metadata["Identifier"],
                "species": sample_metadata["Host"],
                "slaughter_date": sample_metadata["SlaughterDate"],
                "cph": int(sample_metadata["CPH"]),
                "cphh": int(sample_metadata["CPHH"]),
                "cph_type": sample_metadata["CPH_type"],
                "county": sample_metadata["County"],
                "risk_area": sample_metadata["RiskArea"],
                "move": move_dict}
