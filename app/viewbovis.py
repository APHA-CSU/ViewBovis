from flask import Flask, jsonify, render_template, request
from liveserver import LiveServer

from data import Data

# production data
data_path = "/home/nickpestell/tmp/viewbovis/"
data = Data(data_path)

app = Flask(__name__)

ls = LiveServer(app)

@app.route("/")
def home():
    return ls.render_template("index.html")

# TODO: handle eartag in query string.
@app.route("/sample")
def sample_data():
    """
        Returns meta and movement data in json format for a single 
        sample in respone to a client GET request at route /sample/,
        with the sample_name encoded in the URL query string; e.g. 
        "/sample?sample_name=AF-61-04255-17". 
    """
    sample_name = request.args.get("sample_name")
    return jsonify(data.submission_metadata(sample_name))
