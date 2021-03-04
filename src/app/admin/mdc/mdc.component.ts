import { Component, HostListener } from '@angular/core';
import { SessionInactivityService } from 'src/app/services/session/session-inactivity.service';

@Component({
  selector: 'app-mdc',
  templateUrl: './mdc.component.html',
  styleUrls: ['./mdc.component.css']
})
export class MdcComponent {

  constructor(private sessionInactivity: SessionInactivityService) { }

  @HostListener('window:mousemove') refreshUserState() {
    this.sessionInactivity.resetActivity();
  }

}
