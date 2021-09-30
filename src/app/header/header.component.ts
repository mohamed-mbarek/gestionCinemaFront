import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthentificationService } from '../service/authentification.service';
import { CommentaireService } from '../service/commentaire.service';
import { ReclamationService } from '../service/reclamation.service';
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nbRecNonVu:number;
  zz=parseInt(localStorage.getItem('idUser'));
  image=localStorage.getItem('image');
  role=localStorage.getItem('role');
  nbResNonVu: number;
  nbCmntNonVu:number;
  cc:number;
  user: User;
  constructor(public authService :AuthentificationService,private router:Router,private reclamationService:ReclamationService ,
              private ticketService:TicketService , private commentaireService:CommentaireService) { }

  ngOnInit(): void {
this.getuserById(this.zz);    
this.onCountNonVu();
this.onCountResNonVu();
this.onCountCmntNonVu();
  
}


public  getuserById(id:number):void {
  this.authService.getUserById(id).subscribe(
    (response:User)=>{
    this.user=response;
    });

}
  onLogout():void{
    this.authService.logout();
    localStorage.clear();
    this.ngOnInit();
  }
  public onCountNonVu(){
    this.reclamationService.countNonVu().subscribe(
      (responce:number)=>{
        this.nbRecNonVu=responce;
        // console.log(responce);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      },
    
    );
  }
  
  
  public onCountResNonVu(){
    this.ticketService.countNonVu().subscribe(
      (responce:number)=>{
        this.nbResNonVu=responce;
        // console.log(responce);
        //this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      },
    
    );
  }

  
  public onCountCmntNonVu(){
    this.commentaireService.countComntNonVu().subscribe(
      (responce:number)=>{
        this.nbCmntNonVu=responce;
      //  this.ngOnInit();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      },
    );
  }
}
