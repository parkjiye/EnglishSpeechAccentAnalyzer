import React from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, StatusBar } from 'react-native';
import axios from 'axios';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Audio } from 'expo-av';


const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export default function MainPage({ navigation, route }) {
    const [isRecording, setIsRecording] = React.useState(false);
    const [recording, setRecording] = React.useState();
    const [sound, setSound] = React.useState();

    const analyze = async (e) => {
        const audio = recording.getURI();
        const formData = new FormData();
        formData.append('file', { uri: audio, name: 'test.m4a', type: 'audio/m4a' });
        formData.append("country", 161);

        const api = async () => {
            console.log("api start!");
            const res = await axios.post("http://127.0.0.1:5000/recordings", formData, { headers: { 'Content-Type': 'multipart/form-data', } });
            navigation.navigate("Result", {result:res.data});
            return res.data;
        }

        api().then(res => {
            console.log("success: ");
            console.log(res);
        })
            .catch(err => {
                console.log("fail: ");
                console.log(err);
            });

    }

    async function startRecording() {
        try {
            setIsRecording(true);
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Staring recording..');

            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
    }

    async function playSound() {
        console.log('Loading Sound');

        const { sound } = await Audio.Sound.createAsync({ uri: recording.getURI() }, { shouldPlay: true });
        setSound(sound);

        console.log('Playing Sound');
        console.log(recording.getURI());
        await sound.playAsync();
    }


    React.useEffect(() => {
        return sound ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>아래 지문을 읽어주세요</Text>
            </View>
            <View style={styles.TextBox}>
                <Text style={styles.TextLine}>Please call Stella. Ask her to bring these things with her from the store: Six spoons of fresh snow peas, five thick slabs of blue cheese, and maybe a snack for her brother Bob. We also need a small plastic snake and a big toy frog for the kids. She can scoop these things into three red bags, and we will go meet her Wednesday at the train station.</Text>
            </View>
            <View style={styles.Audio}>
                <Button title={isRecording ? '녹음 중단' : '녹음 시작'} onPress={isRecording ? stopRecording : startRecording} />
                <Button title="녹음 재생" onPress={playSound} />
            </View>
            <View style={styles.footer}>
                <Button title="분석하기" onPress={analyze} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 50 + StatusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize:18
    },
    TextBox: {
        height: '18%',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom:20,
        flex:1
    },
    TextLine: {
        fontSize:15,
    },
    Audio: {
        flex: 1,
    },    
    footer:{
        flex:1,
    },
});