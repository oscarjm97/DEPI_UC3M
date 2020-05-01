import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-experience",
  templateUrl: "./view-experience.component.html",
  styleUrls: ["./view-experience.component.scss"],
})
export class ViewExperienceComponent implements OnInit {
  private id: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params["params"]["id"];
    });
    console.log(this.id);
  }
}
