import { Injectable } from "@angular/core";
import { Achievement } from "./../../model/Achievement";
import { Observable } from "rxjs";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { User } from "src/app/model/User";

@Injectable({
  providedIn: "root",
})
export class AchievementService {
  achievement: any;
  public afs: AngularFirestoreCollection<Achievement>;

  constructor(private firestore: AngularFirestore) {
    this.afs = this.firestore.collection("achievement");
  }

  //generic methods
  public getAll(): Observable<Achievement[]> {
    return this.afs.valueChanges();
  }

  public getPointByMilestone(user: User, milestoneID: string): number {
    let points = 0;

    if (user.milestones != null) {
      const point = user.milestones.map((miles) => {
        if (miles.id == milestoneID) {
          points += miles.points;
        }
      });
    }

    return points;
  }

  public getUserTotalPoints(user: User) {
    let points = 0;

    if (user.milestones != null) {
      user.milestones.map((miles) => {
        points += miles.points;
      });
    }
    return points;
  }

  public getById(archID: string): Promise<Achievement> {
    return this.afs
      .doc(archID)
      .get()
      .toPromise()
      .then((r) => {
        return r.data() as Achievement;
      });
  }
}
