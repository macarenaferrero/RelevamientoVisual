import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error-enum';

@Injectable({
  providedIn: 'root'
})
export class CodeErrorService {

  constructor() { }

  firebaseError(code: string){
    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return "El usuario ya existe.";
      case FirebaseCodeErrorEnum.WeakPassport:
        return "La contraseña debe tener mínimo 6 carácteres.";
      case FirebaseCodeErrorEnum.InvalidEmail:
        return "Email inválido.";
      case FirebaseCodeErrorEnum.WrongPassword:
        return "Contraseña incorrecta.";
      case FirebaseCodeErrorEnum.UserNotFound:
        return "El usuario no existe.";
      default:
        return "Error desconocido.";

    }
  }
}

