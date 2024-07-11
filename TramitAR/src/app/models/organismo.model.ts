import { Tramite } from "./tramite.model";

export interface Organismo {
    id: number;
    name: string;
    image_Url: string;
    tramites: Tramite[];
}


