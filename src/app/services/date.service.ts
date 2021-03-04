import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  hoy: any;
  dd: any;
  mm: any;
  yyyy: any;

  constructor() { }

  public getDate(){
    this.hoy = new Date();
    this.dd = this.hoy.getDate();
    this.mm = this.hoy.getMonth() + 1; // Enero es 0!

    this.yyyy = this.hoy.getFullYear();
    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }
    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }
    // hoy = `${this.dd}-${this.mm}-${yyyy}`;
    this.hoy = `${this.yyyy}-${this.mm}-${this.dd}`;
    return this.hoy;
  }

  public lastDayYear() {
    // return new Date(new Date().getFullYear(), 11, 31);
    this.hoy = new Date();
    this.yyyy = this.hoy.getFullYear();
    const lastDay = `${this.yyyy}-12-31`;
    return lastDay;
  }

  public firstDayNextYear() {
    const hoy: any = new Date();
    const yyyy: any = hoy.getFullYear();
    const nextYear = `${yyyy + 1}-01-01`;
    return nextYear;
    // console.log(`${yyyy+1}-01-01`)
  }

  actualYear(): number {
    this.hoy = new Date();
    const actualYear = this.hoy.getFullYear();
    return actualYear;
  }
}
