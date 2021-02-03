import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;

  constructor() {
    this.loadSession();
  }

  loadSession(): void {
    if (localStorage.getItem('sti')) {
      this.token = localStorage.getItem('sti');
    } else {
      this.token = '';
    }
  }

  isLogedIn(): boolean {
    return (this.token.length > 5) ? true : false;
  }
}
