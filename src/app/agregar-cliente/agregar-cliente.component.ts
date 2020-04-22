import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../servicios/mensajes.service';




@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup
  porcentajeSubida:number = 0
  urlImagenFormulario:string
  esEditable:boolean = false
  id:string
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore, private activeRoute: ActivatedRoute, private mensajes: MensajesService) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group(
      { nombre:['', Validators.required],
        cedula:['', Validators.required],
        telefono:['+57', Validators.required ],
        correo:['@gmail.com', Validators.compose([Validators.required, Validators.email])],
        direccion:['',Validators.required],
        fechaNacimiento:['',Validators.required],
        imgUrl:['', Validators.required]
    
      })
      //Editar informacion de un cliente; esta informacion llega con un parametro{{id.cliente}}
      //se colocan los valores a editar dentro del formulario
      

      this.id = this.activeRoute.snapshot.params.clienteId
      if (this.id != undefined) {
        this.esEditable = true
        this.db.doc<any>('clientes'+'/'+this.id).valueChanges().subscribe((cliente)=>{
          
          let fechaSet = new Date(cliente.fechaNacimiento.seconds*1000).toISOString().substr(0,10)
          console.log(fechaSet)
      
          this.formularioCliente.setValue(
            {nombre: cliente.nombre, cedula: cliente.cedula, telefono: cliente.telefono, correo: cliente.correo, direccion: cliente.direccion, fechaNacimiento: fechaSet , imgUrl: ''}
          )
            this.urlImagenFormulario = cliente.imgUrl
        })
      }


  }

  //////////////////
  agregar(){
    // console.log(this.formularioCliente)
    this.formularioCliente.value.imgUrl = this.urlImagenFormulario.toString()
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.db.collection('clientes').add(this.formularioCliente.value).then((resultado)=>{
      console.log("registro creado",resultado)
    }).catch((error)=>{
      this.mensajes.mensajeError("El usuario no pudo ser agregado, intenta mas tarde")
    })
    this.formularioCliente.reset()
    this.mensajes.mensajeOk('Registro Creado')
  }

  //////////////////
  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagenFormulario
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.db.doc('clientes/'+this.id).update(this.formularioCliente.value).then((editado)=>{
      this.formularioCliente.reset()
      
    }).catch((error)=>{
      this.mensajes.mensajeError("El usuario no pudo ser editado, intente mas tarde")
    })
    this.mensajes.mensajeOk("usuario editado correctamente")
  }
  

  ////////////////////////
  subirImagen(evento:any){
    let nombre = new Date().getTime().toString()
    let archivo = evento.target.files[0];
    let extencionArchivo=(archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.')))
    let ruta = 'clientes/'+nombre+extencionArchivo;
    const ref = this.storage.ref(ruta);
    const tarea = ref.put(archivo)
    tarea.then((terminado)=>{
      console.log(terminado)
      ref.getDownloadURL().subscribe((urlImagen)=>{
        this.urlImagenFormulario = urlImagen
        // console.log(this.urlImagenFormulario)
        // console.log(urlImagen)
      })
    })
    tarea.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeSubida = parseInt(porcentaje.toLocaleString())
        
    
    })
  }
  
  ////////////////////////


}
