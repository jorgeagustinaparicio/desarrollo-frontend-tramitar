import { Tramite } from "./tramite.model";

export interface OrganismWithTramites {
    id: number;
    name: string;
    description: string;
    image: string;
    tramites: Tramite[];
}