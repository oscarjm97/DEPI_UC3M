import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';

export class User{
  name:string;
  password:string;
  rol:string;
  constructor(name,password,rol){
    this.name=name;
    this.password=password;
    this.rol=rol;
  }

}


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private afs:AngularFirestoreCollection<User[]>;
  constructor(private firestore: AngularFirestore) 
  { 
     var db=this.firestore.collection('users');
  }



}
