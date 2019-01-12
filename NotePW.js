/* NotePW.js 패스워드 저장 화면 */
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, 
    View, TouchableOpacity, Image,
    StatusBar, ScrollView, Platform,
    Alert, AsyncStorage } from 'react-native';
import Dimensions from 'Dimensions';
import NoteItem from "./NoteItem";
import uuidv1 from "uuid/v1";

// 기기의 해상도 가져오기
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class NotePW extends Component {
    constructor(props){   // 생성자
        super(props);

        this.state = {
            isLoadedInfos: false,
            newWebsite: "",
            newID: "",
            newPW: "",
            infos: {}
        }
    }
    static get options(){
        return{
          statusBar: {
            backgroundColor: "#fff",
            style: 'dark'
          },
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
        const { newWebsite, newID, newPW, infos } = this.state;
        
        return(
            <View style={styles.Container}>
            <StatusBar />
               <Text style={styles.title}>Note my password</Text>
               <View style={styles.Card1}>
                <View style={styles.Card2}>
                    <TextInput style={styles.inputWebsite}
                    placeholder={'Website'}
                    value={newWebsite}
                    onChangeText={this._controllText01}
                    autoCorrect={false}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.text}>
                        <Text style={{fontSize: 20, color: "#fff",
                                      fontWeight: 'bold'}}>ID</Text>
                      </View> 
                        <TextInput style={styles.inputID}    // ID Text Input
                        placeholder={'Enter your ID'}
                        onChangeText={this._controllText02}
                        autoCorrect={false}
                        value={newID}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.text}>
                        <Text style={{fontSize: 20, color: "#fff",
                                      fontWeight: 'bold'}}>PW</Text>
                      </View>
                        <TextInput style={styles.inputID}    // PW Text Input
                        placeholder={'Enter your Password'}
                        onChangeText={this._controllText03}
                        autoCorrect={false}
                        value={newPW}
                        />
                    </View>
                  <View style={{borderWidth: 3, borderColor: "#FC523D"}}/>

                  <TouchableOpacity style={styles.button}
                      onPressOut={this._adding}>
                      <Text style={{color: "#fff", fontSize: 20,
                        alignSelf: "center",}}>Save</Text>
                  </TouchableOpacity>

                  <ScrollView contentContainerStyle={styles.NoteInfo}>
                      {Object.values(infos)
                      .reverse()
                      .map(info => 
                      <NoteItem key={info.id} 
                      deleteInfo={this._deleteInfo}
                      { ...info }/>)}
                  </ScrollView>
                </View>
               </View>
            </View>
        );
    }
    _controllText01 = text => {
        // 이벤트에서 텍스트 가져옴  Website
        this.setState({
            newWebsite: text
        });
    };
    _controllText02 = text => {
        // 이벤트에서 텍스트 가져옴  ID
        this.setState({
            newID: text
        });
    };
    _controllText03 = text => {
        // 이벤트에서 텍스트 가져옴  PW
        this.setState({
            newPW: text
        });
    };

    componentDidMount(){
        this._loadedInfos();
    }

    _loadedInfos = async() => {
        try{
            // 저장된 오브젝트 가져오기   끝나기를 기다림
            const infos = await AsyncStorage.getItem("infos") || "none";
            if(infos !== "none"){
                const parsedInfos = JSON.parse(infos);  // 다시 object로 convert해서 저장
                this.setState({
                    isLoadedInfos: true,
                    infos: parsedInfos           // 가져온 Object 저장, 로딩
                });
            }
        } catch(err) {
            console.log(err);
        }
    };
    _adding = () => {
        const { newWebsite, newID, newPW } = this.state;
        if(newWebsite !== "" && newID !== "" && newPW !== ""){
            this.setState(prevState => {
                const uuid = uuidv1();
                const newInfoObject = {
                    [uuid]: {
                        id: uuid,
                        websiteText: newWebsite,
                        idText: newID,            // 그냥 바로 state넣어도 됨
                        pwText: newPW,
                        createAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newWebsite: "",
                    newID: "",
                    newPW: "",
                    infos: {
                        ...prevState.infos,
                        ...newInfoObject
                    }
                };
                this._saveInfos(newState.infos);
                return { ...newState };
            });
        }
    };
    _deleteInfo = (id) => {
        this.setState(prevState => {
            const infos = prevState.infos;
            delete infos[id];
            const newState = {
                ...prevState,
                ...infos
            };
            this._saveInfos(newState.infos);
            return { ...newState };
        });
    };
    _saveInfos = (newInfos) => {
                                                             // object -> string
        const saveInfos = AsyncStorage.setItem("infos", JSON.stringify(newInfos));
    };
}

const styles=StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        fontWeight: "bold"
    },
    Card1: {
        flex: 1,
        backgroundColor: '#780c00',
        width: DEVICE_WIDTH-15,
        height: DEVICE_HEIGHT,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf: 'center',
        ...Platform.select({
          ios: {
            shadowColor: "#FC523D",
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
        width: DEVICE_WIDTH-30,
        height: DEVICE_HEIGHT,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf: 'center',
        marginTop: 6,
    },
    text: {
        width: 70,
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottomColor: '#FC523D',
        borderBottomWidth: 1,
        backgroundColor: "#FC523D"
    },
    inputWebsite: {
        padding: 10,
        borderBottomColor: '#FC523D',
        borderBottomWidth: 3,
        fontSize: 20,
    },
    inputID: {
        flex: 1,
        borderLeftWidth: 3,
        borderBottomWidth: 1,
        borderLeftColor: "#FC523D",
        borderBottomColor: "#FC523D",
        fontSize: 20,
        padding: 10,
    },
    NoteInfo: {
        alignItems: 'center'
    },
    button: {
        borderRadius: 30,
        width: DEVICE_WIDTH/4,
        height: 40,
        backgroundColor: "#FC523D",
        alignSelf: "flex-end",
        marginVertical: 5,
        marginRight: 5,
        justifyContent: 'center',
    },
});