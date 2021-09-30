import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Affiche } from '../../model/affiche';
import { AfficheService } from '../../service/affiche.service';

@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.css']
})
export class ErreurComponent implements OnInit {

  private status:string='ERREUR 403';
  private message:string='Cette zone est interdite. Tourne-toi maintenant!'

  constructor( private afficheServices:AfficheService) { }

  ngOnInit(): void {
    this.status="ERREUR 403";
    this.message="Cette zone est interdite. Tourne-toi maintenant!";
    this.getAllAffiches();
  }
  public  getAllAffiches():void {
    this.afficheServices.getAffiches().subscribe(
      (response:Affiche[])=>{
      },
      (error:HttpErrorResponse)=>{
        this.message="Connexion serveur fermée. Verifier votre serveur !";
        this.status="500";
  
      });
}
}
