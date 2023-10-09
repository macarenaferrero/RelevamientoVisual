import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.component.html',
  styleUrls: ['./mis-fotos.component.scss'],
})
export class MisFotosComponent  implements OnInit {
  public fotosLindas:any;
  public fotosFeas:any;
  public misFotosLindas:any=new Array<any>();
  public misFotosFeas:any=new Array<any>();
  usuario: any;

  constructor(public fotoService: FotosService, public afAuth: AngularFireAuth, public firestore:AngularFirestore)
  { }

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      this.usuario = user?.email
      console.log(this.usuario);
    })

    this.getFotoslindas();
    this.getFotosFeas();
  }

  getFotosFeas() {
    this.misFotosFeas = [];
    this.fotoService.getListadoFotosFeasProm().then(resp => {
      if (resp.size > 0) {
        resp.forEach((foto: any) => {
          if(foto.data().usuarioEmail == this.usuario){
          this.misFotosFeas.push(foto.data());
          console.log(this.misFotosFeas);
          }
        })
      }
    });
  }

  getFotoslindas() {
    this.misFotosLindas = [];
    this.fotoService.getListadoFotosLindasProm().then(resp => {
      if (resp.size > 0) {
        resp.forEach((foto: any) => {
          if(foto.data().usuarioEmail == this.usuario){
          this.misFotosLindas.push(foto.data());
          console.log(this.misFotosLindas);
          }
        })
      }
    });
  }

}
