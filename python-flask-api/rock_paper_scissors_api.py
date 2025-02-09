from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
CORS(app, support_credentials=True)

app = Flask(__name__, static_url_path='/Documents/Odin-Projects/rock_paper_scissors/rock_paper_scissors_api.py/Scores.txt')

#Loads Saved game
def read_scores_from_file(fileName):
    with open(fileName, 'r') as savedScores:
        content = savedScores.read().replace('\n', '').replace('\r', '')
        return content

#Saves game
def write_scores_to_file(fileName, scores):
    with open(fileName, 'w') as savedScores:
        json.dump(scores, savedScores, indent=4)

#Gets the scores
@app.route("/api/scores", methods=["GET"])
@cross_origin(origin='*')
def get_scores():
    scores = read_scores_from_file('Scores.txt')
    return (scores)

#Saves game updates score
@app.route("/api/scores", methods=["POST"])
@cross_origin(origin='*')
def update_scores():
    new_scores = request.json
    write_scores_to_file('Scores.txt', new_scores)
    return ("Ok")
    

if __name__ == "__main__":
    app.run(debug=True)





