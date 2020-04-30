import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../model/User";
//import { UV_UDP_REUSEADDR } from 'constants';
import { AuthService } from "./../shared/auth.service";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html",
  styleUrls: ["./database.component.scss"],
})
export class DatabaseComponent implements OnInit, OnDestroy {
  public users: User[];
  public s_users: Subscription;

  public userJuan: User;
  public userLogged: User;
  public existUser: boolean;

  constructor(private userService: AuthService) {
    this.users = [];
    this.userJuan = new User();
    this.userLogged = new User();
    this.existUser = false;
  }

  ngOnInit() {
    this.s_users = this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    this.s_users.unsubscribe();
  }

  public async login(userID: string, pass: string) {
    for (let user of this.users) {
      if (user.userID == userID) {
        this.existUser = true;
      }
    }

    if (this.existUser) {
      this.userLogged = await this.userService.getUserById(userID);
      if (this.userLogged.password == pass) {
        console.log("Login successful.");
        // Marcar usuario como logueado
        // Redirigir al index
      } else {
        console.log("The password is not correct.");
        // Borrar el input password del formulario
      }
    } else {
      console.log("The user is not registered.");
      // Borrar los input del formulario
    }
  }

  public getUserByName(user: string) {
    this.userService.getUserByName(user).subscribe((data) => {
      this.userJuan = data[0];
    });
  }
}
