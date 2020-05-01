import { Injectable } from "@angular/core";
import { Achievement } from "./../../model/Achievement";
import { Observable } from "rxjs";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AchievementService {
  achievement: any;
  private afs: AngularFirestoreCollection<Achievement>;

  constructor(private firestore: AngularFirestore) {
    this.afs = this.firestore.collection("achievement");
  }

  //generic methods
  public getAll(): Observable<Achievement[]> {
    return this.afs.valueChanges();
  }

  public getTotalPoints() {
    const total = 0;
  }
}
