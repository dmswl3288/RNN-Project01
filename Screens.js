import { Navigation } from 'react-native-navigation';

// 모든 Screen 등록하기 
// 앱의 모든 화면 구성 요소는 고유 한 이름으로 등록되어야합니다. ScreenID, generator
export function registerScreens(){
    Navigation.registerComponent('hej.app', () => require('./App').default);
    Navigation.registerComponent('hej.Completed', () => require('./Completed').default);
}