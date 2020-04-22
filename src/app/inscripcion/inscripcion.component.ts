import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../modelos/inscripcion';
import { Cliente } from '../modelos/cliente';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Precios } from '../modelos/precios';
import { MensajesService } from '../servicios/mensajes.service';



@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion:Inscripcion = new Inscripcion()
  clienteSeleccionado:Cliente = new Cliente()
  precios: Array<Precios> = new Array<Precios>()
  precioSeleccionado: Precios = new Precios()
  calculoDiasFinal: Date
  constructor(private db: AngularFirestore, private mensajes: MensajesService) { }

  ngOnInit(): void {
    this.preciosDb()
    
  }

  preciosDb(){
    this.db.collection('precios').get().subscribe((recibido)=>{
      for (const iterator of recibido.docs) {
        let precioRecibido = iterator.data() as Precios
        precioRecibido.id = iterator.id
        precioRecibido.ref = iterator.ref
        this.precios.push(precioRecibido)

      }
    })
  }

  asignarCliente(cliente:Cliente){
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente
  }


  eliminarCliente(evento){
    this.clienteSeleccionado = new Cliente()
    this.inscripcion.cliente = undefined
  }



  guardar(){
    if (this.inscripcion.validar().esValido) {
      let inscripcionAgregar ={
        fechaInicio: this.inscripcion.fechaInicio,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        tipoInscripcionPrecios: this.inscripcion.tipoInscripcionPrecios,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        valorTotal: this.inscripcion.valorTotal
      }

      this.db.collection('inscripciones').add(inscripcionAgregar).then((resultado)=>{
        console.log("Agregando..")
        this.mensajes.mensajeOk("Agregando Inscripcion")
        this.clienteSeleccionado = new Cliente()
        this.vaciarContenido()

      })
    }else{
      console.log(this.inscripcion.validar().mensaje)
      let mensajeAdvertenciaInsrcipcion = this.inscripcion.validar().mensaje
      this.mensajes.mensajeAdvertencia(mensajeAdvertenciaInsrcipcion,'Momento')
    }
  }

  seleccionarPrecio(id:string){

    if (id != "null") {
      
      this.precioSeleccionado = this.precios.find(x => x.id == id )
      this.inscripcion.tipoInscripcionPrecios = this.precioSeleccionado.ref as DocumentReference
      this.inscripcion.fechaInicio = new Date()
      this.fechaFinal()
    } else{
      this.vaciarContenido()
    }
      
  }


  fechaFinal(){
    this.calculoDiasFinal = new Date(this.inscripcion.fechaInicio)
      if (this.precioSeleccionado.vigencia  == "1"){
        this.inscripcion.fechaFinal =  new Date(this.calculoDiasFinal.setDate(this.inscripcion.fechaInicio.getDate() + 1) ) 
      }

      if (this.precioSeleccionado.vigencia == '365') {
        this.inscripcion.fechaFinal =  new Date(this.calculoDiasFinal.setDate(this.inscripcion.fechaInicio.getDate() + 365) ) 
      }

      if (this.precioSeleccionado.vigencia == '125') {
        this.inscripcion.fechaFinal =  new Date(this.calculoDiasFinal.setDate(this.inscripcion.fechaInicio.getDate() + 125) ) 
      
      }

      if (this.precioSeleccionado.vigencia == '35') {
        this.inscripcion.fechaFinal =  new Date(this.calculoDiasFinal.setDate(this.inscripcion.fechaInicio.getDate() + 35) ) 
      }
      if (this.precioSeleccionado.vigencia == '180') {
        this.inscripcion.fechaFinal =  new Date(this.calculoDiasFinal.setDate(this.inscripcion.fechaInicio.getDate() + 190) ) 
      }
      
      if (this.precioSeleccionado.vigencia == '20') {
        this.inscripcion.fechaFinal =  new Date(this.calculoDiasFinal.setDate(this.inscripcion.fechaInicio.getDate() + 20) ) 
      }

      this.inscripcion.valorTotal = this.precioSeleccionado.costo
      this.inscripcion.subTotal = this.inscripcion.valorTotal-(this.inscripcion.valorTotal*0.19)
      this.inscripcion.iva = this.inscripcion.valorTotal*0.19
  }

  vaciarContenido(){
    this.precioSeleccionado = new Precios()
      this.inscripcion.tipoInscripcionPrecios = this.precioSeleccionado.ref as DocumentReference
      this.inscripcion.subTotal = this.precioSeleccionado.costo
      this.inscripcion.iva = this.precioSeleccionado.costo
      this.inscripcion.valorTotal = this.precioSeleccionado.costo
      this.inscripcion.fechaInicio = null
      this.inscripcion.fechaFinal = null
  }


}
