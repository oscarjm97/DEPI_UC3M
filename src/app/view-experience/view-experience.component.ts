import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ExperienceService } from "./../services/experience/experience.service";
import { Experience } from "src/app/model/Experience";
import { User } from "src/app/model/User";
import { AuthService } from "./../shared/auth.service";

@Component({
  selector: "app-view-experience",
  templateUrl: "./view-experience.component.html",
  styleUrls: ["./view-experience.component.scss"],
})
export class ViewExperienceComponent implements OnInit {
  public id: string;
  public exp: Experience;
  public arrayRate: number[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private experienceService: ExperienceService
  ) {
    this.exp = new Experience();
    this.arrayRate = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params["params"]["id"];
    });

    this.getExperience();
  }

  async getExperience() {
    this.exp = await this.experienceService.getExperienceById(this.id);
  }

  public getRate(rate) {
    this.arrayRate = [];
    for (let index = 0; index < rate; index++) {
      this.arrayRate.push(index);
    }
    return this.arrayRate;
  }
}
