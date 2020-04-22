import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoFinal';
  usuario: firebase.User
  cargando: boolean = true

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((usuarioObservado)=>{
      setTimeout(() => {
        this.cargando = false
        this.usuario  = usuarioObservado
        
      }, 1100);
 
    })
  }
 
 
}
