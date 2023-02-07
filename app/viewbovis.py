from flask import Flask, jsonify, render_template, request
import pandas as pd

app = Flask(__name__)

metadata = pd.DataFrame({"sample": ["A", "B"], "Other": ["foo", "bar"]}).set_index("sample") 

@app.route("/")
def home():
    return render_template("home.template")

@app.route("/sample")
def sample_data():
    sample_name = request.args.get("sample_name")
    data = metadata.loc(sample_name)
    return jsonify(data)