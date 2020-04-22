import { DocumentReference } from 'angularfire2/firestore'

export class Inscripcion {
    fechaInicio: Date;
    fechaFinal: Date;
    cliente: DocumentReference;
    tipoInscripcionPrecios: DocumentReference;
    subTotal: number
    iva: number
    valorTotal:number

    constructor() {
        this.fechaInicio = null;
        this.fechaFinal = null;
        this.cliente = this.cliente
        this.tipoInscripcionPrecios = this.tipoInscripcionPrecios
        this.valorTotal = null
        this.subTotal = null
        this.iva =  null
    }


    validar():any{
        let respuesta ={
            esValido:false,
            mensaje: ' '
        }

        if (this.fechaInicio == null || this.fechaInicio == undefined) {
            respuesta.esValido = false,
            respuesta.mensaje = 'No se ha seleccionado un plan valido para realizar la inscripción'
            return respuesta
        }

        if (this.cliente == null || this.cliente == undefined) {
            respuesta.esValido = null, 
            respuesta.mensaje = 'No se ha seleccionado ningun cliente para realizar la inscripción'
            return respuesta
        }

        respuesta.esValido = true
        respuesta.mensaje ="Correcto"
        return respuesta
    }
}