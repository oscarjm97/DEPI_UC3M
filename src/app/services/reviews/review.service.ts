import { Injectable } from "@angular/core";
import { Review } from "./../../model/Review";
import { User } from "src/app/model/User";
import { AchievementService } from "./../achievement/achievement.service";
import { Achievement } from "./../../model/Achievement";
import { AuthService } from "./../../shared/auth.service";
import { Observable } from "rxjs";
import { map, reduce } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Experience } from "src/app/model/Experience";
import { ExperienceService } from "./../experience/experience.service";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  user: User;
  achievement: Achievement;
  tempUser: User;
  public afs: AngularFirestoreCollection<Review>;

  constructor(
    private firestore: AngularFirestore,
    private achievementService: AchievementService,
    private experienceservice: ExperienceService,
    private authService: AuthService
  ) {
    this.afs = this.firestore.collection("reviews");
    this.user = new User();
  }

  public getAll(): Observable<Review[]> {
    return this.afs.valueChanges();
  }

  public async createReview(review: Review, experienceID: string) {
    this.user = JSON.parse(localStorage.getItem("user"));
    review.userID = this.user.userID;
    review.experienceID = experienceID;

    if (this.authService.checkMilestone(this.user, "5") == false) {
      await this.assignMilestone(this.user, "5");
    }

    this.updateUserAdventur(review.experienceID);

    return this.afs.add(review);
  }

  public async updateUserAdventur(expID: string) {
    const exp = await this.experienceservice.getExperienceById(expID);
    this.tempUser = await this.authService.getUserById(exp.userID);

    if (this.authService.checkMilestone(this.tempUser, "3") == false) {
      await this.assignMilestone(this.tempUser, "3");
    }
  }

  public async assignMilestone(user: User, code: string) {
    this.achievement = await this.achievementService.getById(code);
    this.achievement.id = code;
    user.milestones.push(this.achievement);
    await this.authService.updateUserById(user);
  }

  public getById(reviewID: string): Promise<Review> {
    return this.afs
      .doc(reviewID)
      .get()
      .toPromise()
      .then((r) => {
        return r.data() as Review;
      });
  }

  public getReviewsByUser(user: User) {
    return this.firestore
      .collection<Review>("reviews", (ref) =>
        ref.where("userID", "==", user.userID)
      )
      .valueChanges();
  }

  public getReviewsByExperience(exp: Experience) {
    return this.firestore
      .collection<Review>("reviews", (ref) =>
        ref.where("experienceID", "==", exp.id)
      )
      .valueChanges();
  }
}
