import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Foto } from 'src/app/clases/foto';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-listadofotos-feas',
  templateUrl: './listadofotos-feas.component.html',
  styleUrls: ['./listadofotos-feas.component.scss'],
})
export class ListadofotosFeasComponent  implements OnInit {

  usuario: any;
  fotosFeasAMostrar: any[]=[];
  misFotosASubir: any[]=[];

  constructor(public afAuth: AngularFireAuth, public fotoService: FotosService, public toastr: ToastrService) { }

  async ngOnInit() {
    this.afAuth.currentUser.then(user => {
      this.usuario = user?.email
      console.log(this.usuario);
    })
    this.getFotosFeas();
    this.misFotosASubir = [];
  }

  getFotosFeas() {
    this.fotosFeasAMostrar = [];
    this.fotoService.getListadoFotosFeasProm().then(resp => {
      if (resp.size > 0) {
        resp.forEach((foto: any) => {
          this.fotosFeasAMostrar.push(foto.data());

          console.log(this.fotosFeasAMostrar);
        })
      }
    });
  }

  UpdateFea(id: string, votos: number, usuariosQueVotaron: string) {
    var votosNuevo;
    if(votos == 0 || !this.Contiene(usuariosQueVotaron)){
      votosNuevo = votos + 1;
      var usuariosVotaron = usuariosQueVotaron + '/' + this.usuario;
      this.fotoService.UpdateVotosFotoFea(id, votosNuevo, usuariosVotaron);
    }else{
      if (this.Contiene(usuariosQueVotaron)) {
        votosNuevo = votos - 1;
        var replace = usuariosQueVotaron.replace("/" + this.usuario, "");
        this.fotoService.UpdateVotosFotoFea(id, votosNuevo, replace);
      }
    }

    setTimeout(() => {
    this.getFotosFeas();
    }, 1000);
  }



  Contiene(usuariosQueVotaron: string) {
    if (usuariosQueVotaron.includes(this.usuario)) {
      return true;
    }
    return false;
  }

  addPhotoToGallery() {
    this.fotoService.addNewToGallery("imagesFeas/").then(url =>
      {
        this.misFotosASubir.push(url);
      });
  }
  guardarFotos(){
    this.misFotosASubir.forEach((element:any) =>{
        const fotito = new Foto();
        fotito.fecha = new Date().toLocaleString();
        fotito.votos = 0;
        fotito.usuarioEmail = this.usuario;
        fotito.imagen = element;
        fotito.usuariosQueVotaron = "";
      this.fotoService.guardarFotoFea(fotito);
    });
    this.misFotosASubir = [];
    this.getFotosFeas();
  }

}
