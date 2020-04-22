import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  items: Observable<any[]>;
  clientes: Array<any> = new Array<any>()
  
  constructor(private db: AngularFirestore) {

   }

  ngOnInit(): void {
    // debugger
    this.items = this.db.collection('clientes').valueChanges();
    // console.log(this.items)
    // this.db.collection('clientes').valueChanges().subscribe((recibido)=>{
    //   this.clientes = recibido
    //   console.log(recibido)
    // })
    this.clientes.length = 0
    this.db.collection('clientes').get().subscribe((valoresRecibidos)=>{
      // console.log(valoresRecibidos)
      for (const iterator of valoresRecibidos.docs) {
        // console.log(iterator.id)
        // console.log(iterator.ref)
        // console.log(iterator.data())
        let cliente = iterator.data()
        cliente.id = iterator.id
        cliente.ref = iterator.ref
        this.clientes.push(cliente)
        // console.log(this.clientes)
      }

    })

  }

  


}
