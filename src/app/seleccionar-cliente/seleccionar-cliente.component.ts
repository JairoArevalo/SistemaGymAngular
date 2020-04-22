import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cliente } from '../modelos/cliente';




@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Array<Cliente> = new Array<Cliente>()
  @Input('nombre') nombre:string;
  @Output('seleccionCliente') seleccionCliente = new EventEmitter()
  @Output('canceloCliente') canceloCliente = new EventEmitter()
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('clientes').get().subscribe((resultado)=>{
      this.clientes.length = 0
      resultado.forEach(iterador => {
        let cliente: any = iterador.data()
        cliente.id = iterador.id
        cliente.ref = iterador.ref
        cliente.visible = false
        this.clientes.push(cliente)
      });
    })
    
  }


  buscarClientes(nombre: string){
    this.clientes.forEach(iterador => {
      if (iterador.nombre.toLowerCase().includes(nombre.toLowerCase())) {
          iterador.visible = true
      }else{
        iterador.visible = false
      }
    });
  }


  seleccionarCliente(cliente:Cliente){
      this.nombre = cliente.nombre + ' '+ 'Cc: '+' ' + cliente.cedula
      this.clientes.forEach(cliente => {
        cliente.visible = false
      })

      this.seleccionCliente.emit(cliente)

  }

  cancelarCliente(){
    this.nombre = undefined
    this.canceloCliente.emit()
  }
}
