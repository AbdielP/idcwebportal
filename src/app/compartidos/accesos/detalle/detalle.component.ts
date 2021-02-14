import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { QrcodeComponent } from 'src/app/compartidos/accesos/qrcode/qrcode.component';

import QRCode from 'qrcode';

import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  qrcode: any = '';
  acceso: any = [];
  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor(private seguridadService: SeguridadService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subscribeEventDetalleAcceso();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  subscribeEventDetalleAcceso(): void {
    this.eventSubscription = this.events.subscribe(({detalle}) => {
      this.seguridadService.select(`sp_select_accesos_detalle('${detalle}')`).subscribe((resp: any) => {
        // console.log(resp);
        this.acceso = resp.select[0];
        this.generarQR(this.acceso);
      });
    });
  }

  // Genera el código QR
  generarQR(info: any): void {
    QRCode.toDataURL(`http://cwp-idc-sca/seguridad/agentsec/reg_visita_in.php?cedula_visitante=${info.cedula_visitante}&button=Buscar`)
    .then(url => {
      this.qrcode = url;
    })
    .catch(err => {
      console.error(err);
    });
  }

  // Abre el modal de Angular-Material para mostrar el QRCode
  openDialog() {
    const dialogRef = this.dialog.open(QrcodeComponent, {
      width: '500px',
      data: {qrcode: this.qrcode, nombre: this.acceso.nombre_visitante, cedula: this.acceso.cedula_visitante}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`); NO HACE NADA A PROPOSITO
    });
  }

}