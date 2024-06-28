// organism.model.ts
export class Organism {
    id: number;
    name: string;
    description: string;
    image: string;

    constructor(id: number, name: string, description: string, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }
}


//esta
// export interface Organismo {
//     id: number;
//     nombre: string;
//     imagen: string;
// }