import { DocumentData } from 'angularfire2/firestore';

export class Precios{
    id:string;
    nombre:string;
    costo:number;
    duracion:string;
    vigencia:string;
    ref: DocumentData

    constructor(){
        this.id = this.id
        this.nombre = this.nombre
        this.costo = this.costo
        this.duracion = this.duracion
        this.vigencia = this.vigencia
        this.ref = this.ref
    }
}