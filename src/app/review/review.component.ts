import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ReviewService } from "./../services/reviews/review.service";
import { AchievementService } from "./../services/achievement/achievement.service";
import { ViewExperienceComponent } from "./../view-experience/view-experience.component";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit {
  reviewsForm: FormGroup;
  experienceID: string;
  constructor(
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private experience: ViewExperienceComponent
  ) {
    this.reviewsForm = fb.group({
      comment: [""],
    });
  }

  ngOnInit() {
    this.experienceID = this.experience.id;
  }

  async onSubmit(value) {
    await this.reviewService
      .createReview(value, this.experienceID)
      .then((res) => {
        console.log("Form send sucessfully");
        this.reviewsForm.reset(); // Borrar los input del formulario
      });
  }
}
