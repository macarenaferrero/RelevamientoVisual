import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {


  constructor(public router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {}

  misFotos()
  {
    this.router.navigate(['inicio/misFotos']);
  }

  cosasLindas(){
    this.router.navigate(['inicio/listadoFotosLindas']);
  }

  cosasFeas(){
    this.router.navigate(['inicio/listadoFotosFeas']);
  }
  graficoLindas()
  {
    this.router.navigate(['inicio/graficosLindas']);
  }
  graficoFeas()
  {
    this.router.navigate(['inicio/graficosFeas']);
  }

  logOut(){
    this.afAuth.signOut().then(() => this.router.navigate([""]));
  }
}
