/* NoteItem.js ScrollView안에 있는 리스트 내용*/
import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, 
        View, TouchableOpacity, Image,
        StatusBar, ScrollView, Platform,
        Alert } from 'react-native';
import Dimensions from 'Dimensions';
import {Navigation} from 'react-native-navigation';
import PropTypes from "prop-types";

// 기기의 해상도 가져오기
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height; 

export default class NoteItem extends Component{
    static propTypes = {
        websiteText: PropTypes.string.isRequired,
        idText: PropTypes.string.isRequired,
        pwText: PropTypes.string.isRequired,
    }
    render(){
        const { websiteText, idText, pwText } = this.props;
        return(
            <View style={styles.container}>
              <Text style={styles.website}>{websiteText}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.textStyle}>
                    <Text style={{color: "#000", alignSelf: "center",fontSize: 15,
                                fontWeight: 'bold'}}>ID</Text>
                </View>
                <Text style={styles.valueID}>{idText}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.textStyle}>
                    <Text style={{color: "#000", alignSelf: "center", fontSize: 15,
                                fontWeight: 'bold'}}>PW</Text>
                </View>
                 <Text style={styles.valuePW}>{pwText}</Text>
              </View>              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: DEVICE_WIDTH-50,
        borderBottomColor: '#780c00',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'column',
        
    },
    website: {
        fontSize: 20,
        padding: 5,
        marginHorizontal: 10,
        color: "#bb0000",
        fontWeight: "bold"
    },
    textStyle: {
        width: 60,
    },
    valueID: {
        fontSize: 15,
        marginHorizontal: 5,
        marginBottom: 2,
        color: "#000",
    },
    valuePW: {
        fontSize: 15,
        marginHorizontal: 5,
        marginBottom: 5,
        color: "#000",
    },
    
});