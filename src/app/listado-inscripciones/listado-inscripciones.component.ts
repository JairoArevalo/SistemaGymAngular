import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../modelos/inscripcion';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cliente } from '../modelos/cliente';
import { Precios } from '../modelos/precios';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: Array<any> = new Array<any>()
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.obtenerInscripciones()
    
  }


  obtenerInscripciones(){
    this.inscripciones.length = 0
    this.db.collection('inscripciones').get().subscribe((resultados)=>{
        for (const inscritos of resultados.docs) {
          let inscripcionObtenida = inscritos.data()
          inscripcionObtenida.id = inscritos.id
          inscripcionObtenida.ref = inscritos.ref
          inscripcionObtenida.fechaInicio = new Date(inscripcionObtenida.fechaInicio.seconds*1000)
          inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds*1000)

          this.db.doc(inscritos.data().cliente.path).get().subscribe((datosCliente)=>{
              inscripcionObtenida.cliente = new Cliente()
              inscripcionObtenida.cliente = datosCliente.data() as Cliente
              
          })

          this.db.doc(inscritos.data().tipoInscripcionPrecios.path).get().subscribe((datosObt)=>{
                inscripcionObtenida.precioInscripcion = new Precios()
                inscripcionObtenida.precioInscripcion.id = datosObt.id
                inscripcionObtenida.precioInscripcion.ref = datosObt.ref
                inscripcionObtenida.precioInscripcion = datosObt.data() as Precios
              
          })
          
          setTimeout(() => {
            this.inscripciones.push(inscripcionObtenida)
            
          }, 1000);
        }
      })
    }

}
