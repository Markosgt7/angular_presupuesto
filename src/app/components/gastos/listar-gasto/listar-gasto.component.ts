import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css'],
})
export class ListarGastoComponent implements OnInit, OnDestroy {
  presupuesto: number;
  restante: number;
  listGasto: any[] = [];

  subscription: Subscription;
  constructor(private _presupuestoServirce: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.subscription = this._presupuestoServirce
      .getGastos()
      .subscribe((data) => {
        console.log(data);
        this.restante = this.restante - data.cantidad;
        this.listGasto.push(data);
      });
  }
  ngOnInit(): void {
    this.presupuesto = this._presupuestoServirce.presupuesto;
    this.restante = this._presupuestoServirce.restante;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  aplicarColorRestante() {
    if (this.presupuesto / 4 > this.restante) {
      return 'alert alert-danger';
    } else if (this.presupuesto / 2 > this.restante) {
      return 'alert alert-warning';
    } else {
      return 'alert alert-secondary';
    }
  }
}
