import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  hoy: Date;

  constructor() { }

  actualYear(): number {
    this.hoy = new Date();
    const actualYear = this.hoy.getFullYear();
    return actualYear;
  }
}
