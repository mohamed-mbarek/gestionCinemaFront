import { HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  zz:number=parseInt(localStorage.getItem('idUser'));
  image=localStorage.getItem('image');
  isloggedIn=localStorage.getItem('isloggedIn');
  role=localStorage.getItem('role');
  user: User;

  constructor(public authService :AuthentificationService,private router:Router) { }

  ngOnInit(): void {
    if(this.zz!=NaN)
    this.getuserById(this.zz);  
  }

  onLogout():void{
    this.authService.logout();
    localStorage.clear();
    this.ngOnInit();
    this.getuserById(this.zz);
  }
  
  public  getuserById(id:number):void {
    this.authService.getUserById(id).subscribe(
      (response:User)=>{
      this.user=response;
      });
  
  }
}
