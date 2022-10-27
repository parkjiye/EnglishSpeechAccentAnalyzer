import React from 'react';
//설치한 스택 네비게이션 라이버리를 가져온다
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../pages/MainPage';
import InfoPage from '../pages/InfoPage'
import ResultPage from '../pages/ResultPage'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor: "black",
                borderBottomColor: "black",
                shadowColor: "black",
                height:100
            },
            headerTintColor:"#FFFFFF",
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name="Information" component={InfoPage}/>
            <Stack.Screen name="EnglishSpeechAccentAnalyzer" component={MainPage}/>
            <Stack.Screen name="Result" component={ResultPage}/>
            
        </Stack.Navigator>
    )
}

export default StackNavigator;