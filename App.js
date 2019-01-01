import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import LogIn from './LogIn.js'

export default class App extends Component {
  constructor(props){   // 생성자
    super(props);
  }

  render() {
    return (
       <LogIn/> // LogIn Scene 실행
    );
  }
}