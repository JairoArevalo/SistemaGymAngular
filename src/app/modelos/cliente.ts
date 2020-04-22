import { DocumentReference } from 'angularfire2/firestore';
import { core } from '@angular/compiler';

export class Cliente{
    id:string;
    nombre:string
    correo:string;
    imgUrl:string;
    telefono:string;
    cedula:string
    direccion:string;
    fechaNacimiento: Date = new Date();
    ref: DocumentReference
    visible:boolean


    constructor(){
        this.id = this.id
        this.nombre = this.nombre
        this.correo = this.correo
        this.imgUrl = this.imgUrl
        this.telefono = this.telefono
        this.cedula = this.cedula
        this.direccion = this.direccion
        this.fechaNacimiento = this.fechaNacimiento
        this.ref = this.ref
        
    }
}