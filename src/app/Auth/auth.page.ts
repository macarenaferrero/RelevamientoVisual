import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from '../services/code-error-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
})
export class AuthPage {

  loginUsuario:FormGroup;
  constructor(private afAuth:AngularFireAuth,private fb:FormBuilder,
     private toastr: ToastrService, private router: Router,  private codeError:CodeErrorService) {
    this.loginUsuario = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      pass: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  login(){
    const email = this.loginUsuario.value.email;
    const pass = this.loginUsuario.value.pass;
    this.afAuth.signInWithEmailAndPassword(email, pass)
    .then((user) => {
      this.toastr.success("Ingreso satisfactorio", "Sesión iniciada", {timeOut: 1000});
      this.afAuth.currentUser.then(user=>{
        const usuario = user?.email
        console.log(usuario);
      })
      this.router.navigate(['/inicio/principal']);
    }).catch((error) => {
      this.toastr.error(this.codeError.firebaseError(error.code), "Error");
    })
  }


  accesoRapidoAdmin(){
    this.loginUsuario.setValue({
      email: "admin@admin.com",
      pass:"111111"
    });
    this.login();
  }

  accesoRapidoPaciente1(){
    this.loginUsuario.setValue({
      email: "maca@gmail.com",
      pass:"123456"
    });
    this.login();
  }

  accesoRapidoEspecialista1(){
    this.loginUsuario.setValue({
      email: "invitado@invitado.com",
      pass:"222222"
    });
    this.login();
  }

}
