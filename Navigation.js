import { Navigation } from 'react-native-navigation';

export const goToAuth = () => Navigation.setRoot({  // 인증이 안되어 있다면,
    root: {       
      stack: {
          children: [{
                component: {
                    id: 'LogIn',
                    name: 'LogIn'
                },
          }]
      }
    }
});

export const goHome = () => Navigation.setRoot({  // 이미 인증이 되었다면 Completed
    root: {                                       //를 root 씬으로 설정
        stack: {
            children: [
                {
                    component: {
                        id: 'Completed',
                        name: 'Completed'
                    }
                }
            ],
        }
    }
});