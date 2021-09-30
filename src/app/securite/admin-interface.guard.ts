import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminInterfaceGuard implements CanActivate {
  constructor (private authService: AuthentificationService,private router : Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(localStorage.getItem('isloggedIn') && localStorage.getItem('role')!="Client" )
    return true;
    {
      this.router.navigate(['erreu-404']);
    return false;
    }
  }  
}
