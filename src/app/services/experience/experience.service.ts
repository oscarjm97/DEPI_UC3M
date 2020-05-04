import { Injectable } from "@angular/core";
import { User } from "src/app/model/User";
import { Experience } from "src/app/model/Experience";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ExperienceService {
  public afs: AngularFirestoreCollection<Experience>;

  constructor(private firestore: AngularFirestore) {
    this.afs = this.firestore.collection("experiences");
  }

  public getExperiencesByUser(user: User) {
    return this.firestore
      .collection<Experience>("experiences", (ref) =>
        ref.where("userID", "==", user.userID)
      )
      .valueChanges();
  }
}
