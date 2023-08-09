import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  presupuesto: number;
  restante: number;
  private gasto$ = new Subject<any>();

  constructor() {
    this.presupuesto = 0;
    this.restante = 0;
  }
  agregarGasto(gasto: any) {
    this.restante = this.restante - gasto.cantidad;
    this.gasto$.next(gasto);//todos los componentes suscritos a este metodo van a recibir este valor
  }

  getGastos(): Observable<any>{
    return this.gasto$.asObservable(); //retorna un observable que se va sub
  }

}
