import { Component, HostListener } from '@angular/core';
import { SessionInactivityService } from 'src/app/services/session/session-inactivity.service';

@Component({
  selector: 'app-mdc',
  templateUrl: './mdc.component.html',
  styleUrls: ['./mdc.component.css']
})
export class MdcComponent {

  showForm = false;
  showMDCList = true;

  constructor(private sessionInactivity: SessionInactivityService) { 
    // this.showForm = true;
  }

  @HostListener('window:mousemove') refreshUserState() {
    this.sessionInactivity.resetActivity();
  }

  mostrarForm(): void {
    this.showForm = true;
    this.showMDCList = false;
  }

  mostrarMDCList(): void {
    this.showMDCList = true;
    this.showForm = false;
  }

}
