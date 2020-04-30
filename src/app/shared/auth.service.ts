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

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: any;
  private afs: AngularFirestoreCollection<User>;

  constructor(
    private authFire: AngularFireAuth,
    public router: Router,
    private firestore: AngularFirestore
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

  public createUser(user: IUser): Promise<string> {
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

  SignIn(userLogged: User) {
    //si el usuario está loggeado se almacena en local del navegador
    this.authFire.authState.subscribe(() => {
      if (userLogged) {
        this.user = userLogged;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.router.navigate(["index"]);
      } else {
        localStorage.setItem("user", null);
      }
    });
  }
  SignOut() {
    this.authFire.signOut();
  }
}
