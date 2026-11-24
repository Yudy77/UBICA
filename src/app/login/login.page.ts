import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { IonCard } from '@ionic/angular/ion-card';
import { IonCardHeader } from '@ionic/angular/ion-card-header';
import { IonCardTitle } from '@ionic/angular/ion-card-title';
import { IonCardSubtitle } from '@ionic/angular/ion-card-subtitle';
import { IonCardContent } from '@ionic/angular/ion-card-content';
import { IonList } from '@ionic/angular/ion-list';
import { IonItem } from '@ionic/angular/ion-item';
import { IonInput } from '@ionic/angular/ion-input';
import { IonButton } from '@ionic/angular/ion-button';
import { IonButtons } from '@ionic/angular/ion-buttons';
import { IonMenuButton } from '@ionic/angular/ion-menu-button';
import { IonIcon } from '@ionic/angular/ion-icon';
import { addIcons } from 'ionicons';
import { eye, eyeOff, arrowForward, menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonIcon
  ]
})
export class LoginPage {
  email = '';
  password = '';
  showPassword = false;

  constructor(private router: Router) {
    addIcons({ eye, eyeOff, arrowForward, menuOutline });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.email.trim() && this.password.trim()) {
      sessionStorage.setItem('ubica-sesion', 'activa');
      this.router.navigate(['/home']);
    }
  }
}

