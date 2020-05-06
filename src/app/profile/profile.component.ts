import { Component, OnInit } from "@angular/core";
import { User } from "../model/User";
import { AchievementService } from "./../services/achievement/achievement.service";
import { Achievement } from "./../model/Achievement";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: User;
  public userMiles: number;
  public totalPoints: number;
  public milestones: Achievement[];
  public s_milestones: Subscription;

  constructor(private achievementService: AchievementService) {
    this.user = new User();
    this.userMiles = 0;
    this.milestones = [];
    this.totalPoints = 0;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.s_milestones = this.achievementService.getAll().subscribe((data) => {
      this.milestones = data;
    });

    this.totalPoints = this.achievementService.getUserTotalPoints(this.user);
  }

  ngOnDestroy() {
    this.s_milestones.unsubscribe();
  }

  getPoint(milesID: string) {
    return this.achievementService.getPointByMilestone(
      this.user,
      milesID
    );
  }

  getPorcent(userMiles: number, miles: number): number {
    return (userMiles / miles) * 100;
  }
}
