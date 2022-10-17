import React from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, StatusBar } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Audio } from 'expo-av';

const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export default function MainPage({ navigation, route }) {
    const [recording, setRecording] = React.useState();
    const [sound, setSound] = React.useState();

    var recordURI;

    async function startRecording()
    {
        try {
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
        } catch(err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        recordURI = recording.getURI();
        console.log('Recording stopped and stored at', recordURI);
    }

    async function playSound() {
        console.log('Loading Sound');
        console.log(recordURI);
        const sound = new Audio.Sound();
        //const { sound } = await Audio.Sound.createAsync({uri: recording.getURI});
        //setSound(sound);
        await sound.loadAsync({
            uri: recording.getURI
        })

        console.log('Playing Sound');
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
                <Button title={recording ? '녹음 중단' : '녹음 시작'} onPress={ recording ? stopRecording : startRecording} />
                <Button title="녹음 재생" onPress={playSound} />
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

    },
    TextBox: {
        height: '18%',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20
    },
    TextLine: {

    },
    Audio: {
        flex: 1,
    },
    footer: {

    }
});