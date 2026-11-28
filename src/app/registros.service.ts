import { effect, inject, Injectable, signal } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { NetworkService } from './network.service';
import { Storage } from '@ionic/storage';

interface RegistroUbica {
  id: number;
  nombre: string;
  tipo: string;
  ubicacion: string;
  icono: string;
  pendiente?: boolean;
}

@Injectable({ providedIn: 'root' })
export class RegistrosService {
  private readonly clave = 'ubica-registros';
  private readonly almacen = new Storage().create();
  private ultimaOperacion: Promise<unknown> = Promise.resolve();

  actualizar(
    cambiar: (registros: RegistroUbica[]) => RegistroUbica[] | Promise<RegistroUbica[]>,
    iniciales: RegistroUbica[] = []
  ): Promise<RegistroUbica[]> {
    const operacion = this.ultimaOperacion.then(async () => {
      const almacen = await this.almacen;
      let registros: RegistroUbica[] | null = await almacen.get(this.clave);

      // Recupera los registros que UBICA guardaba antes de usar Ionic Storage.
      if (registros === null) {
        const anteriores = localStorage.getItem(this.clave);
        registros = anteriores === null ? iniciales : JSON.parse(anteriores);
      }

      const actualizados = await cambiar(registros ?? iniciales);
      await almacen.set(this.clave, actualizados);
      return actualizados;
    });

    // Mantiene las escrituras en orden, incluso si una operacion falla.
    this.ultimaOperacion = operacion.catch(() => undefined);
    return operacion;
  }

  private readonly red = inject(NetworkService);
  readonly ultimoSincronizado = signal<string | null>(null);

  constructor() {
    effect(() => {
      if (this.red.connected()) {
        void this.sincronizarPendientes().catch(console.error);
      }
    });
  }

  async guardar(registro: RegistroUbica): Promise<void> {
    await this.actualizar(registros => [...registros, { ...registro, pendiente: true }]);
    if (this.red.connected()) {
      void this.sincronizarPendientes().catch(console.error);
    }
  }

  private async sincronizarPendientes(): Promise<void> {
    let confirmado: string | null = null;
    await this.actualizar(async registros => {
      const actualizados = [];
      for (const registro of registros) {
        if (!registro.pendiente || !this.red.connected()) {
          actualizados.push(registro);
          continue;
        }

        try {
          const respuesta = await CapacitorHttp.put({
            url: `http://127.0.0.1:3100/registros/${registro.id}`,
            headers: { 'Content-Type': 'application/json' },
            data: registro,
            connectTimeout: 4000,
            readTimeout: 4000
          });
          if (
            respuesta.status === 200 &&
            respuesta.data?.sincronizado === true &&
            respuesta.data?.id === registro.id
          ) {
            actualizados.push({ ...registro, pendiente: false });
            confirmado = registro.nombre;
            continue;
          }
        } catch (error) {
          console.warn('El registro sigue pendiente', error);
        }

        actualizados.push(registro);
      }
      return actualizados;
    });

    // El aviso se muestra después de guardar el estado confirmado.
    if (confirmado !== null) {
      this.ultimoSincronizado.set(confirmado);
    }
  }
}