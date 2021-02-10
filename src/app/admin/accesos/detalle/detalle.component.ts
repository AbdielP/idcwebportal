import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @ViewChild('screen', { static: false}) screenx: ElementRef;
  @ViewChild('canvas', { static: false}) canvasx: ElementRef;
  @ViewChild('downloadLink', { static: false}) downloadLinkx: ElementRef;

  qrcode: any = '';
  acceso: any = [];
  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor(private seguridadService: SeguridadService) { }

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
        console.log(resp);
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

  // Genera un CANVAS a partir del HTML con el formato de QR IDC
  downloadImage(name: string, id: string) {
    html2canvas(this.screenx.nativeElement).then(canvas => {
      this.canvasx.nativeElement.src = canvas.toDataURL();
      this.downloadLinkx.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLinkx.nativeElement.download = `QR_Code_${name}_${id}.png`;
      this.downloadLinkx.nativeElement.click();
    });
    return;
  }

}
