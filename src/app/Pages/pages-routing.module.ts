import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ListadoFotosLindasComponent } from './listado-fotos-lindas/listado-fotos-lindas.component';
import { ListadofotosFeasComponent } from './listadofotos-feas/listadofotos-feas.component';
import { GraficosLindasComponent } from './graficos-lindas/graficos-lindas.component';
import { GraficosFeosComponent } from './graficos-feos/graficos-feos.component';
import { MisFotosComponent } from './mis-fotos/mis-fotos.component';

const rutas: Routes = [
  {path: 'principal', component:PrincipalComponent},
  {path: 'listadoFotosLindas', component:ListadoFotosLindasComponent},
  {path: 'listadoFotosFeas', component:ListadofotosFeasComponent},
  {path: 'graficosLindas', component:GraficosLindasComponent},
  {path: 'graficosFeas', component:GraficosFeosComponent},
  {path: 'misFotos', component:MisFotosComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
