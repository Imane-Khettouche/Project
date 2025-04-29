from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)


@app.route('/run-python', methods=['POST'])
def run_code():
    code = request.json['code']
    try:

        result = subprocess.run(['python3', '-c', code], capture_output=True, text=True, timeout=5)
        return jsonify(output=result.stdout)
    except subprocess.TimeoutExpired:
        return jsonify(output='Timeout Error')
    except Exception as e:
        return jsonify(output=str(e))


@app.route('/')
def home():
    return "Flask server is running!"

if __name__ == '__main__':
    app.run(debug=True, port=5000) 