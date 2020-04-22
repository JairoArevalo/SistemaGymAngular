import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeError(texto:string){
    Swal.fire({
      icon: 'error',
      title: 'Ops ! ha ocurrido algo !!',
      text: texto,
      
    })
  }

  mensajeOk(texto:string){
    Swal.fire({
      icon: 'success',
      title: 'Hecho !!',
      text: texto,
      
    })
  }

  mensajeAdvertencia(text:string, title:string){
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      
    })
  }
}
