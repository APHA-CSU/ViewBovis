from flask import Flask, jsonify, render_template, request, g
from liveserver import LiveServer

from viewbovis_data import ViewBovisData
from viewbovis_data import InvalidIdException

app = Flask(__name__)

ls = LiveServer(app)


def get_data_object(id):
    """
        Creates a Data object if one does not already exist in the
        application context. Assigns the Data object as an attribute to
        the application context. Creating the data object connects to
        the database. This also loads key data for the sample of
        interest (SOI) (id) and assigns these data to attributes of the
        application context. This function is called before every
        request.
    """
    if not hasattr(g, "data"):
        g.data = ViewBovisData(app.data_path, id)


@app.teardown_appcontext
def disconnect_db(exception):
    """
        Closes the database connection and delete the database object.
        Called automatically when the application context ends.
    """
    if hasattr(g, 'data'):
        g.data.__del__()
        del g.data


@app.route("/")
def home():
    return ls.render_template("index.html")


@app.route("/sample", methods=["GET"])
def sample():
    """
        Returns meta and movement data in json format for the SOI in
        response to a client GET request at route /sample/, with the
        sample_name encoded in the URL query string; e.g.
        "/sample?sample_name=AF-61-04255-17".
    """
    id = request.args.get("sample_name")
    get_data_object(id)
    return jsonify(g.data.submission_movement_metadata())


@app.route("/sample/related", methods=["GET"])
def related_samples():
    """
        Returns meta and SNP distance data in json format for all
        samples within a given SNP distance of the SOI in response to a
        client GET request on route /sample/related with the
        sample_name and snp_distance encoded in the URL query string;
        e.g. "/sample/related?sample_name=AF-61-04255-17&snp_distance=5".
    """
    id = request.args.get("sample_name")
    snp_threshold = int(request.args.get("snp_distance"))
    get_data_object(id)
    return jsonify(g.data.related_submissions_metadata(snp_threshold))


@app.route("/sample/matrix", methods=["GET"])
def snp_matrix():
    """
        Returns meta SNP matrix data in json format for all samples
        within a given SNP distance of the SOI in response to client GET
        request on route /sample/matrix with the sample_name and
        snp_distance encoded in the URL query string; e.g.
        "/sample/matrix?sample_name=AF-61-04255-17&snp_distance=5"
    """
    id = request.args.get("sample_name")
    snp_threshold = int(request.args.get("snp_distance"))
    get_data_object(id)
    return jsonify(g.data.snp_matrix(snp_threshold))


@app.route("/timeout", methods=["GET"])
def timeout():
    return ls.render_template("timeout.html")


@app.errorhandler(InvalidIdException)
def custom_exception_handler(error):
    return jsonify({"error": f"{str(error)}"})
