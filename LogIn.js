import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, 
        View, TouchableOpacity, Image,
        StatusBar, ScrollView } from 'react-native';
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
    this.preState = { value: ' '};
  }
  static get options(){
    return{
      topBar: {
        visible: true,
        animated: false,
        title: {
          text: 'SECRET'   // Title 제목
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
    return (     
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
       <StatusBar/>
       <ScrollView>
        <View style={{width: DEVICE_WIDTH, height: 24}}/>
        <View style={styles.titleView}>
          <Image source={require('./android/app/src/main/assets/secret.png')}
                 style={styles.LogoStyle}/>
        </View>
        <View style={styles.inputText}>
          <Image source={require('./android/app/src/main/assets/UserID.png')}
                 style={styles.ImageStyle}/>
          <TextInput   // User ID
            autoCorrect={false}    // Remove a line
            placeholder='UserID@email.com' // place holder
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>

        <View style={styles.inputText}>
          <Image source={require('./android/app/src/main/assets/password.png')}
                  style={styles.ImageStyle}/>
          <TextInput   // Password
            secureTextEntry={true}
            placeholder='Password' // place holder
          />
        </View>
        <TouchableOpacity onPress={() => {      // Log In
            Navigation.push(this.props.componentId, {
                component: {
                  name: 'Completed',
                }     
            });
          }}
          style={styles.LogInButtonStyle}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {     // Sign up
            Navigation.push(this.props.componentId, {
                component: {
                  name: 'SignUp',
                }     
            });
          }}
          style={styles.SignUpButtonStyle}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleView: {
    alignSelf: 'center',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20
  },
  inputText: { 
    alignItems:'center',
    flexDirection: 'row',
    borderRadius: 5,
    alignSelf:'center',
    marginTop: 15,
    fontSize: 20, 
    width: DEVICE_WIDTH - 100,
    height: 50, 
    borderColor: 'gray',  
    borderWidth: 1,
    paddingLeft: 5, 
    backgroundColor: 'white',
  },
  LogInButtonStyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#bb0000',
    marginTop: 20,
    width: DEVICE_WIDTH - 100,
    height: 50,
    alignSelf: 'center',
    borderRadius: 30
  },
  SignUpButtonStyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'gray',
    marginTop: 10,
    width: DEVICE_WIDTH - 100,
    height: 50,
    alignSelf: 'center',
    borderRadius: 30
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  LogoStyle: {
    height: DEVICE_WIDTH/2.5,
    width: DEVICE_WIDTH/2.5,
  },
  ImageStyle: {    // Image icon style
    padding: 10,
    height: 25,
    width: 25,
    marginLeft: 5,
    marginRight: 10,
    justifyContent:'center',
    resizeMode : 'stretch',
    alignItems: 'center'
},
});
