/** @format */

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './Screens';

registerScreens();  // Register all Screens in Screen.js

//This event is called once the app is launched.
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({   // like startSingleScreenApp(params)
    root: {
      component:{      // Root Scene
        id: 'Splash',
        name:'Splash',
      },
    }
  });
});