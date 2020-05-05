import { Injectable } from "@angular/core";
import { User } from "src/app/model/User";
import { Experience } from "src/app/model/Experience";
import { map, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ExperienceService {
  defaultPhoto: string =
    "https://pngimage.net/wp-content/uploads/2018/06/paisaje-png-2.png";
  public afs: AngularFirestoreCollection<Experience>;

  constructor(private firestore: AngularFirestore) {
    this.afs = this.firestore.collection("experiences");
  }

  getAll() {
    return this.afs.snapshotChanges();
  }

  public getExperiencesByUser(user: User): Observable<Experience[]> {
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

  public async createExperience(exp: Experience, user: User) {
    exp.userID = user.userID;
    if (exp.photo == null || exp.photo == "") {
      exp.photo = this.defaultPhoto;
    }
    return this.afs.add(exp);
  }
}
