import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {


  @ViewChild('screen', { static: false}) screenx: ElementRef;
  @ViewChild('canvas', { static: false}) canvasx: ElementRef;
  @ViewChild('downloadLink', { static: false}) downloadLinkx: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
