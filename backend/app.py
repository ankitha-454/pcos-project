from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "PCOS API Running"

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["age"],
        data["bmi"],
        data["cycleLength"],
        data["lhLevel"],
        data["fshLevel"],
        data["insulinLevel"],
        data["acneSeverity"],
        data["hirsutismScore"]
    ]])

    prediction = model.predict_proba(features)[0][1] * 100

    return jsonify({
        "pcosRisk": round(prediction,2)
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
