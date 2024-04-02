from flask import Flask, jsonify, render_template, request, g, send_file, Response
import os
import json
from datetime import datetime

from viewbovis_data import Request, NoDataException, NoMetaDataException,\
                           NoWgsDataException, NonBovineException,\
                           MatrixTooLargeException

app = Flask(__name__)


def get_request_object(id):
    """
        Creates a Request object if one does not already exist in the
        application context. Assigns the Request object as an attribute
        of the application context. Creating the request object connects
        to the database. This also loads key data for the sample of
        interest (SOI) (id) and assigns these data to attributes of the
        application context. This function is called before every
        request.
    """
    if not hasattr(g, "request"):
        g.request = Request(app.data_path, id)


@app.teardown_appcontext
def disconnect_db(exception):
    """
        Closes the database connection and delete the database object.
        Called automatically when the application context ends.
    """
    if hasattr(g, "request"):
        g.request.__del__()
        del g.request


@app.route("/")
def home():
    with open(os.path.join(app.data_path, "metadata.json")) as f:
        metadata = json.load(f)
    return render_template("index.html",
                           data_update_date=datetime.strptime(metadata["today"],
                                                              '%d%b%y').strftime("%d/%m/%Y"))

@app.route('/static/js/<path:filename>')
def static_compressed_js(filename):
    js_folder = 'static/js'
    jsc_folder = 'static/jsc'
    jsc_filepath = os.path.join(jsc_folder,filename+'.gz')
    if os.path.exists(jsc_filepath):
        return send_file(jsc_filepath, as_attachment= False)
    else:
        return send_file(os.path.join(js_folder,filename))


@app.route("/sample", methods=["GET"])
def sample():
    """
        Returns metadata in json format for the SOI in response to a
        client GET request at route /sample/, with the sample_name
        encoded in the URL query string; e.g.
        "/sample?sample_name=AF-61-04255-17"
    """
    id = request.args.get("sample_name")
    get_request_object(id)
    return jsonify(g.request.soi_metadata())


@app.route("/sample/movements", methods=["GET"])
def movements():
    """
        Returns meta and movement data in json format for the SOI in
        response to a client GET request at route /sample/movements,
        with the sample_name encoded in the URL query string; e.g.
        "/sample?sample_name=AF-61-04255-17"
    """
    id = request.args.get("sample_name")
    get_request_object(id)
    return jsonify(g.request.soi_movement_metadata())


@app.route("/sample/related", methods=["GET"])
def related_samples():
    """
        Returns meta and SNP distance data in json format for all
        samples within a given SNP distance of the SOI in response to a
        client GET request on route /sample/related with the
        sample_name and snp_distance encoded in the URL query string;
        e.g. "/sample/related?sample_name=AF-61-04255-17&snp_distance=5"
    """
    id = request.args.get("sample_name")
    snp_threshold = int(request.args.get("snp_distance"))
    get_request_object(id)
    return jsonify(g.request.related_submissions_metadata(snp_threshold))


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
    get_request_object(id)
    return jsonify(g.request.snp_matrix(snp_threshold))


@app.errorhandler(NoDataException)
def custom_exception_handler(error):
    app.logger.info(error)
    return jsonify({"warnings": True,
                    "warning": f"{str(error)}"})
