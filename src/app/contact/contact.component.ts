import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reclamation } from '../model/reclamation';
import { ReclamationService } from '../service/reclamation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
send:number
aletSuccess: boolean;
aletEroor: boolean;
message: string;

  constructor(private reclamationService:ReclamationService ) { }

  ngOnInit(): void {
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);
  }
  
  public onSendReclamation(addForm:NgForm):void{
    console.log(addForm.value);
     this.reclamationService.addReclamation(addForm.value).subscribe(
      (responce:Reclamation)=>{
        console.log(responce);
        addForm.reset();
        this.send=1;
      },
      (error:HttpErrorResponse)=>{
        this.send=0;
        addForm.reset();
      },
  
    );
  }
}
