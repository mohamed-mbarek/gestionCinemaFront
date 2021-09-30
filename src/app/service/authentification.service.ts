import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiServiceUrl=environment.apiBaseUrl;
  

  public loggedUser:string;
  public isloggedIn: Boolean = false;
  public role:string;
  public image:string;
  idUser: number;
  constructor(private router:Router ,private http:HttpClient) { }


  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServiceUrl}/login/all`);
  }
public addUser(user :User):Observable<User>{
return  this.http.post<User>(`${this.apiServiceUrl}/login/add`,user);
}
public UpdateUser(user :User):Observable<User>{
  return  this.http.put<User>(`${this.apiServiceUrl}/login/update`,user);
}
public deleteUser(usereId:number):Observable<void>{
  return  this.http.delete<void>(`${this.apiServiceUrl}/login/delete/${usereId}`);
}

public getUserById(usereId:number):Observable<User>{
  return  this.http.get<User>(`${this.apiServiceUrl}/login/find/${usereId}`);
}
public getPassWord(nom:string , prenom:string ,email:string):Observable<string>{
  return  this.http.get<string>(`${this.apiServiceUrl}/login/findPassWord/${nom}/${prenom}/${email}`);
}


public getAllUsers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.apiServiceUrl}/login/all`);
}

  logout() {
    this.isloggedIn= false;
    this.loggedUser = undefined;
    this.role = undefined;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    this.router.navigate(['/login']);
    }


    SignIn(user :User ,users: User[] ):String{
    let validUser: Boolean = false;
    users.forEach((curUser) => {
      console.log(curUser.email);
    if(user.email=== curUser.email && user.password==curUser.password) {
    validUser = true;
    this.loggedUser = curUser.nom+" "+curUser.prenom;
    this.isloggedIn = true;
    this.image=curUser.image;
    this.role = curUser.roles;
    this.idUser=curUser.id;
    localStorage.setItem('loggedUser',this.loggedUser);
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    localStorage.setItem('image',this.image);
    localStorage.setItem('role',this.role);
    localStorage.setItem('idUser',this.idUser.toString());
    

  }
    });
    return this.role;
    }
 
    isAdmin():Boolean{

      if (!this.role ||this.role.indexOf('Assistant')>-1) //this.roles== undefiened
      return false;
      return (this.role.indexOf('Admin')>-1);  
            
  }
}
