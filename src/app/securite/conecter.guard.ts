import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConecterGuard implements CanActivate {
  constructor (private router : Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(localStorage.getItem('isloggedIn')=='true')
        return true;
    {
      this.router.navigate(['erreu-404']);
        return false;
    }
  }
  
}
