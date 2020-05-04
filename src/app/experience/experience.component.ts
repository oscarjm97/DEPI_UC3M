import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DialogExampleComponent } from "./../dialog-example/dialog-example.component";
import { ReviewService } from "./../services/reviews/review.service";
import { Subscription } from "rxjs";
import { Review } from "./../model/Review";
import { User } from "src/app/model/User";
import { Experience } from "src/app/model/Experience";
import { ExperienceService } from "./../services/experience/experience.service";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  user: User;
  public experiences: Experience[];
  public s_experiences: Subscription;

  public reviews: Review[];
  public s_reviews: Subscription;

  constructor(
    private experienceService: ExperienceService,
    private reviewService: ReviewService
  ) {
    this.experiences = [];
    this.reviews = [];
    this.user = new User();
  }
  /* constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogExampleComponent);
  } */

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));

    this.s_experiences = this.experienceService
      .getExperiencesByUser(this.user)
      .subscribe((data) => {
        this.experiences = data;
      });

    this.s_reviews = this.reviewService.getAll().subscribe((data) => {
      this.reviews = data;
    });
  }

  ngOnDestroy() {
    this.s_experiences.unsubscribe();
  }

  public getReviewExperience(exp: Experience) {
    return this.reviews.filter((rev) => rev.experienceID == exp.id);
  }
}
