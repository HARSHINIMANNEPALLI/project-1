import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(_name_)
API_KEY = os.getenv("SPOONACULAR_API_KEY")

@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    query = request.args.get("query")
    
    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    url = f"https://api.spoonacular.com/recipes/complexSearch?query={query}&apiKey={API_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data"}), response.status_code

    return jsonify(response.json())

if _name_ == "_main_":
    app.run(debug=True)