import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import Dimensions from 'Dimensions';

// 기기의 해상도 가져오기
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class LogIn extends Component {
  constructor(props){   // 생성자
    super(props);
    // 초기 상태 저장
    this.state = { text: ''};
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#00444c'}}>
        <View style={{width: DEVICE_WIDTH, height: 24}}/>
        <View style={styles.titleView}>
          <Text style={{fontSize: 40, color: 'white'}}>React Native App</Text>
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
        <TouchableOpacity onPress={() => {Alert.alert('로그인 해주세요');}}  // custom button
                         title="LOG IN"
                         style={styles.buttonStyle}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  titleView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 90,
    marginBottom: 90
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
    paddingLeft: 5, 
    backgroundColor: 'white',
  },
  buttonStyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#6a0008',
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
