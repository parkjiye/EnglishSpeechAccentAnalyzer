from flask import Flask, request
from werkzeug.utils import secure_filename
import librosa
import librosa.display

app=Flask(__name__)

@app.route("/recordings", methods=['GET', 'POST'])
def recordings():
    if request.method=='POST':
        print("hello")
        file = request.files['file']
        file.save(secure_filename(file.filename))
        
        y, sr = librosa.load(file.filename)
        print(y)
        print(sr)
        return 'uploads 음성 파일 성공!'

if __name__ == '__main__':
    app.run(debug=True)