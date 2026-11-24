import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

import { IonCard } from '@ionic/angular/ion-card';
import { IonCardContent } from '@ionic/angular/ion-card-content';
import { IonList } from '@ionic/angular/ion-list';
import { IonItem } from '@ionic/angular/ion-item';
import { IonInput } from '@ionic/angular/ion-input';
import { IonSelect } from '@ionic/angular/ion-select';
import { IonSelectOption } from '@ionic/angular/ion-select-option';
import { IonButton } from '@ionic/angular/ion-button';
import { IonButtons } from '@ionic/angular/ion-buttons';
import { IonIcon } from '@ionic/angular/ion-icon';
import { IonFab } from '@ionic/angular/ion-fab';
import { IonFabButton } from '@ionic/angular/ion-fab-button';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  cameraOutline,
  micOutline,
  saveOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonButtons,
    IonIcon,
    IonFab,
    IonFabButton
  ],
})
export class RegistroPage {
  imagen: string | null = null;
  escala = 1;
  distanciaInicial = 0;
  escalaInicial = 1;

  seleccionarImagen(event: Event) {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      this.imagen = lector.result as string;
      this.escala = 1;
    };
    lector.readAsDataURL(archivo);
  }

  iniciarZoom(event: TouchEvent) {
    if (event.touches.length === 2) {
      this.distanciaInicial = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
      this.escalaInicial = this.escala;
    }
  }

  ampliarImagen(event: TouchEvent) {
    if (event.touches.length === 2 && this.distanciaInicial > 0) {
      const distancia = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
      this.escala = Math.min(4, Math.max(1,
        this.escalaInicial * distancia / this.distanciaInicial
      ));
    }
  }

  tipo = '';
  nombre = '';
  ubicacionGeneral = '';
  ubicacionEspecifica = '';

  constructor(private router: Router) {
    addIcons({
      arrowBackOutline,
      cameraOutline,
      micOutline,
      saveOutline
    });
  }

  guardar() {
    if (
      !this.tipo || !this.nombre.trim() ||
      !this.ubicacionGeneral.trim() ||
      !this.ubicacionEspecifica.trim()
    ) {
      return;
    }

    const registro = {
      id: Date.now(),
      tipo: this.tipo,
      nombre: this.nombre.trim(),
      ubicacion: this.ubicacionGeneral.trim() + ', ' +
        this.ubicacionEspecifica.trim(),
      icono: this.tipo === 'Objeto'
        ? 'cube-outline'
        : 'document-text-outline'
    };

    const registros = JSON.parse(
      localStorage.getItem('ubica-registros') || '[]'
    );

    registros.push(registro);

    localStorage.setItem(
      'ubica-registros',
      JSON.stringify(registros)
    );

    this.router.navigate(['/home']);
  }
}


