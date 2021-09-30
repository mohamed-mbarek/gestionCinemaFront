import { Film } from "./film";
import { Salle } from "./salle";
import { Seance } from "./seance";

export interface ProjectionFilm {
    id?: number;
    dateProjection?:Date ;
    prix?: number;
    salle?: Salle;
    film?: Film;
    seance?: Seance;
}       