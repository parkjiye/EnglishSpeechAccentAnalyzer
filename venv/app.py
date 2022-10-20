from flask import Flask, request
from werkzeug.utils import secure_filename

app=Flask(__name__)

@app.route("/recordings", methods=['GET', 'POST'])
def recordings():
    if request.method=='POST':
        print("hello")
        file = request.files['file']
        file.save(secure_filename(file.filename))
        return 'uploads 음성 파일 성공!'

if __name__ == '__main__':
    app.run(debug=True)