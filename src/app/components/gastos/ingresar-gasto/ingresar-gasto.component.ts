import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css'],
})
export class IngresarGastoComponent {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textIncorrecto: string;
  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = '';
  }
  agregarGasto() {
    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Su gasto es mayor a su disponible';
      return;
    }

    if (this.nombreGasto == '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Descripción del  gasto o cantidad Incorrecta';
    } else {
      //creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad,
      };
      //enviamos el objeto a los subscriptores via subjet
      this._presupuestoService.agregarGasto(GASTO);

      //reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
