import React, {Component} from 'react';
import { StatusBar,
  View,
  StyleSheet,
  Text,
  Image,
  AsyncStorage,
   } from 'react-native';
import {goToAuth, goHome} from './Navigation';
import {USER_KEY} from './config';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width; 
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Splash extends Component {
    /*async componentDidMount() {
        try{
            const user = await AsyncStorage.getItem(USER_KEY);
            console.log('user: ', user);
            if(user){     // 사용자 확인이 된 경우
                goHome();
            } else{         // 사용자 인증이 안 된 경우
                goToAuth();
            }
        } catch(err){
            console.log('error: ', err);
            goToAuth();
        }
    }*/
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{ goToAuth();
             // Add your logic for the transition
        }, 1000);
   }

    render(){
        return(
           <View style={styles.container}>
               <StatusBar barStyle="light-content" hidden={false} backgroundColor="#6a0008"/>
               <Image style={styles.LogoStyle} 
                 source={require('./android/app/src/main/assets/secret_white.png')}/>
               <Image style={styles.Title} 
                 source={require('./android/app/src/main/assets/secret_Text.png')}/>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb0000'
    },
    LogoStyle: {
        width: DEVICE_WIDTH/2,
        height: DEVICE_WIDTH/2,
    },
    Title: {
        width: DEVICE_WIDTH/3,
        height: DEVICE_WIDTH/3,
    }
})