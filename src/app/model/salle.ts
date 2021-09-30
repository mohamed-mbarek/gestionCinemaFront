import { Cinema } from "./cinema";

export interface Salle{
    id?:number,
    nom?:string,
    nombrePlace?:number;
    cinema?:Cinema;
}