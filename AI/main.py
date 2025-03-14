from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/check_similarity', methods=['POST'])
def check_similarity():
    data = request.get_json()
    cv_text = data.get("cv_text")
    job_desc = data.get("job_desc")

    if not cv_text or not job_desc:
        return jsonify({"error": "Both CV text and job description must be provided"}), 400

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([cv_text, job_desc])

    similarity_matrix = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

    similarity_score = similarity_matrix[0][0]
    return jsonify({"similarity_score": round(similarity_score, 2)})


if __name__ == '__main__':
    app.run(debug=True, port=5000)

# {
#     "cv_text": "Experienced software engineer with expertise in Python, Java, and machine learning.",
#     "job_desc": "Looking for a skilled software engineer with Python and Java knowledge, experience in machine learning."
# }
