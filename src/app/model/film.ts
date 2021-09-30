import { Time } from "@angular/common";
import { Categorie } from "./categorie";

export interface Film {
    id?: number;
    titre?:string ;
    description?: string;
    realisateur?: string;
    dateSortie?: Date;
    duree?: Time;
    photo?: string;
    annonce?:string;
    categorie?:Categorie ;
}       