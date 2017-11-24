import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FCM,
    SocialSharing]
})
export class HomePage {
  public topicName: string; // topic name to subscribe
  public deviceToken: string; // device token 
  public status: any; // status of the plugin

  constructor(public navCtrl: NavController,
    public fcm: FCM,
  public socialSharing: SocialSharing) {
    fcm.onNotification().subscribe(data => {
      this.status = JSON.stringify(data);
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    })
  }

  subscribe() {
    this.fcm.subscribeToTopic(this.topicName);
  }

  unSubscribe() {
    this.fcm.unsubscribeFromTopic(this.topicName);
  }

  getDeviceToken() {
    this.fcm.getToken().then(token => {
      this.deviceToken = token;
      console.warn('Device Token is:', token);
    })
  }

  shareToken(){
    this.socialSharing.share(this.deviceToken, 'Device Token').then(() => {
      // Success!
      console.log('Shared Content');
    }).catch((err) => {
      // Error!
      console.warn('err:',JSON.stringify(err));
    });
  }
}
