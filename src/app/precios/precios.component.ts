import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MensajesService } from '../servicios/mensajes.service';
import { Precios } from '../modelos/precios';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio:FormGroup
  precios:Array<Precios> = new Array<Precios>()
  esEditar:boolean = false
  idEditar:string

  constructor(public fb: FormBuilder, private db: AngularFirestore, private mensajes: MensajesService) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre:['',Validators.required],
      costo:['',Validators.required],
      duracion:['', Validators.required],
      vigencia:['',Validators.required]
    })
    ///////////tomar valores de la db 
    this.mostrarPrecios()

  }

  ///////////////////
  mostrarPrecios(){
    this.db.collection('precios').get().subscribe((valores)=>{
      this.precios.length = 0
      for (const iterator of valores.docs) {
        let plan = iterator.data() as Precios
        plan.id = iterator.id
        plan.ref = iterator.ref

        this.precios.push(plan)
      }
    
  })
  }

  agregar(){
    console.log(this.formularioPrecio.value)
    this.db.collection('precios').add(this.formularioPrecio.value).then((agregado)=>{
      this.mensajes.mensajeOk("Se Agrego Correctamente")
      this.formularioPrecio.reset()
      this.ngOnInit()
    }).catch((error)=>{
      this.mensajes.mensajeError("A ocurrido un error intente mas tarde")
    })
  }

  editarValores(precio:Precios){
    this.esEditar = true
    this.idEditar = precio.id
    this.formularioPrecio.setValue({
      nombre:precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      vigencia:precio.vigencia
      
    })
  }

  editarPlan(){
    this.db.doc('precios/'+this.idEditar).update(this.formularioPrecio.value).then((editado)=>{
      this.mensajes.mensajeOk("Se edito el plan correctamente")
      this.formularioPrecio.reset()
      this.esEditar = false
      this.ngOnInit()
    }).catch((error)=>{
      this.mensajes.mensajeError("Algo salio mal, por favor intenta mas tarde")
    })
  }
}
