import { Tramite } from "./tramite.model";

export interface Organismo {
    id: number;
    nombre: string;
    imagen: string;
    tramites: Tramite[];
}