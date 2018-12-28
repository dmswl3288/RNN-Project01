import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import Dimensions from 'Dimensions';
import {Navigation} from 'react-native-navigation';

export default class Completed extends Component {
    constructor(props){   // 생성자
        super(props);
    }
    static get options(){
        return{
          topBar: {
            title: {
              text: 'Completed Screen'
            },
          }
        };
      }

    render(){
        return(
            <View>
                <Text style={styles.textStyle}>Completed Log In!!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30
    }
});