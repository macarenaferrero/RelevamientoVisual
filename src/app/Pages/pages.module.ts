import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { IonicModule } from '@ionic/angular';
import { PrincipalComponent } from './principal/principal.component';
import { MenuComponent } from './menu/menu.component';
import { ListadoFotosLindasComponent } from './listado-fotos-lindas/listado-fotos-lindas.component';
import { ListadofotosFeasComponent } from './listadofotos-feas/listadofotos-feas.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { GraficosLindasComponent } from './graficos-lindas/graficos-lindas.component';
import { GraficosFeosComponent } from './graficos-feos/graficos-feos.component';
import { MisFotosComponent } from './mis-fotos/mis-fotos.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    MenuComponent,
    ListadoFotosLindasComponent,
    ListadofotosFeasComponent,
    GraficosLindasComponent,
    GraficosFeosComponent,
    MisFotosComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    IonicModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  exports: [
    PrincipalComponent,
    MenuComponent,
    ListadoFotosLindasComponent,
    ListadofotosFeasComponent
  ]
})
export class PagesModule { }
