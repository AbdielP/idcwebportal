import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionInactivityService {

  userActivity: any;
  userInactive: Subject<any> = new Subject();

  constructor(private authService: AuthService) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.callLogOut());
  }

  setTimeout() {
    // this.userActivity = setTimeout(() => this.userInactive.next(undefined), 5000);
    // this.userActivity = setTimeout(() => this.userInactive.next(undefined), 300000); // 5 Minutos
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 28800000);
  }

  callLogOut() {
    // console.log('user has been inactive for 4s');
    this.authService.logOut();
  }

  resetActivity() {
    // console.log('Se mueve?');
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
