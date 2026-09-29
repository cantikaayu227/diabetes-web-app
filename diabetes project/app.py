

from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd

app = Flask(__name__)

# =========================
# LOAD MODEL
# =========================

model = joblib.load("naive_bayes_diabetes.pkl")


# =========================
# HALAMAN WEBSITE
# =========================

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/assessment")
def assessment():
    return render_template("assessment.html")


@app.route("/model")
def model_page():
    return render_template("model.html")


@app.route("/result")
def result():
    return render_template("result.html")


# =========================
# PREDIKSI
# =========================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    # Urutan dan nama kolom HARUS sama
    # dengan saat model dilatih

    new_data = pd.DataFrame({

        "Pregnancies": [data["Pregnancies"]],

        "Glucose": [data["Glucose"]],

        "BloodPressure": [data["BloodPressure"]],

        "SkinThickness": [data["SkinThickness"]],

        "Insulin": [data["Insulin"]],

        "BMI": [data["BMI"]],

        "DiabetesPedigreeFunction": [
            data["DiabetesPedigreeFunction"]
        ],

        "Age": [data["Age"]]

    })


    # =========================
    # PREDICTION
    # =========================

    prediction = model.predict(new_data)[0]

    probability = model.predict_proba(new_data)[0][1]


    # =========================
    # RESULT TEXT
    # =========================

    if prediction == 1:

        result_text = "Berisiko diabetes"

    else:

        result_text = "Tidak berisiko diabetes"


    # =========================
    # SEND RESULT TO WEBSITE
    # =========================

    return jsonify({

        "prediction": int(prediction),

        "result": result_text,

        "probability": round(
            float(probability) * 100,
            2
        )

    })


# =========================
# RUN FLASK
# =========================

if __name__ == "__main__":

    app.run(debug=True)
