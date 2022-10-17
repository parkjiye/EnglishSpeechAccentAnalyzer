import 'react-native-gesture-handler';
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Platform, Button, StyleSheet, Text, View, Alert } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return(
    <NavigationContainer>
      <StatusBar style="light"/>
      <StackNavigator></StackNavigator>
    </NavigationContainer>
  );
}

