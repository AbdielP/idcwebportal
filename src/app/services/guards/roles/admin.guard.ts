import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalstorageService } from '../../localstorage/localstorage.service';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  token: any;
  constructor(private localstorageService: LocalstorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.localstorageService.getToken();
    return this.localstorageService.getTokenInfo(this.token).pipe(map((results: any) => {

      if (results.tokeninfo.rollid !== 1) {
        // Podría crear un servicio, componente o alguna manera de redireccionar según su roll a su 'homepage'
        return false;
      }
      return true;
    }));
  }
}
