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
    if (this.reviewsForm.valid) {
      await this.reviewService
        .createReview(value, this.experienceID)
        .then((res) => {
          this.showMessage();
        });

      this.reviewsForm.reset(); // Borrar los input del formulario
    }
  }

  showMessage() {
    var newSnackbar = document.createElement("div");
    newSnackbar.classList.add("snackbar");
    document.querySelector("body").appendChild(newSnackbar);

    newSnackbar.textContent = "Formulario enviado!";
    newSnackbar.classList.add("active");
    setTimeout(() => {
      newSnackbar.classList.remove("active");
    }, 3000);
  }
}
