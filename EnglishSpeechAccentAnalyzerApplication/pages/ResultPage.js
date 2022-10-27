import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export default function ResultPage({ navigation, route }) {
    const { result } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>당신의 결과는...?!</Text>
            </View>
            <View style={styles.result}>
                <Image source={require('../assets/country/161.png')}/>
                {/* <Text>{result}</Text> */}
            </View>

        </View>
    )
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
        flex:1
    },
    headerText: {
        fontSize: 18
    },
    result:{
        flex:2
    }
})