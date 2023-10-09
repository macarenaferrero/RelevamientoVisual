import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ref } from '@firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Foto } from 'src/app/clases/foto';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-listado-fotos-lindas',
  templateUrl: './listado-fotos-lindas.component.html',
  styleUrls: ['./listado-fotos-lindas.component.scss'],
})
export class ListadoFotosLindasComponent implements OnInit {

  usuario: any;
  fotosLindasAMostrar: any;
  fotosLindas: any;
  misFotosASubir: any;

  constructor(public afAuth: AngularFireAuth, public fotoService: FotosService, public toastr: ToastrService) { }

  async ngOnInit() {
    this.afAuth.currentUser.then(user => {
      this.usuario = user?.email
      console.log(this.usuario);
    })
    this.getFotoslindas();
    console.log("a mostrar"+this.fotosLindasAMostrar);
    this.misFotosASubir = [];
  }

  getFotoslindas() {
    this.fotosLindasAMostrar = [];
    this.fotoService.getListadoFotosLindasProm().then(resp => {
      if (resp.size > 0) {
        resp.forEach((foto: any) => {
          this.fotosLindasAMostrar.push(foto.data());
          console.log(this.fotosLindasAMostrar);
        })
      }
    });
  }

  UpdateLinda(id: string, votos: number, usuariosQueVotaron: string) {
    debugger;
    var votosNuevo;
    if(votos == 0 || !this.Contiene(usuariosQueVotaron)){
      votosNuevo = votos + 1;
      var usuariosVotaron = usuariosQueVotaron + '/' + this.usuario;
      this.fotoService.UpdateVotosFotoLinda(id, votosNuevo, usuariosVotaron);
    }else{
        votosNuevo = votos - 1;
        var replace = usuariosQueVotaron.replace("/" + this.usuario, "");
        this.fotoService.UpdateVotosFotoLinda(id, votosNuevo, replace);
    }
    this.getFotoslindas();
  }

  Contiene(usuariosQueVotaron: string) {
    if (usuariosQueVotaron.includes(this.usuario)) {
      return true;
    }
    return false;
  }

  addPhotoToGallery() {
    this.fotoService.addNewToGallery("images/").then(url =>
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
      this.fotoService.guardarFotoLinda(fotito);
    });
    this.misFotosASubir = [];
    this.getFotoslindas();
  }






}


