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

export default class Completed extends Component {
    constructor(props){   // 생성자
        super(props);
    }
    static get options(){
        return{
          statusBar: {
            backgroundColor: "#fff",
            style: 'dark'        
          },
          topBar: {
            visible: true,
            title: {
              text: 'MENU'
            },
          }
        };
    }

    componentWillMount(){
        StatusBar.setBarStyle('dark-content');
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor('#ffffff');
      }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar/>
                <TouchableOpacity style={styles.Card1}
                    onPress={() => {      // Log In
                        Navigation.push(this.props.componentId, {
                            component: {
                              id: 'ToDoList',
                              name: 'ToDoList',
                            }     
                        });
                    }}>
                  <Text style={{fontSize: 20, color: 'white', marginTop: 15,
                                alignSelf: 'center'}}>Weekly</Text>
                  <View style={styles.CardContent1}>
                    <Image source={require('./android/app/src/main/assets/todolist.png')}
                           style={styles.ToDoList}/>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.Card2}
                     onPress={() => {      // Log In
                        Navigation.push(this.props.componentId, {
                            component: {
                              id: 'NotePW',
                              name: 'NotePW',
                            }     
                        });
                    }}>
                  <Text style={{fontSize: 20, color: 'white', marginTop: 15,
                                alignSelf: 'center'}}>Note my password</Text>
                  <View style={styles.CardContent1}>
                    <Image source={require('./android/app/src/main/assets/NotePW.png')}
                           style={styles.ToDoList}/>
                  </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
    Card1: {
        backgroundColor: '#003f60',
        width: DEVICE_WIDTH-20,
        height: DEVICE_HEIGHT/2.5,
        borderRadius: 20,
        marginTop: 10,
        alignSelf: 'center',
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOpacity: 0.5,
            shadowRadius: 5
          },
          android: {
            elevation: 5
          },
        }),
      },
    CardContent1: {
        backgroundColor: "#ffffff",
        width: DEVICE_WIDTH-40,
        height: DEVICE_HEIGHT/3.5,
        borderRadius: 20,
        marginTop: 15,
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    ToDoList: {
        width: DEVICE_WIDTH-40,
        height: DEVICE_HEIGHT/3.5,
        borderRadius: 20,
    },
    Card2: {
        backgroundColor: '#780c00',
        width: DEVICE_WIDTH-20,
        height: DEVICE_HEIGHT/2.5,
        marginBottom: 10,
        borderRadius: 20,
        alignSelf: 'center',
        ...Platform.select({
            ios: {
            shadowColor: "#000",
            shadowOpacity: 0.5,
            shadowRadius: 5
            },
            android: {
            elevation: 5
            },
        }),
    },
    
});