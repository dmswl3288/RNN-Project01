import { Navigation } from 'react-native-navigation';

// 모든 Screen 등록하기 
// 앱의 모든 화면 구성 요소는 고유 한 이름으로 등록되어야합니다. ScreenID, generator
export function registerScreens(){
    Navigation.registerComponent('Splash', () => require('./Splash').default);
    Navigation.registerComponent('App', () => require('./App').default);
    Navigation.registerComponent('LogIn', () => require('./LogIn').default);
    Navigation.registerComponent('SignUp', () => require('./SignUp').default);
    Navigation.registerComponent('Completed', () => require('./Completed').default);
    Navigation.registerComponent('ToDoList', () => require('./ToDoList').default);
    Navigation.registerComponent('NotePW', () => require('./NotePW').default);
}