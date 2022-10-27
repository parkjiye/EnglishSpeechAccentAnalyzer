import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function InfoPage({ navigation, route }) {
    return (
        <View style={styles.container}>
            <View style={styles.Dropdown}>
                <Text style={styles.paragraph}>자신의 출신국가를 선택해주세요</Text>
                <DropDownPicker style={styles.drop}
                    items={[
                        { label: "Female", value: 0 },
                        { label: "Male", value: 1 }
                    ]}
                    defaultIndex={0}
                    //containerStyle={{height:40}}
                    onChangeItem={item => console.log(item.label, item.value)}
                    dropDownContainerStyle={{ backgroundColor: 'white', zIndex: 1000, elevation: 1000 }}
                />
                
            </View>
            <View style={styles.footer}>
                <Button title="다음 페이지" onPress={() => navigation.navigate("EnglishSpeechAccentAnalyzer")} />
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
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeigth: "bold",
        textAlign: "center"
    },
    Dropdown: {
        flex: 1,
        marginHorizontal: 20,
    },
    footer: {
        flex: 2,
    },
    drop: {
        marginBottom: 20
    }
})