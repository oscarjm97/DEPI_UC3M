import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ExperienceService } from "./../services/experience/experience.service";
import { ReviewService } from "./../services/reviews/review.service";
import { Experience } from "src/app/model/Experience";
import { Review } from "./../model/Review";
import { User } from "src/app/model/User";
import { AuthService } from "./../shared/auth.service";

@Component({
  selector: "app-view-experience",
  templateUrl: "./view-experience.component.html",
  styleUrls: ["./view-experience.component.scss"],
})
export class ViewExperienceComponent implements OnInit, OnDestroy {
  public id: string;
  public exp: Experience;
  public arrayRate: number[];

  public reviews: Review[];
  public s_reviews: Subscription;

  public user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private reviewService: ReviewService
  ) {
    this.exp = new Experience();
    this.reviews = [];
    this.arrayRate = [];
    this.user = new User();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params["params"]["id"];
    });

    this.getExperience();

    this.s_reviews = this.reviewService.getAll().subscribe((data) => {
      this.reviews = data;
    });
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  ngOnDestroy() {
    this.s_reviews.unsubscribe();
  }

  async getExperience() {
    this.exp = await this.experienceService.getExperienceById(this.id);
  }

  public getRate(rate) {
    this.arrayRate = [];
    if (rate != null) {
      for (let index = 0; index < rate; index++) {
        this.arrayRate.push(index);
      }
    }
    return this.arrayRate;
  }

  public getReviewInExperience(expID: string) {
    return this.reviews.filter((r) => r.experienceID == expID).length;
  }

  differentUser(): boolean {
    if (this.user.userID == this.exp.userID) {
      return false;
    } else {
      return true;
    }
  }

  showMessage() {
    var newSnackbar = document.createElement("div");
    newSnackbar.classList.add("snackbar");
    document.querySelector("body").appendChild(newSnackbar);

    newSnackbar.textContent = "Has reservado la experiencia: " + this.exp.name;
    newSnackbar.classList.add("active");
    setTimeout(() => {
      newSnackbar.classList.remove("active");
    }, 3000);
  }
}
