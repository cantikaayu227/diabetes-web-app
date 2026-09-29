Dia-Risk — Diabetes Risk Estimation Dashboard

Dia-Risk is a web-based dashboard for estimating diabetes classification using health-related parameters and the Gaussian Naive Bayes algorithm.
Disclaimer: This application is for educational and informational purposes only. The result is a model-based estimation and is not a medical diagnosis.

Overview

Dia-Risk allows users to enter several health-related parameters and receive an estimated diabetes probability and classification based on a trained Gaussian Naive Bayes model.
The application consists of:
1. Home: Introduction to the application
2. Assessment: Input health-related parameters
3. Results: Estimated diabetes probability and classification
4. Model: Information about the algorithm, dataset, and model performance

#Algorithm

The project uses Gaussian Naive Bayes, a probabilistic classification algorithm based on Bayes' theorem.
The model uses the following input features:
1. Pregnancies
2. Glucose
3. Blood Pressure
4. Skin Thickness
5. Insulin
6. BMI
7. Diabetes Pedigree Function
8. Age

The target variable is:
* Outcome = 0 → Non-diabetes classification
* Outcome = 1 → Diabetes classification

#Dataset
The project uses the Healthcare Diabetes Dataset from Kaggle.
Dataset source:
https://www.kaggle.com/datasets/nanditapore/healthcare-diabetes
The dataset contains 2,768 records and 10 columns.

#Preprocessing
Zero values in the following features were treated as missing values:
* Glucose
* Blood Pressure
* Skin Thickness
* Insulin
* BMI

These values were replaced with the median of their respective features. A zero value in Pregnancies was retained because it represents a valid value.

#Model Performance
The dataset was divided into:
* 80% training data
* 20% testing data

The Gaussian Naive Bayes model achieved:

| Metric    | Class 1 |
| --------- | ------: |
| Precision |     66% |
| Recall    |     60% |
| F1-Score  |     63% |

Overall accuracy: **75.45%**

#Confusion Matrix
[[303  60]
 [ 76 115]]

#Technologies
* Python
* Flask
* Scikit-learn
* Joblib
* HTML
* CSS
* JavaScript

#Project Structure
diabetes-web-app/
├── app.py
├── naive_bayes_diabetes.pkl
├── templates/
│   ├── index.html
│   ├── assessment.html
│   ├── result.html
│   └── model.html
└── static/
    ├── style.css
    └── script.js

#How to Run
Clone this repository:
git clone https://github.com/USERNAME/diabetes-web-app.git
cd diabetes-web-app
Install the required libraries: 
pip install flask scikit-learn pandas numpy joblib
Run the Flask application:
python app.py
Then open the local address shown in the terminal, usually:
http://127.0.0.1:5000

#Project Purpose
This project was developed as a course final project to demonstrate the implementation of a algorithm in a web-based application.

The application demonstrates how health-related data can be processed using Gaussian Naive Bayes and presented through an interactive dashboard.
