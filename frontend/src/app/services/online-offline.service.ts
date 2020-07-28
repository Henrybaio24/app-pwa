import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  private estadoConexion = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => this.updateStatusConnection());
    window.addEventListener('offline', () => this.updateStatusConnection());
  }

  get isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  get statusConnection(): Observable<boolean> {
    return this.estadoConexion.asObservable();
  }

  updateStatusConnection() {
    this.estadoConexion.next(this.isOnline);
  }
}
