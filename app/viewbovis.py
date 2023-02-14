from flask import Flask, jsonify, render_template, request, g 
from liveserver import LiveServer

from data import Data

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
        g.data = Data()

@app.teardown_appcontext
def disconnect_db(exception):
    """
        Closes the database connection. This function is called when the
        application conext ends.
    """
    if hasattr(g, 'data'):
        g.data.db.close()

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
    get_data_object()
    sample_name = request.args.get("sample_name")
    return jsonify(g.data.submission_metadata(sample_name))
