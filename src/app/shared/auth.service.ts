import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { User, IUser } from "../model/User";
import { Observable } from "rxjs";
import { Achievement } from "./../model/Achievement";
import { AchievementService } from "./../services/achievement/achievement.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  defaultPhoto: string =
    "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png";
  user: any;
  private afs: AngularFirestoreCollection<User>;

  constructor(
    private authFire: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore,
    private achievementService: AchievementService
  ) {
    this.afs = this.firestore.collection("users");
    this.user = this.authFire.authState;
  }

  //generic methods
  public getAllUsers(): Observable<User[]> {
    return this.afs.valueChanges();
  }

  public getUserById(userID: string): Promise<User> {
    return this.afs
      .doc(userID)
      .get()
      .toPromise()
      .then((r) => {
        return r.data() as User;
      });
  }

  public getUserByName(userName: string): Observable<User[]> {
    return this.firestore
      .collection<User>("users", (ref) => ref.where("name", "==", userName))
      .valueChanges();
  }

  public async createUser(user: IUser): Promise<string> {
    user.photo = this.defaultPhoto;
    user.milestones = [];
    return this.afs
      .doc(user.userID)
      .set({ ...user })
      .then((r) => {
        return user.userID;
      });
  }

  public async checkExistUser(userID: string): Promise<boolean> {
    const userInDB = await this.getUserById(userID);
    if (userInDB != null) return true;
    else return false;
  }

  public updateUserById(user: User) {
    return this.afs.doc(user.userID).update(user);
  }

  public async uploadImage(user: User, image: File): Promise<boolean> {
    const ach = await this.achievementService.getById("1");
    //user.milestones.push();

    return true;
  }

  SignIn(userLogged: User) {
    //si el usuario está loggeado se almacena en local del navegador
    this.authFire.authState.subscribe(() => {
      if (userLogged) {
        this.user = userLogged;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.router.navigate(["to/index"]);
      } else {
        localStorage.setItem("user", null);
      }
    });
  }
  SignOut() {
    this.authFire.signOut();
  }
}
