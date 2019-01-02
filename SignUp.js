/* SignUp.js 회원가입 화면 */
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

export default class LogIn extends Component {
  constructor(props){   // 생성자
    super(props);
    // 초기 상태 저장
    this.state = { text: ''};
  }
  static get options(){
    return{
      topBar: {
        title: {
          text: 'Sign Up'   // Title 제목
        },
      }
    };
  }

  render() {
    return (    
        <View style={styles.container}>
         <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6a0008"/>
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
                  />
                </View> 
              </View>
              <View style={styles.TextAndInput}>
                <Text style={styles.NameText}>Email</Text>
                <View style={styles.inputText}>
                  <TextInput                                  // User Email
                    autoCorrect={false}                       // Remove a line
                    placeholder='UserID@email.com' // place holder
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
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
                  />
                </View> 
              </View>
              <TouchableOpacity onPress={() => {     // Sign up
                  Alert.alert("Sign Up", "회원가입이 정상처리 되었습니다.",
                  [
                    {text: 'OK', onPress:() => {Navigation.pop(this.props.componentId);}}]);
                }}
                style={styles.SignUpButtonStyle}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    );
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
        shadowRadius: 5
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