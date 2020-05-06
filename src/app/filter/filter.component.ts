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
  @Output()
  priceMinEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  priceMaxEvent: EventEmitter<number> = new EventEmitter<number>();

  public selectedExperience: string = "";
  public minPrice: number;
  public maxPrice: number;
  typesExperiences = TypesExperience;

  constructor() {}

  ngOnInit() {}

  public onSelectExperience(typeExp: TypesExperience) {
    this.selectedExperience = TypesExperience[typeExp];

    this.filterSelection.emit(this.selectedExperience);
    this.filterCollapse();
  }

  public getMinPriceEvent(price) {
    this.minPrice = price;
    this.priceMinEvent.emit(this.minPrice);
  }

  public getMaxPriceEvent(price) {
    this.maxPrice = price;
    this.priceMaxEvent.emit(this.maxPrice);
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
