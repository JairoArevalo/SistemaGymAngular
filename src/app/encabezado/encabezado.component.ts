import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  usuario: firebase.User 
  emailUsuario: string
  cargando: boolean = true
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((usuarioObservado)=>{
      this.usuario  = usuarioObservado
      this.emailUsuario = this.usuario.email
      setTimeout(() => {
        this.cargando = false
        
        console.log(this.usuario.email)
      }, 1100);
 
    })
    
   }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
