from flask import Flask, request, jsonify
from classifier import classify_complaint
import os

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "AI Engine running"})

@app.route("/classify", methods=["POST"])
def classify():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    image_base64 = data.get("imageBase64", "")
    description = data.get("description", "")

    result = classify_complaint(image_base64, description)
    return jsonify(result)

if __name__ == "__main__":
    port = int(os.environ.get("FLASK_PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=False)
