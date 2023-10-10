import { Injectable } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CollectionReference, DocumentData, Firestore, collection, query, doc, getDocs, orderBy, setDoc, updateDoc } from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Foto } from '../clases/foto';
import { Storage, ref, uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage'
import { promises } from 'dns';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  public photos: UserPhoto[] = [];

  allFotosFeas: CollectionReference<DocumentData> = collection(this.firestore, 'fotosFeas');
  allFotosLindas: CollectionReference<DocumentData> = collection(this.firestore, 'fotosLindas');
  fotosLindas!: Observable<any[]>;
  fotosFeas!: Observable<any[]>;
  // basePath = '/images';
  downloadableURL = '';
  task!: AngularFireUploadTask;
  progressValue!: Observable<any>;
  returnFotos: string[] = [];

  constructor(public firestore:Firestore, private storage: Storage)
  {
    console.log("en servicio ");
    this.fotosLindas = collectionData(this.allFotosLindas);
    this.fotosFeas = collectionData(this.allFotosFeas);
  }


  getListadoFotosLindasProm(){
    const fotosLindas = collection(this.firestore, 'fotosLindas');
    const order = query(fotosLindas, orderBy('fecha', 'desc'));
    return getDocs(order);
  }

    getListadoFotosFeasProm(){
      const fotosFeas = collection(this.firestore, 'fotosFeas');
      const order = query(fotosFeas, orderBy('fecha', 'desc'));
    return getDocs(order);
      }


   guardarFotoFea(fotoDato:Foto) :Promise<void>{
    return new Promise((resolve, reject) => {
      const fotosFeas = doc(this.allFotosFeas);
      setDoc(fotosFeas, {
        id: fotosFeas.id,
      ...fotoDato // Spread operator para agregar las propiedadesrepartidor al objeto
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }

  guardarFotoLinda(fotoDato:Foto) :Promise<void>{
    return new Promise((resolve, reject) => {
      const fotosLindas = doc(this.allFotosLindas);
      setDoc(fotosLindas, {
        id: fotosLindas.id,
      ...fotoDato // Spread operator para agregar las propiedadesrepartidor al objeto
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }


  public async addNewToGallery(carpeta:string):Promise<any>{
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 50
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath|| ""
    });


    var number = new Date().toLocaleString().replace(/[\s/:,]/g, '');
    const filePath = `${carpeta}${number}`;

    const file: any = this.base64ToImage(capturedPhoto.dataUrl);
    const imgRef = ref(this.storage, filePath);

    try {
      debugger;
      await uploadBytes(imgRef, file);
      const updatedImages = await this.getImages(carpeta);
      return updatedImages;
    } catch (error) {
      console.error(error);
      return []; // Devolver un array vacío en caso de error
    }

  }

  public async getImages(carpeta:string): Promise<string[]>{
    this.returnFotos = [];
    const imgRef = ref(this.storage, carpeta);
    let dateURL; // Declarar las variables fuera de los bloques if
    let dateURLToday;
    try {
      debugger;
      const res = await listAll(imgRef);
      for (let i = res.items.length - 1; i >= 0; i--) {
        const url = res.items[i];
        const urlAsString = await getDownloadURL(url);
        const urlDateTimeString = urlAsString.match(/\d{14}/)??"";
        const currentDateTime = new Date().toLocaleString().replace(/[\s/:,]/g, '');


          const matchedString = urlDateTimeString[0];
          const day = parseInt(matchedString.substring(0, 2), 10); // Extraer el primer carácter
          const month = parseInt(matchedString.substring(2, 4), 10) - 1; // Los meses en JavaScript son de 0 a 11
          const year = parseInt(matchedString.substring(4, 8), 10);
          const hours = parseInt(matchedString.substring(8, 10), 10);
          const minutes = parseInt(matchedString.substring(10, 12), 10);
          const seconds = parseInt(matchedString.substring(12, 14), 10);
          dateURL = new Date(year, month, day, hours, minutes, seconds);


          const dayToday = parseInt(currentDateTime.substring(0, 2), 10); // Extraer el primer carácter
          const monthToday = parseInt(currentDateTime.substring(2, 4), 10) - 1; // Los meses en JavaScript son de 0 a 11
          const yearToday = parseInt(currentDateTime.substring(4, 8), 10);
          const hoursToday = parseInt(currentDateTime.substring(8, 10), 10);
          const minutesToday = parseInt(currentDateTime.substring(10, 12), 10);
          const secondsToday = parseInt(currentDateTime.substring(12, 14), 10);
          dateURLToday = new Date(yearToday, monthToday, dayToday, hoursToday, minutesToday, secondsToday);


          const minutesDifference = Math.abs((dateURLToday.getTime() - dateURL.getTime()) / (1000 * 60));
          debugger;
        console.log("minutos " + minutesDifference);
        if(minutesDifference <= 2){
          this.returnFotos.push(urlAsString);
        }

    }
      return this.returnFotos;

    } catch (error) {
      console.error(error);
      return []; // Devolver un array vacío en caso de error
    }
  }


  base64ToImage(dataURI:any) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  getRandomArbitrary(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }


  UpdateVotosFotoFea(id:string, votos:number,usuariosQueVotaron:string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("updteFotosFeas" + id + votos + usuariosQueVotaron);
      const foto = doc(this.allFotosFeas, id);
      updateDoc(foto, {
        votos : votos,
        usuariosQueVotaron: usuariosQueVotaron
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }

  UpdateVotosFotoLinda(id:string, votos:number,usuariosQueVotaron:string): Promise<void> {
    return new Promise((resolve, reject) => {
      const foto = doc(this.allFotosLindas, id);
      updateDoc(foto, {
        votos : votos,
        usuariosQueVotaron: usuariosQueVotaron
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }

}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
