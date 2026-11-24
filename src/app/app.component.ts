import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { IonMenu } from '@ionic/angular/ion-menu';
import { IonMenuToggle } from '@ionic/angular/ion-menu-toggle';
import { IonSplitPane } from '@ionic/angular/ion-split-pane';
import { IonList } from '@ionic/angular/ion-list';
import { IonItem } from '@ionic/angular/ion-item';
import { IonIcon } from '@ionic/angular/ion-icon';
import { IonLabel } from '@ionic/angular/ion-label';
import { addIcons } from 'ionicons';
import { homeOutline, addCircleOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    IonApp, IonRouterOutlet, IonMenu, IonMenuToggle, IonSplitPane,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonIcon, IonLabel, RouterLink
  ],
})
export class AppComponent {
  menuHabilitado = false;

  cerrarSesion() {
    sessionStorage.removeItem('ubica-sesion');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuHabilitado =
          event.urlAfterRedirects !== '/login';
      }
    });
    addIcons({ homeOutline, addCircleOutline, logOutOutline });
  }
}




