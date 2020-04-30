import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "./../services/firestore/firestore.service";
import { Experience } from "src/app/model/Experience";
import { Subscription } from "rxjs";
import { MainNavComponent } from "../main-nav/main-nav.component";

@Component({
  selector: "app-indexturista",
  templateUrl: "./indexturista.component.html",
  styleUrls: ["./indexturista.component.scss"],
})
export class IndexturistaComponent implements OnInit {
  public experiences: Experience[];
  public s_experiences: Subscription;

  constructor(
    private firestore: FirestoreService,
    private navbar: MainNavComponent
  ) {
    this.experiences = [];
  }

  ngOnInit() {
    this.s_experiences = this.firestore.getExperiences().subscribe((data) => {
      this.experiences = data;
    });
  }

  ngOnDestroy() {
    this.s_experiences.unsubscribe();
  }

  public getExperiences() {
    if (this.navbar.searchForm != "") {
      return this.experiences.filter((exp) =>
        exp.name.toUpperCase().startsWith(this.navbar.searchForm.toUpperCase())
      );
    } else {
      return this.experiences;
    }
  }
}
