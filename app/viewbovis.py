from flask import Flask, jsonify, render_template, request
import pandas as pd
from liveserver import LiveServer

app = Flask(__name__)

ls = LiveServer(app)

metadata = pd.DataFrame(
    {
        "sample": ["A", "B"],
        "mov1": [[52.478146, 0.796967, "Farm1"], [51.81296, -1.738453, "AF-12-00001-22"]],
        "mov2": [[52.452912, 1.123962, "Farm2"], [52.32055, -1.871136, "AF-12-00001-22"]]
    }
)

@app.route("/")
def home():
    return ls.render_template("index.html")

@app.route("/sample")
def sample_data():
    sample_name = request.args.get("sample_name")
    data = metadata.loc[metadata["sample"]==sample_name]
    return jsonify(data.to_dict())

