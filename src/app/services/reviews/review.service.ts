import { Injectable } from "@angular/core";
import { Review } from "./../../model/Review";
import { User } from "src/app/model/User";
import { AchievementService } from "./../achievement/achievement.service";
import { Achievement } from "./../../model/Achievement";
import { AuthService } from "./../../shared/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Experience } from "src/app/model/Experience";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  user: User;
  achievement: Achievement;
  public afs: AngularFirestoreCollection<Review>;

  constructor(
    private firestore: AngularFirestore,
    private achievementService: AchievementService,
    private authService: AuthService
  ) {
    this.afs = this.firestore.collection("reviews");
    this.user = new User();
  }

  public getAll(): Observable<Review[]> {
    return this.afs.valueChanges();
  }

  public async createReview(
    review: Review,
    experienceID: string
  ): Promise<string> {
    this.user = JSON.parse(localStorage.getItem("user"));
    review.userID = this.user.userID;
    review.experienceID = experienceID;

    await this.assignMilestone(this.user);

    return new Promise<any>((resolve, reject) => {
      this.afs.add(review).then(
        (res) => {
          console.log(res.id);
        },
        (err) => reject(err)
      );
    });
  }

  public async assignMilestone(user: User) {
    this.achievement = await this.achievementService.getById("5");
    this.achievement.id = "5";
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

  /* public getTotalReviewsInExperience(experienceID: string) { } */
}
