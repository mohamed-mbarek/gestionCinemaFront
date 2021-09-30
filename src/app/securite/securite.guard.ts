import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class SecuriteGuard implements CanActivate {

  constructor (private authService: AuthentificationService,
    private router : Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(localStorage.getItem('role')=='Admin')
    return true;
    {
      this.router.navigate(['erreu-404']);
    return false;
    }
  }
  
}
