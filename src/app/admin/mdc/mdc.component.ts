import { Component, HostListener } from '@angular/core';
import { SessionInactivityService } from 'src/app/services/session/session-inactivity.service';

@Component({
  selector: 'app-mdc',
  templateUrl: './mdc.component.html',
  styleUrls: ['./mdc.component.css']
})
export class MdcComponent {

  showForm = false;
  showList = false;

  constructor(private sessionInactivity: SessionInactivityService) { 
    // this.showForm = true;
  }

  @HostListener('window:mousemove') refreshUserState() {
    this.sessionInactivity.resetActivity();
  }

  // Muestra el componente listado de MDC
  mostrarMDCList(event: any) {
    this.showList = event;
    this.showForm = !event;
  }

  // Muestra el componente de formulario para añadir usuario a la MDC
  mostrarMDCForm(event: any) {
    this.showForm = event;
    this.showList = !event;
  }

}
