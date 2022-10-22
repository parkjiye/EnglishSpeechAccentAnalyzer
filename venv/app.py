from flask import Flask, request
from werkzeug.utils import secure_filename
import librosa
import pandas as pd
import sklearn
import xgboost

app=Flask(__name__)

@app.route("/recordings", methods=['GET', 'POST'])
def recordings():
    if request.method=='POST':
        print("hello")
        file = request.files['file']
        file.save(secure_filename(file.filename))
        
        raw_data = pd.DataFrame(index=range(0, 1), columns=['native_language' ,'sex' ,'chroma_stft_mean' ,'chroma_stft_var', 'spectral_centroid_mean', 'spectral_centroid_var',
                    'spectral_bandwidth_mean', 'spectral_bandwidth_var', 'rolloff_mean', 'rolloff_var', 'zero_crossing_rate_mean', 'zero_crossing_rate_var',
                    'harmony_mean', 'harmony_var', 'mfcc1_mean', 'mfcc1_var', 'mfcc2_mean', 'mfcc2_var', 'mfcc3_mean', 'mfcc3_var', 'mfcc4_mean', 'mfcc4_var',
                    'mfcc5_mean', 'mfcc5_var', 'mfcc6_mean','mfcc6_var','mfcc7_mean','mfcc7_var','mfcc8_mean','mfcc8_var','mfcc9_mean','mfcc9_var',
                    'mfcc10_mean','mfcc10_var','mfcc11_mean','mfcc11_var','mfcc12_mean','mfcc12_var','mfcc13_mean','mfcc13_var','mfcc14_mean','mfcc14_var',
                    'mfcc15_mean','mfcc15_var','mfcc16_mean','mfcc16_var','mfcc17_mean','mfcc17_var','mfcc18_mean','mfcc18_var','mfcc19_mean','mfcc19_var',
                    'mfcc20_mean','mfcc20_var'])
        
        print(raw_data)
        
        y, sr = librosa.load(file.filename)
        
        #native_language
        raw_data['native_language'][0] = 126
        #sex
        raw_data['sex'][0] = 0
        #chroma_stft_mean
        chromagram = librosa.feature.chroma_stft(y, sr=sr, hop_length=512)
        raw_data['chroma_stft_mean'][0] = chromagram.mean()
        #chroma_stft_var
        raw_data['chroma_stft_var'][0] = chromagram.var()
        #spectral_centroid_mean
        spectral_centroid = librosa.feature.spectral_centroid(y, sr=sr)
        raw_data['spectral_centroid_mean'][0] = spectral_centroid.mean()
        #spectral_centroid_var
        raw_data['spectral_centroid_var'][0] = spectral_centroid.var()
        #spectral_bandwidth_mean
        spectral_bandwidth = librosa.feature.spectral_bandwidth(y, sr=sr)
        raw_data['spectral_bandwidth_mean'][0] = spectral_bandwidth.mean()
        #spectral_bandwidth_var
        raw_data['spectral_bandwidth_var'][0] = spectral_bandwidth.var()
        #rolloff_mean
        spectral_rolloff = librosa.feature.spectral_rolloff(y, sr=sr)
        raw_data['rolloff_mean'][0] = spectral_rolloff.mean()
        #rolloff_var
        raw_data['rolloff_var'][0] = spectral_rolloff.var()
        #zero_crossing_rate_mean
        zero_crossing_rate = librosa.feature.zero_crossing_rate(y, frame_length=2048, hop_length=512, center=True)
        raw_data['zero_crossing_rate_mean'][0] = zero_crossing_rate.mean()
        #zero_crossing_rate_var
        raw_data['zero_crossing_rate_var'][0] = zero_crossing_rate.var()
        #harmony_mean
        harmonic = librosa.effects.harmonic(y)
        raw_data['harmony_mean'][0] = harmonic.mean()
        #harmony_var
        raw_data['harmony_var'][0] = harmonic.var()
        
        #mfcc
        mfccs=librosa.feature.mfcc(y, sr=sr)
        for i in range(1, 21):
            mean_name = 'mfcc'+str(i)+'_mean'
            mean_var= 'mfcc'+str(i)+'_var'
            raw_data[mean_name][0] = mfccs[i-1].mean()
            raw_data[mean_var][0] = mfccs[i-1].var()
            
            
        # print(raw_data.info())
        
        raw_data = raw_data.astype('float')
        # scaler = sklearn.preprocessing.MinMaxScaler()
        # np_scaled = scaler.fit_transform(raw_data)
        # X = pd.DataFrame(np_scaled, columns=raw_data.columns)
        
        xgb = xgboost.XGBClassifier()
        xgb.load_model("xgb_model.model")
        # print(X)
        # print(X.shape)
        
        # X = xgboost.DMatrix(raw_data, enable_categorical=False)
        
        xgb.predict(raw_data.iloc[0:1])
        # print(result)
        
        return '음성 분석 성공!'

if __name__ == '__main__':
    app.run(debug=True)