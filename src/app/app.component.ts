import { Component } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const subscription = this.platform.backButton.subscribeWithPriority(999990, async () => {

        const alert = await this.alertCtrl.create({
          message: '¿Deseas salir de la aplicación?', buttons: [
            {
              text: 'Cancelar',
              handler: async () => {
              }
            },
            {
              text: 'Aceptar',
              handler: async () => {

                if (subscription) { subscription.unsubscribe(); }

                navigator['app'].exitApp();
              },
            }
          ]
        });

        if (this.router.url === '/home') {

          alert.present();

        } else {

          window.history.back();
        }
      });
    });
  }
}
