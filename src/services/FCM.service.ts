import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMServices {
    messageListener:any

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
        await messaging().setAutoInitEnabled(true);
        }
     };

    register = (
        onRegister: any,
        onNotification: any,
        onOpenNotification: any,
      ) => {
        this.checkPermission(onRegister);
        this.createNoitificationListeners(
          onRegister,
          onNotification,
          onOpenNotification,
        );
      };

    checkPermission = async (onRegister: ()=> any) => {
        const authorizationStatus = await messaging().hasPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          //if user has permission
          console.log('fcm checkpermission true');
          this.getFCMToken(onRegister);
        } else {
          //if user don't have permission
          console.log('fcm checkpermission false');
          this.requestPermission(onRegister);
        }
      };

      requestPermission = async (onRegister: (t:string)=> void) => {
        if (messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const authorizationStatus = await messaging().requestPermission({  alert: true });
        if ( authorizationStatus === (messaging.AuthorizationStatus.AUTHORIZED || messaging.AuthorizationStatus.NOT_DETERMINED) ) {
         this.getFCMToken(onRegister)
        } else if ( authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL ) {
          console.log('User has provisional notification permissions.');
        } else {
          console.log('User has notification permissions disabled');
        }
      };

      

    getFCMToken(onRegister:(t: string)=> any){
        messaging().getToken().then((FCMToken)=>{
            onRegister(FCMToken)
        })
    }

    createNoitificationListeners = (
        onRegister: (t:string)=> void,
        onNotification: (msg:string)=> void,
        onOpenNotification: (msg:string)=> void,
      ) => {
          //forground 
          this.messageListener=  messaging().onMessage((remoteMessage:any)=>{
              onNotification(remoteMessage)
          })
        // Background
        messaging().onNotificationOpenedApp((remoteMessage:any)=>{
            onOpenNotification(remoteMessage)
        })
    
        // Quit state
        messaging().getInitialNotification().then((remoteMessage:any)=>{
            onOpenNotification(remoteMessage)
        })
    
        // Triggered when have  new token
        messaging().onTokenRefresh(token => {
          console.log('token was refreshed: fcm', token);
          onRegister(token);
        });
      };
       
     

       backgroundListener = () => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });
      };


      deletedToken = () => {
        messaging().deleteToken().catch(error => {
          console.log('Delected token error fcm', error);
        });
      };
    

      unRegister = () => {
        this.messageListener()
      };
      
    
}

export default FCMServices