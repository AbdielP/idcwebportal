import { Component, HostListener } from '@angular/core';
import { SessionInactivityService } from 'src/app/services/session/session-inactivity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private sessionInactivity: SessionInactivityService) { }

  @HostListener('window:mousemove') refreshUserState() {
    this.sessionInactivity.resetActivity();
  }
}
