import { Component, ViewChild, ElementRef, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent {

  qrcode: any = '';
  nombre = '';
  cedula = '';

  @ViewChild('screen', { static: false}) screenx: ElementRef;
  @ViewChild('canvas', { static: false}) canvasx: ElementRef;
  @ViewChild('downloadLink', { static: false}) downloadLinkx: ElementRef;

  constructor(public dialogRef: MatDialogRef<QrcodeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.qrcode = data.qrcode;
    this.nombre = data.nombre;
    this.cedula = data.cedula;
  }

   // Genera un CANVAS a partir del HTML con el formato de QR IDC
   downloadImage(name: string, id: string) {
    html2canvas(this.screenx.nativeElement).then(canvas => {
      this.canvasx.nativeElement.src = canvas.toDataURL();
      this.downloadLinkx.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLinkx.nativeElement.download = `QR_Code_${name}_${id}.png`;
      this.downloadLinkx.nativeElement.click();
    });
  }

}
