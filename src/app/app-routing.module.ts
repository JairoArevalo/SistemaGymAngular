import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';


const routes: Routes = [
  {path:'listadoClientes', component: ListadoClientesComponent},
  {path:'agregarClientes/:clienteId', component: AgregarClienteComponent},
  {path:'agregarClientes', component: AgregarClienteComponent},
  {path:'precios', component: PreciosComponent},
  {path: 'inscripcion', component: InscripcionComponent},
  {path: 'listadoInscripciones', component: ListadoInscripcionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
