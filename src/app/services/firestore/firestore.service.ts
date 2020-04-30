import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { User, IUser } from "../../model/User";
import { Experience } from "src/app/model/Experience";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private userCollection: AngularFirestoreCollection<User>;
  private experienceCollection: AngularFirestoreCollection<Experience>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection("users");
    this.experienceCollection = this.firestore.collection("experiences");
  }

  getExperiences(): Observable<Experience[]> {
    return this.experienceCollection.valueChanges();
  }
}
