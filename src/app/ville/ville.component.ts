import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ville } from '../model/ville';
import { VilleService } from '../service/ville.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  public villes: Ville[];
  public editVille: Ville;
  public deleteVilleid: Ville;
  public aletSuccess: boolean;
  public aletEroor: boolean;
  public message: string;
  // public ville:Ville;
  constructor(private villeService: VilleService) { }

  ngOnInit(): void {
    this.getAllVilles();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletSuccess = false;
    }, 10000);
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.aletEroor = false;
    }, 10000);
  }

  public getAllVilles(): void {
    this.villeService.getVilles().subscribe(
      (response: Ville[]) => {
        this.villes = response;
      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' de récupérer les données ';

      });

  }


  public onAddVille(addForm: NgForm): void {

    document.getElementById('add-ville-form').click();
    this.villeService.addVille(addForm.value).subscribe(
      (responce: Ville) => {
        console.log(responce);
        this.getAllVilles();
        addForm.reset();
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = ' Ville ajouter avec succès';

      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' aucune ville ajouter réessayer une autre fois';
        addForm.reset();
      },

    );

  }


  public onUpdateVille(ville: Ville): void {
    document.getElementById('fermer-ville').click();
    this.villeService.UpdateVille(ville).subscribe(
      (responce: Ville) => {
        console.log(responce);
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = 'Ville modifié avec succès ';

      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' Aucune modification effectuée ';
      },

    );
  }
  public onDeleteVille(idVille: number) {
    document.getElementById('add-ville-form').click();
    this.villeService.deleteVille(idVille).subscribe(
      (responce: void) => {
        console.log(responce);
        this.getAllVilles;
        this.ngOnInit();
        this.aletSuccess = true;
        this.message = 'Ville supprimer avec succès ';

      },
      (error: HttpErrorResponse) => {
        this.aletEroor = true;
        this.message = ' Aucune suppression effectuée ';

      },

    );
  }

  public searchDepartement(key: string): void {
    const resultat: Ville[] = [];
    for (const v of this.villes) {
      if (v.nom.toLocaleLowerCase().indexOf(key.toLowerCase()) !== -1)
        resultat.push(v);
    }
    this.villes = resultat;
  }



  public onOpenModal(ville: Ville, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addVilleModel');

    }
    if (mode === 'edit') {
      this.editVille = ville;
      button.setAttribute('data-target', '#updateVilleModal');
    }
    if (mode === 'delete') {
      this.deleteVilleid = ville;
      button.setAttribute('data-target', '#deleteVilleModal');
    }
    container.appendChild(button);
    button.click();
  }

}
