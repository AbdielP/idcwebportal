import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mdc-list',
  templateUrl: './mdc-list.component.html',
  styleUrls: ['./mdc-list.component.css']
})
export class MdcListComponent implements OnInit {

  nombreEmpresa = '';
  usuarios: any;
  versionesMatriz = '';

  constructor() { }

  ngOnInit(): void {
  }

  getVersion(event: any) {}

  redirect(link: string) {}

}
