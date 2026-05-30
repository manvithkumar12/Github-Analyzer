from flask import Flask
import joblib

app = Flask(__name__)

try:
    model = joblib.load("github_model.pkl")
    STATUS = "model loaded"
except Exception as e:
    STATUS = str(e)

@app.route("/")
def home():
    return {"status": STATUS}
