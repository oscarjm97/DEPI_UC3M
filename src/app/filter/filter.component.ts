import { Component, OnInit } from "@angular/core";

export enum TypesExperience {
  naturaleza,
  bar,
  gastronomica,
  piscina,
  deportes,
  cultura,
  musica,
}

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  public selectedExperience: string = "";
  typesExperiences = TypesExperience;

  constructor() {}

  ngOnInit() {}

  public onSelectExperience(typeExp: TypesExperience) {
    this.selectedExperience = TypesExperience[typeExp];
    console.log(this.selectedExperience);
  }

  public onClear() {
    this.selectedExperience = "";
  }
}
