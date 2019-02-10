import React, {Component} from 'react';
import { StatusBar,
        View,
        StyleSheet,
        Image,
        } from 'react-native';
import {goToAuth, goHome} from './Navigation';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width; 
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Splash extends Component {

    componentDidMount(){
        // Hide StatusBar
        StatusBar.setHidden(true);
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{ goToAuth();
             // Add your logic for the transition
        }, 1000);
    }

    render(){
        return(
           <View style={styles.container}>
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