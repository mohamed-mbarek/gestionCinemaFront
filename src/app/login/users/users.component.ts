import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[];
  public editUser: User;
  public deleteUser: User;
  messageErreur: String;
  aletSuccess: boolean;
  aletEroor: boolean;
  message: string;


  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.getAllUsers();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);

  }
  public getAllUsers(): void {
    this.authService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message='  Ne peut pas obtenir la liste des comptes.';
      });

  }

  public onAddUser(addForm: NgForm): void {

    document.getElementById('add-user-form').click();
    this.authService.addUser(addForm.value).subscribe(
      (responce: User) => {
        addForm.reset();
        this.ngOnInit();
        this.aletSuccess=true;
        this.message=' Ajout avec succès ';  
  
      },
      (error: HttpErrorResponse) => {
          addForm.reset();
        this.onOpenModelError(error.error.message, 'erreur');
      },

    );
  }


  public onUpdateUser(user: User): void {
    document.getElementById('fermer-user').click();
    this.authService.UpdateUser(user).subscribe(
      (responce: User) => {
        this.ngOnInit();
        this.aletSuccess=true;
        this.message=' Modifier avec succès ';  
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
        
        this.aletSuccess=true;
        this.message='Utilisateur supprimer avec succès '; 
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.aletEroor=true;
        this.message=' Aucune suppression effectuée '; 
      },
    );
  }


  public searchUser(key: string): void {
    console.log(key);
    const resultat: User[] = [];
    for (const v of this.users) {
      if (v.nom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1 || v.prenom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1 || v.roles.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
    }
    this.users = resultat;
  }





  public onOpenModal(user: User, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModel');

    }
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

