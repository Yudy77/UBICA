import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/angular';

import { IonCard } from '@ionic/angular/ion-card';
import { IonCardHeader } from '@ionic/angular/ion-card-header';
import { IonCardTitle } from '@ionic/angular/ion-card-title';
import { IonCardSubtitle } from '@ionic/angular/ion-card-subtitle';
import { IonCardContent } from '@ionic/angular/ion-card-content';

import { IonList } from '@ionic/angular/ion-list';
import { IonItem } from '@ionic/angular/ion-item';
import { IonItemSliding } from '@ionic/angular/ion-item-sliding';
import { IonItemOptions } from '@ionic/angular/ion-item-options';
import { IonItemOption } from '@ionic/angular/ion-item-option';
import { IonLabel } from '@ionic/angular/ion-label';
import { IonIcon } from '@ionic/angular/ion-icon';

import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
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
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonIcon
  ],
})
export class HomePage {

  tareas = [
    {
      id: 1,
      titulo: 'Tarea 1',
      descripcion: 'Estudiar componentes Ionic'
    },
    {
      id: 2,
      titulo: 'Tarea 2',
      descripcion: 'Practicar listas interactivas'
    },
    {
      id: 3,
      titulo: 'Tarea 3',
      descripcion: 'Probar la aplicación en Android'
    }
  ];

  constructor() {
    addIcons({ trash });
  }

  eliminar(id: number) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
  }
}