import { Procedure } from "./tramite.model";

export interface OrganismWithTramites {
    id: number;
    name: string;
    description: string;
    image: string;
    tramites: Procedure[];
}