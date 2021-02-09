import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.subscribeEventDetalleAcceso();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  subscribeEventDetalleAcceso(): void {
    this.eventSubscription = this.events.subscribe(({detalle}) => {
      console.log(detalle);
    });
  }

}
