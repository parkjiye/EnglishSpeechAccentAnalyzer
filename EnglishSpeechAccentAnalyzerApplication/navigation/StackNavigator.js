import React from 'react';
//설치한 스택 네비게이션 라이버리를 가져온다
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../pages/MainPage';

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
            <Stack.Screen name="EnglishSpeechAccentAnalyzer" component={MainPage}/>
        </Stack.Navigator>
    )
}

export default StackNavigator;