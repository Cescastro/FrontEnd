import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl = 'https://localhost:44342/';
  myApiUrl = 'api/TarjetaCredito/';
  list: TarjetaCredito[];
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito>{
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl,tarjeta);
  }

  eliminarTarjeta(id: number): Observable<TarjetaCredito> {
    return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id);
  }

  obtenerTarjetas(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
                  .then(data =>{
                    this.list = data as TarjetaCredito[];
                  });
  }

  actualizar(tarjeta){
    this.actualizarFormulario.next(tarjeta);
  }

  obtenerTarjeta$(): Observable<TarjetaCredito>{
    return this.actualizarFormulario.asObservable();
  }

}
