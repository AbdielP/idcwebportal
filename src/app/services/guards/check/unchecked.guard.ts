import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UncheckedGuard implements CanActivate {
  token: string;
  constructor(private localStorageService: LocalstorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.localStorageService.getToken();
    return this.localStorageService.getTokenInfo(this.token).pipe(map((results: any) => {
      if (results.tokeninfo.checked !== 0) {
        // Podría redireccionar al login?
        return false;
      }
      return true;
    }));
  }
}
