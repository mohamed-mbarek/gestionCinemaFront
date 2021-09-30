import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from '../model/user';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users:User[];
  public erreur:number; 
  user = new User();
  aletSuccess:boolean;
  aletEroor:boolean;
  message:string;
  MessageLogin:string;
  passWord:string
  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
    localStorage.clear();
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.aletSuccess = false;
 }, 8000);
 setTimeout(()=>{                           //<<<---using ()=> syntax
  this.aletEroor = false;
}, 8000);
  this.MessageLogin = null;
  this.passWord = null;
}
  public  getAllUsers():void {
    this.authService.getUsers().subscribe(
      (response:User[])=>{
      this.users=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
  
  }

  onLoggedin(logForm:NgForm) {
    let isValidUser: String = this.authService.SignIn(this.user ,this.users);
    if (isValidUser=="Admin" || isValidUser=="Assistant"){
      this.router.navigate(['/adminProjectionFilm']);
    }
    else if(isValidUser=="Client")
    this.router.navigate(['/Films']);
      else{
      this.erreur=1;
      
  }
  logForm.reset();
}
public resetErreur(){
  this.erreur=0;
}
  public onAddUser(addForm: NgForm): void {

console.log(addForm.value);
    this.authService.addUser(addForm.value).subscribe(
      (responce: User) => {
        this.aletSuccess=true;
        this.message='Inscription avec succès ';  
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {

        this.aletEroor=true;
        if(error.status==509)
        this.message=error.error.message;  
        else
        this.message=' réessayer une autre fois';  
        this.ngOnInit();
      },
    );
    addForm.reset();

  }
  public  resetForm(form:NgForm){
    this.ngOnInit()
    form.reset();
  }
  public  getPassWord(form:NgForm){
    const values = form.value;
    const nom =values.nom;
    const prenom=values.prenom;
    const email=values.email;    
  
    this.authService.getPassWord(nom,prenom,email).subscribe(
      (responce: String) => {
        alert(responce);
      },
      
      (error:HttpErrorResponse)=>{
         this.passWord=error.error.text;
        this.MessageLogin=error.error.message;
      });
  ;
  
  }

  public onOpenModal(mode: string): void { 
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#loginModal');
    }
    container.appendChild(button);
      button.click();
  
}

}
