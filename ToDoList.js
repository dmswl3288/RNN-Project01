/* Completed.js 메인메뉴 선택 화면 */
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, 
        View, TouchableOpacity, Image,
        StatusBar, ScrollView, Platform,
        Alert } from 'react-native';
import Dimensions from 'Dimensions';
import {Navigation} from 'react-native-navigation';

// 기기의 해상도 가져오기
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class ToDoList extends Component {
    constructor(props){   // 생성자
        super(props);
    }
    static get options(){
        return{
          topBar: {
            visible: false,   // top bar 제거
            drawBehind: true,
            animate: false,
          },
        };
    }
    componentWillMount(){
        StatusBar.setBarStyle('dark-content');
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor('#ffffff');
    }

    render(){
        return(
            <View style={styles.Container}>
                <StatusBar />
                <ScrollView>
                   <Text style={styles.titleText}>To Do List</Text>
                   <View style={styles.Card1}>
                    <View style={styles.Card2}>
                      <TextInput style={styles.input} placeholder={"New to do"}/>
                    </View>
                   </View>
                </ScrollView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        fontWeight: "bold"
    },
    Card1: {
        flex: 1,
        backgroundColor: '#A4B9C6',
        width: DEVICE_WIDTH-20,
        height: DEVICE_HEIGHT,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf: 'center',
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
                width: 0,
                height: -1
            }
          },
          android: {
            elevation: 5
          },
        }),
    },
    Card2: {
        backgroundColor: '#ffffff',
        width: DEVICE_WIDTH-35,
        height: DEVICE_HEIGHT,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf: 'center',
        marginTop: 6,
    },
    input: {

    },
});