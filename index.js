/** @format */

import React, {Component} from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './Screens';

registerScreens();  // Register all Screens in Screen.js

//This event is called once the app is launched.
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({   // like startSingleScreenApp(params)
    root: {
      stack: {
        id: 'app',
        children: [{
          component: {
            name: "hej.app",
            passProps: {
              text: 'stack with on child'
            }
          }
        }],
        options: {
          topBar: {
            title: {
              text: 'New Application'
            }
          }
        }
      }
    }
  });
});