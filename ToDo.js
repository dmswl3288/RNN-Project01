/* ToDo.js ScrollView안에 있는 리스트 내용*/
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

export default class ToDo extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired
    }
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    };

    render(){
        const { isCompleted } = this.state;
        const { text, id, deleteToDo } = this.props;
        return(
            <View style={styles.container}>
              <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleCompleted}>
                    <View style={[styles.circle,                    // style Array
                        isCompleted ? styles.completedCircle : styles.uncompletedCircle]}/>
                </TouchableOpacity>
                <Text style={[styles.text, 
                    isCompleted ? styles.completedText : styles.uncompletedText]}>{text}</Text>
              </View> 

              <View style={styles.actions}>
                <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                   <View style={styles.actionContainer}>
                       <Text>delete</Text>
                   </View>
                </TouchableOpacity>
              </View>
            </View>
        );
    }
    _toggleCompleted = () => {   // 토글
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH-50,
        borderBottomColor: 'blue',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
       width: 30,
       height: 30,
       borderRadius: 15,
       borderWidth: 3,
       marginRight: 15,
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: '#003f60',
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#000"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: DEVICE_WIDTH / 2
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: DEVICE_WIDTH / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
});