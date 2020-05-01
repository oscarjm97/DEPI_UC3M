import { Component, OnInit } from "@angular/core";
import { User } from "../model/User";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor() {
    this.user = new User();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
}
