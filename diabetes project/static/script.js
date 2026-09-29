document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("assessmentForm");

    if (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            // =========================
            // GET INPUT VALUES
            // =========================

            const name =
                document.getElementById("name").value;

            const age =
                Number(document.getElementById("age").value);

            const pregnancies =
                Number(document.getElementById("pregnancies").value);

            const glucose =
                Number(document.getElementById("glucose").value);

            const bloodPressure =
                Number(document.getElementById("bloodPressure").value);

            const skinThickness =
                Number(document.getElementById("skinThickness").value);

            const insulin =
                Number(document.getElementById("insulin").value);

            const bmi =
                Number(document.getElementById("bmi").value);

            const pedigree =
                Number(document.getElementById("pedigree").value);


            // =========================
            // SEND DATA TO FLASK
            // =========================

            try {

                const response = await fetch("/predict", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        Pregnancies: pregnancies,
                        Glucose: glucose,
                        BloodPressure: bloodPressure,
                        SkinThickness: skinThickness,
                        Insulin: insulin,
                        BMI: bmi,
                        DiabetesPedigreeFunction: pedigree,
                        Age: age

                    })

                });


                // Check whether Flask responded correctly

                if (!response.ok) {

                    throw new Error(
                        "Prediction request failed."
                    );

                }


                const prediction =
                    await response.json();


                // =========================
                // SAVE RESULT
                // =========================

                const resultData = {

                    name: name,

                    age: age,

                    pregnancies: pregnancies,

                    glucose: glucose,

                    bloodPressure: bloodPressure,

                    skinThickness: skinThickness,

                    insulin: insulin,

                    bmi: bmi,

                    pedigree: pedigree,

                    probability:
                        prediction.probability / 100,

                    classification:
                        prediction.prediction,

                    result:
                        prediction.result

                };


                localStorage.setItem(
                    "diabetesResult",
                    JSON.stringify(resultData)
                );


                // =========================
                // GO TO RESULT PAGE
                // =========================

                window.location.href =
                    "/result";


            } catch (error) {

                console.error(error);

                alert(
                    "Unable to connect to the prediction model. Please make sure Flask is running."
                );

            }

        });

    }


    // =========================
    // RESULT PAGE
    // =========================

    const probabilityElement =
        document.getElementById("probability");


    if (probabilityElement) {

        const storedData =
            localStorage.getItem("diabetesResult");


        if (!storedData) {

            probabilityElement.innerText = "--%";

            return;

        }


        const data =
            JSON.parse(storedData);


        const probability =
            data.probability * 100;


        // Name

        document.getElementById("resultName")
            .innerText = data.name;


        // Probability

        probabilityElement.innerText =
            probability.toFixed(2) + "%";


        // =========================
        // CLASSIFICATION
        // =========================

        const badge =
            document.getElementById("riskBadge");

        const description =
            document.getElementById("resultDescription");

        const classification =
            document.getElementById("classification");


        if (data.classification === 1) {

            badge.innerText =
                "Higher Estimated Risk";

            badge.className =
                "risk-badge higher";

            classification.innerText =
                "Outcome 1";

            description.innerText =
                "The model classified the submitted data as Outcome 1. This result is a model-based estimation and should not be interpreted as a medical diagnosis.";

        } else {

            badge.innerText =
                "Lower Estimated Risk";

            badge.className =
                "risk-badge lower";

            classification.innerText =
                "Outcome 0";

            description.innerText =
                "The model classified the submitted data as Outcome 0. This result is a model-based estimation and should not be interpreted as a medical diagnosis.";

        }


        // =========================
        // DATA SUMMARY
        // =========================

        const summary =
            document.getElementById("dataSummary");


        summary.innerHTML = `

            <div>
                <span>Age</span>
                <strong>${data.age}</strong>
            </div>

            <div>
                <span>Pregnancies</span>
                <strong>${data.pregnancies}</strong>
            </div>

            <div>
                <span>Glucose</span>
                <strong>${data.glucose} mg/dL</strong>
            </div>

            <div>
                <span>Blood Pressure</span>
                <strong>${data.bloodPressure} mmHg</strong>
            </div>

            <div>
                <span>BMI</span>
                <strong>${data.bmi}</strong>
            </div>

            <div>
                <span>Insulin</span>
                <strong>${data.insulin}</strong>
            </div>

        `;

    }

});