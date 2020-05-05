import { Injectable } from "@angular/core";
import { User } from "src/app/model/User";
import { Experience } from "src/app/model/Experience";
import { map, filter } from "rxjs/operators";
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

  public getExperienceById(expID: string): Promise<Experience> {
    return this.afs
      .doc(expID)
      .get()
      .toPromise()
      .then((r) => {
        return r.data() as Experience;
      });
  }
}
