from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    try:
        return {"status": "ok"}
    except Exception as e:
        return {"error": str(e)}, 500
