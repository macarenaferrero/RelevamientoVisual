import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent  implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {}

  aListadoFotosLindas(){
    this.router.navigate(['inicio/listadoFotosLindas']);
  }

  aListadoFotosFeas(){
    this.router.navigate(['inicio/listadoFotosFeas']);
  }
}
