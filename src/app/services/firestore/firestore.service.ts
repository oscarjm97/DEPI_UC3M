import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { User, IUser } from "../../model/User";
import { Experience } from "src/app/model/Experience";
import { Achievement } from "./../../model/Achievement";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private userCollection: AngularFirestoreCollection<User>;
  private experienceCollection: AngularFirestoreCollection<Experience>;
  private achievementCollection: AngularFirestoreCollection<Achievement>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection("users");
    this.experienceCollection = this.firestore.collection("experiences");
    this.achievementCollection = this.firestore.collection("achievement");
  }

  getExperiences(): Observable<Experience[]> {
    return this.experienceCollection.valueChanges();
  }

  getAchievements(): Observable<Achievement[]> {
    return this.achievementCollection.valueChanges();
  }
}
