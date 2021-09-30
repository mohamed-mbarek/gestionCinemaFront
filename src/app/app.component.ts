import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Affiche } from './model/affiche';
import { AfficheService } from './service/affiche.service';
import { HttpErrorService } from './service/http-error.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  affiches:Affiche[];
  title = 'cinemamanegerfront';
  erreur:boolean;
 x:NavigationEnd
  constructor(private error:HttpErrorService ,private afficheServices:AfficheService,
              private router:Router   , private route:ActivatedRoute  ){
                // router.events.pipe(
                //   filter(event => event instanceof NavigationEnd)
                //   )
                //   .subscribe(event =>{
                //    alert(event);
                //   });             
        }
        
  ngOnInit(): void {
    this.getAllAffiches();
  }

public  getAllAffiches():void {
  this.afficheServices.getAffiches().subscribe(
    (response:Affiche[])=>{
    this.affiches=response;
    },
    (error:HttpErrorResponse)=>{
      this.erreur=true;
      this.router.navigate(['/erreu-500']);

    });
}

}
