import { Component, OnInit, Output, EventEmitter } from "@angular/core";

export enum TypesExperience {
  naturaleza,
  playa,
  bar,
  gastronomia,
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
  @Output()
  filterSelection: EventEmitter<string> = new EventEmitter<string>();
  public selectedExperience: string = "";
  typesExperiences = TypesExperience;

  constructor() {}

  ngOnInit() {}

  public onSelectExperience(typeExp: TypesExperience) {
    this.selectedExperience = TypesExperience[typeExp];

    this.filterSelection.emit(this.selectedExperience);
    this.filterCollapse();
  }

  filterCollapse() {
    var filter = document.getElementById("filter-component");
    var isActive = filter.classList.contains("active");
    if (isActive === false) {
      filter.classList.add("active");
    } else {
      filter.classList.remove("active");
    }
  }
}
