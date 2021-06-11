import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-backenderrors',
  templateUrl: './backenderrors.component.html',
  styleUrls: ['./backenderrors.component.css']
})
export class BackenderrorsComponent implements OnInit {

  eventSubscription: Subscription;
  @Input() events: Observable<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscribeEvent();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  subscribeEvent(): void {
    this.eventSubscription = this.events.subscribe(({error}) => {
      error.errors.forEach(element => {
        this.openSnackBar(element.msg);
      });
    });
  }

  openSnackBar(msg) {
    this.snackBar.open(`Error: ${msg}`, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
