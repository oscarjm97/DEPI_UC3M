import { Component, OnInit } from "@angular/core";
import { User } from "../model/User";
import { AchievementService } from "./../services/achievement/achievement.service";
import { Achievement } from "./../model/Achievement";
import { Subscription } from "rxjs";
import { FirestoreService } from "./../services/firestore/firestore.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: User;
  public milestones: Achievement[];
  public s_milestones: Subscription;

  constructor(private firestore: FirestoreService) {
    this.user = new User();
    this.milestones = [];
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.s_milestones = this.firestore.getAchievements().subscribe((data) => {
      this.milestones = data;
    });
  }

  ngOnDestroy() {
    this.s_milestones.unsubscribe();
  }
}
