import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

class ActivityIndicatorExample extends Component {
   render() {
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {true}
               color = '#bb0000'
               size = "large"
               style = {styles.activityIndicator}/>
         </View>
      )
   }
}
export default ActivityIndicatorExample

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})