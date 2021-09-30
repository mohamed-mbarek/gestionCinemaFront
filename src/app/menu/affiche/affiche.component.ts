import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Affiche } from 'src/app/model/affiche';
import { AfficheService } from 'src/app/service/affiche.service';

@Component({
  selector: 'app-affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.css']
})
export class AfficheComponent implements OnInit {
  affiches:Affiche[];
  constructor( private afficheServices:AfficheService) { }

  ngOnInit(): void {
  this.getAllAffiches();
  }


  public  getAllAffiches():void {
    this.afficheServices.getAffiches().subscribe(
      (response:Affiche[])=>{
      this.affiches=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.error.message);
      });
  
  }
}
