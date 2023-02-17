from flask import Flask, jsonify, render_template, request, g 
from liveserver import LiveServer

from viewbovis_data import ViewBovisData

app = Flask(__name__)

ls = LiveServer(app)

def get_data_object():
    """
        Creates a Data object if one does not already exist in the 
        application context. Assigns the Data object as an atribute to 
        the application context. Creating the data object connects to 
        the database. This function is called before every request.
    """
    if not hasattr(g, "data"):
        g.data = ViewBovisData()

@app.teardown_appcontext
def disconnect_db(exception):
    """
        Closes the database connection and delete the database object. 
        Called automatically when the application conext ends.
    """
    if hasattr(g, 'data'):
        g.data.__del__()
        del g.data

@app.route("/")
def home():
    return ls.render_template("index.html")

@app.route("/sample")
def sample():
    """
        Returns meta and movement data in json format for a single 
        sample in respone to a client GET request at route /sample/,
        with the sample_name encoded in the URL query string; e.g. 
        "/sample?sample_name=AF-61-04255-17". 
    """
    get_data_object()
    sample_name = request.args.get("sample_name")
    return jsonify(g.data.submission_metadata(sample_name))

@app.route("/related")
def related_samples():
    """
        Returns meta and SNP distance data in json format for all 
        samples within a given SNP distance of the selected sample in 
        response to a client GET request on route /related/ with the
        sample_name and snp_distance encoded in the URL query string;
        e.g. "/related?sample_name=AF-61-04255-17&snp_distance=5".
    """
    get_data_object()
    sample_name = request.args.get("sample_name")
    snp_dist = request.args.get("snp_distance")
    return jsonify(g.data.related_submissions_metadata(sample_name, snp_dist))