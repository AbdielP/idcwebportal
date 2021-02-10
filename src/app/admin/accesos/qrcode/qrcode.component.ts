import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Input  } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  qrcode: any = '';
  nombre = '';
  cedula = '';
  @Input() events: Observable<any>;
  eventSubscription: Subscription;

  @ViewChild('screen', { static: false}) screenx: ElementRef;
  @ViewChild('canvas', { static: false}) canvasx: ElementRef;
  @ViewChild('downloadLink', { static: false}) downloadLinkx: ElementRef;

  constructor() { }

  ngOnInit() {
    this.subscribeEventQRCode();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  // Observable, se subscribe al evento que emite el qrcode desde componente padre app-accesos
  subscribeEventQRCode(): void {
    this.eventSubscription = this.events.subscribe(({qrcode}) => {
      this.qrcode = qrcode.qrcode;
      this.nombre = qrcode.nombre;
      this.cedula = qrcode.cedula;
    });
  }

}
