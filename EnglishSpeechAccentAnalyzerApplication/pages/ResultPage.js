import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export default function ResultPage({ navigation, route }) {
    const { result } = route.params;
    var country = parseInt(result.toString());

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>당신의 결과는...?!</Text>
            </View>
            <View style={styles.result}>
                {country < 7 && (<Image source={require('../assets/country/1.png')}/>)}
                {country===7 && (<Image source={require('../assets/country/7.png')}/>)}
                {country===8 && (<Image source={require('../assets/country/8.png')} resizeMode='cover'/>)}
                {country===9 && (<Image source={require('../assets/country/9.png')}/>)}
                {country===10 && (<Image source={require('../assets/country/10.png')}/>)}
                {country===11 && (<Image source={require('../assets/country/11.png')} />)}
                {12<=country && country<15 && (<Image source={require('../assets/country/12.png')}/>)}
                {15<=country && country<22 && (<Image source={require('../assets/country/15.png')}/>)}
                {country===22 && (<Image source={require('../assets/country/22.png')}/>)}
                {23<=country && country<33 && (<Image source={require('../assets/country/23.png')}/>)}
                {country===33 && (<Image source={require('../assets/country/33.png')}/>)}
                {34<=country && country<57 && (<Image source={require('../assets/country/34.png')}/>)}
                {57<=country && country<74 && (<Image source={require('../assets/country/57.png')}/>)}
                {74<=country && country<76 && (<Image source={require('../assets/country/74.png')}/>)}
                {country===76 && (<Image source={require('../assets/country/76.png')}/>)}
                {77<=country && country<86 && (<Image source={require('../assets/country/77.png')}/>)}
                {86<=country && country<89 && (<Image source={require('../assets/country/86.png')}/>)}
                {89<=country && country<100 && (<Image source={require('../assets/country/89.png')}/>)}
                {100<=country && country<105 && (<Image source={require('../assets/country/100.png')}/>)}
                {105<=country && country<108 && (<Image source={require('../assets/country/105.png')}/>)}
                {108<=country && country<126 && (<Image source={require('../assets/country/108.png')}/>)}
                {126<=country && country<149 && (<Image source={require('../assets/country/126.png')}/>)}
                {149<=country && country<156 && (<Image source={require('../assets/country/149.png')}/>)}
                {156<=country && country<189 && (<Image source={require('../assets/country/156.png')} resizeMode='cover'/>)}
                {189<=country && country<197 && (<Image source={require('../assets/country/189.png')} resizeMode='cover'/>)}
                {197<=country && (<Image source={require('../assets/country/197.png')}/>)}
                <Text>{result}</Text>
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
        flex: 1
    },
    headerText: {
        fontSize: 18
    },
    result: {
        flex: 3,
    }
})