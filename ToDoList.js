/* Completed.js 메인메뉴 선택 화면 */
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, 
        View, TouchableOpacity, Image,
        StatusBar, ScrollView, Platform,
        Alert, AsyncStorage } from 'react-native';
import Dimensions from 'Dimensions';
import {Navigation} from 'react-native-navigation';
import ToDo from './ToDo';
import uuidv1 from "uuid/v1";

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

    state = {
        newToDo: "",
        isLoadedToDos: false,
        toDos: {}
    };
    componentDidMount = () => {
        this._loadToDos();
    }
    render(){
        const { newToDo, isLoadedToDos, toDos } = this.state;
        return(
            <View style={styles.Container}>
            <StatusBar />
                <Text style={styles.titleText}>To Do List</Text>
                <View style={styles.Card1}>
                <View style={styles.Card2}>
                    <TextInput style={styles.input} 
                    placeholder={"New to do"}
                    value={newToDo}
                    onChangeText={this._controllNewToDo} //값이 변경될때마다 호출
                    autoCorrect={false}
                    onSubmitEditing={this._addToDo}
                    />
                    <ScrollView contentContainerStyle={styles.toDos}>
                        {Object.values(toDos)
                        .reverse()
                        .map(toDo => 
                        <ToDo key={toDo.id} 
                            deleteToDo={this._deleteToDo}
                            uncompletedToDo={this._uncompletedToDo}
                            completedToDo={this._completedToDo}
                            { ...toDo }/>)}
                    </ScrollView>
                </View>
                </View>
            </View>
        );
    }
    _controllNewToDo = text => {
        //이벤트에서 텍스트 가져옴
        this.setState({
            newToDo: text
        });
    };
    _loadToDos = async() => {
        try {
            // 저장된 오브젝트 가져오기   끝나기를 기다림
            const toDos = await AsyncStorage.getItem("toDos");
            const parsedToDos = JSON.parse(toDos);  // 다시 object로 convert해서 저장
            this.setState({
                isLoadedToDos: true,
                toDos: parsedToDos           // 가져온 Object 저장, 로딩
            });
        } catch(error){
            console.log(error);
        }
    };
    _addToDo = () => {
        const { newToDo } = this.state; 
        if(newToDo !== ""){
            this.setState(prevState => {
                const ID = uuidv1();
                const newToDoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newToDo,
                        createAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newToDo: "",
                    toDos: {
                        ...prevState.toDos,
                        ...newToDoObject
                    }
                };
                this._saveToDos(newState.toDos);
                return { ...newState };
            })
        }
    };
    _deleteToDo = (id) => {
        this.setState(prevState => {
            const toDos = prevState.toDos;
            delete toDos[id];
            const newState = {
                ...prevState,
                ...toDos
            };
            this._saveToDos(newState.toDos);
            return { ...newState };
        });
    };
    _uncompletedToDo = (id) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {     // 만약 새로운 ID가 있다면 덮어쓰기
                        ...prevState.toDos[id],  //ID에 따른 모든 정보 포함
                        isCompleted: false
                    }
                }
            };
            this._saveToDos(newState.toDos);
            return { ...newState };
        });
    };
    _completedToDo = (id) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {     // 만약 새로운 ID가 있다면 덮어쓰기
                        ...prevState.toDos[id],  //ID에 따른 모든 정보 포함
                        isCompleted: true
                    }
                }
            };
            this._saveToDos(newState.toDos);
            return { ...newState };
        });
    };
    _saveToDos = (newToDos) => {  // function for saving items
                                                        // object -> string
        const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
    }
}

const styles=StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',
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
        flex: 1,
        backgroundColor: '#ffffff',
        width: DEVICE_WIDTH-35,
        height: DEVICE_HEIGHT,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf: 'center',
        marginTop: 6,
    },
    input: {
        padding: 20,
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        fontSize: 25,
    },
    toDos: {
        alignItems: 'center'
    }
});