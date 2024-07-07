import { Tramite } from "./tramite.model";


export interface Organismo {
    id: number;
    name: string;
    description: string;
    image: string;
    tramites: Tramite[];
}