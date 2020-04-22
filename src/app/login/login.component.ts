import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  valido: boolean = true
  textoError: string
  constructor(public formBuilder:FormBuilder, public afAuth: AngularFireAuth,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      correo:['@',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(8)])]
    })
    
  }


  ingresar(){
    if (this.formularioLogin.valid) {
      this.spinner.show()
      this.afAuth.auth.signInWithEmailAndPassword(this.formularioLogin.value.correo, this.formularioLogin.value.password).then((usuarioLogueado)=>{
        this.spinner.hide()
        console.log(usuarioLogueado)
      }).catch((error)=>{
        this.textoError = error.message
        this.valido = false
        setTimeout(() => {
          this.spinner.hide()
          
        }, 1000);

      })      
    } else {
      this.valido = false
      console.log(this.textoError)
    }
    
    
  }

}
