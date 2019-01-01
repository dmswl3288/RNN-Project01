import { Navigation } from 'react-native-navigation';

export const goToAuth = () => Navigation.setRoot({  // 인증이 안되어 있다면,
    root: {       
      stack: {
          id: 'LogIn',
          children: [{
              component: {
                  name: 'LogIn'
              }
          }]
      }
    }
});

export const goHome = () => Navigation.setRoot({  // 이미 인증이 되었다면 Completed
    root: {                                       //를 root 씬으로 설정
        stack: {
            id: 'Completed',
            children: [
                {
                    component: {
                        name: 'Completed'
                    }
                }
            ],
        }
    }
});