import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-user-compte',
  templateUrl: './user-compte.component.html',
  styleUrls: ['./user-compte.component.css']
})
export class UserCompteComponent implements OnInit {

user:User;
  aletSuccess: boolean;
  message: string;
  aletEroor: boolean;
  editUser: User;
  deleteUser: User;
  messageErreur: String;
  constructor (private authService:AuthentificationService ,private router:Router) { }

  idUser=parseInt(localStorage.getItem('idUser'));
  ngOnInit(): void {
    this.getuserById(this.idUser);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);

  }

  public  getuserById(id:number):void {
    this.authService.getUserById(id).subscribe(
      (response:User)=>{
      this.user=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
  
  }




  public onUpdateUser(user: User): void {
    document.getElementById('fermer-user').click();
    this.authService.UpdateUser(user).subscribe(
      (responce: User) => {
        this.ngOnInit();
        this.aletSuccess=true; 
      },
      (error: HttpErrorResponse) => {
        this.onOpenModelError(error.error.message, 'erreur');
      }
    );
  }
  public onDeleteUser(idUser: number) {
    document.getElementById('delete-user-form').click();
    this.authService.deleteUser(idUser).subscribe(
      (responce: void) => {        
        this.ngOnInit();
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {

        this.aletEroor=true;
        this.message=' Aucune suppression effectuée '; 
      },
    );
  }







  public onOpenModal(user: User, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (mode === 'edit') {
      this.editUser = user;
      button.setAttribute('data-target', '#updateUseModal');
    }
    if (mode === 'delete') {

      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container.appendChild(button);
    button.click();
  }
  public onOpenModelError(erreur: String, string: String): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (string == "erreur") {
      this.messageErreur = erreur;
      button.setAttribute('data-target', '#httpErreur');
    }
    container.appendChild(button);
    button.click();
  }

}
