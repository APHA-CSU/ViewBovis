import json

from flask import Flask, jsonify, render_template, request
import numpy as np

from data import Data

app = Flask(__name__)

# production data
data_path = "/home/nickpestell/tmp/viewbovis/"
data = Data(data_path)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/sample")
def sample_data():
    """
        Returns meta and movement data in json format for a single 
        sample in respone to a client GET request at the route /sample/
        with the sample_name encoded in the URL query string. 
    """
    sample_name = request.args.get("sample_name")
    sample_metadata = data.metadata.loc[sample_name]
    n_locs = int((sample_metadata.size - 9) / 4)
    move_dict = {}
    for loc_num in range(n_locs):
        if sample_metadata[f"Loc{loc_num+1}"] is np.nan:
            break
        move_dict[str(loc_num)] = \
            {"lat": data.latlon.loc[sample_metadata[f"Loc{loc_num+1}"]].lat,
             "lon": data.latlon.loc[sample_metadata[f"Loc{loc_num+1}"]].lon,
             "on_date": sample_metadata[f"Loc{loc_num+1}_StartDate"],
             "off_date": sample_metadata[f"Loc{loc_num+1}_EndDate"],
             "type": sample_metadata[f"Loc{loc_num+1}_type"]}
    sample_metadata_dict = {"submission": sample_name,
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
    with open("sample_metadta.json", "w") as outfile:
        json.dump(sample_metadata_dict, outfile)
    return jsonify(sample_metadata_dict)
