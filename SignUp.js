/* SignUp.js 회원가입 화면 */
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, 
        View, TouchableOpacity, Image,
        StatusBar, ScrollView, Platform,
        Alert } from 'react-native';
import Dimensions from 'Dimensions';
import {Navigation} from 'react-native-navigation';
import ActivityIndicatorExample from './ActivityIndicatorExample';

// 기기의 해상도 가져오기
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class SignUp extends Component {
  constructor(props){   // 생성자
    super(props);
    // 초기 상태 저장
    this.state = {
      isLoading: false,
      TextInputName: "",
      TextInputEmail: "",
      TextInputPW: "",
      TextInputConfirmPW: ""
    };
  }
  static get options(){
    return{
      statusBar: {
        backgroundColor: "#fff",
        style: 'dark',
      },
      topBar: {
        title: {
          text: '회원가입'   // Title 제목
        },
      },
    };
  }

  componentWillMount(){
    StatusBar.setBarStyle('dark-content');
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor('#ffffff');
  }

  render() {
    const {isLoading} = this.state;
    if(isLoading){
      return <ActivityIndicatorExample />;
    }
    return (    
        <View style={styles.container}>
         <StatusBar/>
          <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.Logo} 
                    source={require('./android/app/src/main/assets/secret_white.png')}/>
              <Text style={styles.Welcome}>Welcome!</Text>
            </View>
            <View style={styles.Card}>
              <View style={styles.TextAndInput}>
                <Text style={styles.NameText}>Name</Text>   
                <View style={styles.inputText}>
                  <TextInput                                   // User Name
                    autoCorrect={false}                        // Remove a line
                    placeholder='Name' // place holder
                    onChangeText={TextInputName => this.setState({TextInputName})}
                  />
                </View> 
              </View>
              <View style={styles.TextAndInput}>
                <Text style={styles.NameText}>Email</Text>
                <View style={styles.inputText}>
                  <TextInput                                  // User Email
                    keyboardType={'email-address'}
                    placeholder='UserID@email.com' // place holder
                    onChangeText={TextInputEmail => this.setState({TextInputEmail})}
                  />
                </View> 
              </View>
              <View style={styles.TextAndInput}>
                <Text style={styles.NameText}>Password</Text>
                <View style={styles.inputText}>
                  <TextInput                                  // User Password
                    autoCorrect={false}                       // Remove a line
                    secureTextEntry={true}
                    placeholder='Password' // place holder
                    onChangeText={TextInputPW => this.setState({TextInputPW})}
                  />
                </View> 
              </View>
              <View style={styles.TextAndInput}>
                <Text style={styles.NameText}> Confirm Password</Text>
                <View style={styles.inputText}>
                  <TextInput                                  // User Password
                    autoCorrect={false}                       // Remove a line
                    secureTextEntry={true}
                    placeholder='Password' // place holder
                    onChangeText={TextInputConfirmPW => this.setState({TextInputConfirmPW})}
                  />
                </View> 
              </View>
              <TouchableOpacity onPress={this._InsertDataToServer}    // Sign up
                style={styles.SignUpButtonStyle}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    );
  }
  _InsertDataToServer = () => {
    const { TextInputName, TextInputEmail, 
            TextInputPW, TextInputConfirmPW } = this.state;
    
    if(this._isCompleted() == true){   // 완벽하다면 접속

        this.setState({
          isLoading: true
        });

        fetch("http://61.102.48.100/submit_user_info.php", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            user_name: TextInputName,
            user_email: TextInputEmail,
            user_pw: TextInputPW,
            user_confirm_pw: TextInputConfirmPW
          })
        }).then((reponse) => reponse.json())
          .then((reponseJson) => {
              
              this.setState({
                isLoading: false
              });

              Alert.alert("가입 완료", reponseJson,
              [
                {text: 'OK', onPress:() => {Navigation.pop(this.props.componentId);}}]);
          }).catch((error) => {
            console.error(error);
          });
    }
    else{
      Alert.alert("가입 실패", "모든 정보를 정확하게 입력해 주세요");
    }

  }
  _isCompleted = () => {
    const { TextInputName, TextInputEmail, 
      TextInputPW, TextInputConfirmPW } = this.state;
    if(TextInputName != "" && TextInputEmail != "" && TextInputPW != "" && TextInputConfirmPW != ""){
      if(TextInputPW === TextInputConfirmPW){
        return true;
      }
    }
    else{
      return false;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#bb0000',
  },
  Logo: {
    margin: 10,
    width: DEVICE_WIDTH/4,
    height: DEVICE_WIDTH/4,
  },
  Welcome: {
    fontSize: 40,
    color: 'white',
    marginLeft: 20,
  },
  TextAndInput: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'column',
  },
  Card: {
    backgroundColor: 'white',
    width: DEVICE_WIDTH-30,
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
  NameText: {
    fontSize: 20,
    color: '#000',
    marginLeft: 35
  },
  inputText: { 
    alignItems:'center',
    flexDirection: 'row',
    borderRadius: 5,
    alignSelf:'center',
    marginTop: 10,
    fontSize: 20, 
    width: DEVICE_WIDTH - 100,
    height: 50, 
    borderColor: 'gray',  
    borderWidth: 1,
    paddingLeft: 5, 
    backgroundColor: 'white',
  },
  SignUpButtonStyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'gray',
    marginTop: 20,
    width: DEVICE_WIDTH - 100,
    height: 50,
    alignSelf: 'center',
    borderRadius: 30
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
});