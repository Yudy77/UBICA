import { Injectable, signal } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private readonly connection = signal<boolean | null>(null);

  readonly connected = this.connection.asReadonly();

  async start(): Promise<void> {
    // Escucha los cambios de conexión en tiempo real.
    await Network.addListener('networkStatusChange', (status) => {
      this.connection.set(status.connected);
    });

    // Consulta el estado inicial de la conexión.
    const status = await Network.getStatus();
    this.connection.set(status.connected);
  }
}
