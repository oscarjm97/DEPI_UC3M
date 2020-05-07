import { Injectable } from "@angular/core";
import { User } from "src/app/model/User";
import { Experience } from "src/app/model/Experience";
import { map, filter } from "rxjs/operators";
import { Observable } from "rxjs";
import { AchievementService } from "./../achievement/achievement.service";
import { Achievement } from "./../../model/Achievement";
import { AuthService } from "./../../shared/auth.service";
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
  achievement: Achievement;

  constructor(
    private firestore: AngularFirestore,
    private achievementService: AchievementService,
    private authService: AuthService,
  ) {
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
    const id = this.firestore.createId();
    exp.userID = user.userID;
    exp.userphoto = user.photo;
    exp.rate = 0;
    exp.id = id;
    exp.reviews = [];

    if (exp.photo == null || exp.photo == "") {
      exp.photo = this.defaultPhoto;
    }

    if (this.authService.checkMilestone(user, "1") == false) {
      await this.assignMilestone(user);
    }

    return this.afs
      .doc(exp.id)
      .set({ ...exp })
      .then((r) => {
        return exp.id;
      });
  }

  public async assignMilestone(user: User) {
    this.achievement = await this.achievementService.getById("1");
    this.achievement.id = "1";
    user.milestones.push(this.achievement);
    await this.authService.updateUserById(user);
  }
}
