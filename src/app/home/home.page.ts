import { RegistrosService } from '../registros.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/angular';

import { IonCard } from '@ionic/angular/ion-card';
import { IonCardContent } from '@ionic/angular/ion-card-content';
import { IonList } from '@ionic/angular/ion-list';
import { IonItem } from '@ionic/angular/ion-item';
import { IonItemSliding } from '@ionic/angular/ion-item-sliding';
import { IonItemOptions } from '@ionic/angular/ion-item-options';
import { IonItemOption } from '@ionic/angular/ion-item-option';
import { IonLabel } from '@ionic/angular/ion-label';
import { IonIcon } from '@ionic/angular/ion-icon';
import { IonButtons } from '@ionic/angular/ion-buttons';
import { IonMenuButton } from '@ionic/angular/ion-menu-button';
import { IonRefresher } from '@ionic/angular/ion-refresher';
import { IonRefresherContent } from '@ionic/angular/ion-refresher-content';
import { IonFab } from '@ionic/angular/ion-fab';
import { IonFabButton } from '@ionic/angular/ion-fab-button';

import { addIcons } from 'ionicons';
import {
  trash,
  cubeOutline,
  documentTextOutline,
  addOutline,
  searchOutline,
  keyOutline,
  notificationsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonIcon,
    IonButtons,
    IonMenuButton,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton
  ],
})
export class HomePage {
  temporizador: ReturnType<typeof setTimeout> | null = null;
  registroSeleccionado: any = null;
  menuContextual = false;
  inicioX = 0;
  inicioY = 0;

  iniciarPulsacion(event: PointerEvent, registro: any) {
    this.cancelarPulsacion();
    this.inicioX = event.clientX;
    this.inicioY = event.clientY;

    this.temporizador = setTimeout(() => {
      this.registroSeleccionado = registro;
      this.menuContextual = true;
    }, 800);
  }

  detectarMovimiento(event: PointerEvent) {
    if (Math.abs(event.clientX - this.inicioX) > 10 ||
        Math.abs(event.clientY - this.inicioY) > 10) {
      this.cancelarPulsacion();
    }
  }

  cancelarPulsacion() {
    if (this.temporizador !== null) {
      clearTimeout(this.temporizador);
      this.temporizador = null;
    }
  }

  cerrarMenu() {
    this.menuContextual = false;
  }

  registros = [
    {
      id: 1,
      nombre: 'Llaves',
      tipo: 'Objeto',
      ubicacion: 'Escritorio, gaveta superior',
      icono: 'key-outline'
    },
    {
      id: 2,
      nombre: 'Contrato',
      tipo: 'Documento',
      ubicacion: 'Oficina, carpeta azul',
      icono: 'document-text-outline'
    }
  ];

  constructor(private registrosService: RegistrosService) {
    addIcons({
      trash,
      cubeOutline,
      documentTextOutline,
      addOutline,
      searchOutline,
      keyOutline,
      notificationsOutline
    });
  }

  ngOnInit() {
    this.cargarRegistros();
  }

  ionViewWillEnter() {
    this.cargarRegistros();
  }

  async cargarRegistros() {
    this.registros = await this.registrosService.actualizar(
      registros => registros,
      this.registros
    );
  }

  async eliminar(id: number) {
    this.registros = await this.registrosService.actualizar(
      registros => registros.filter(registro => registro.id !== id)
    );
  }

  refrescar(event: CustomEvent) {
    setTimeout(() => {
      this.cargarRegistros();
      event.detail.complete();
    }, 800);
  }
}


