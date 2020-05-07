import { Component, OnInit } from "@angular/core";
import { Experience } from "src/app/model/Experience";
import { Subscription } from "rxjs";
import { MainNavComponent } from "../main-nav/main-nav.component";
import { User } from "src/app/model/User";
import { Review } from "./../model/Review";
import { ReviewService } from "./../services/reviews/review.service";
import { ExperienceService } from "./../services/experience/experience.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from "@angular/fire/storage";

interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-indexturista",
  templateUrl: "./indexturista.component.html",
  styleUrls: ["./indexturista.component.scss"],
})
export class IndexturistaComponent implements OnInit {
  types: Types[] = [
    { value: 'naturaleza', viewValue: 'Naturaleza' },
    { value: 'playa', viewValue: 'Playa' },
    { value: 'bar', viewValue: 'Bar' },
    { value: 'gastronomia', viewValue: 'Gastronomía' },
    { value: 'deportes', viewValue: 'Deportes' },
    { value: 'cultura', viewValue: 'Cultura' },
    { value: 'musica', viewValue: 'Música' }
  ];

  experienceForm: FormGroup;
  adventur: boolean = false;
  user: User;
  removable = true;
  filter: string = "";
  selectedFile: File = null;
  url: string = "";

  public experiences: Experience[];
  public s_experiences: Subscription;
  public reviews: Review[];
  public s_reviews: Subscription;

  public arrayRate: number[];

  constructor(
    public navbar: MainNavComponent,
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private experienceService: ExperienceService,
    private http: HttpClient,
    private afStorage: AngularFireStorage
  ) {
    this.experiences = [];
    this.reviews = [];
    this.arrayRate = [];
    this.user = new User();

    this.experienceForm = fb.group({
      name: ["", Validators.required],
      province: ["", Validators.required],
      country: ["", Validators.required],
      price: ["", Validators.required],
      type: ["", Validators.required],
      description: ["", Validators.required],
      photo: [""],
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.adventur = this.user.rol.toLowerCase().startsWith("aventurero")
      ? true
      : false;

    this.s_experiences = this.experienceService.getAll().subscribe((data) => {
      this.experiences = data.map((e) => {
        console.log(e.payload.doc.id);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Experience;
      });
    });

    this.s_reviews = this.reviewService.getAll().subscribe((data) => {
      this.reviews = data;
    });
  }

  ngOnDestroy() {
    this.s_experiences.unsubscribe();
    this.s_reviews.unsubscribe();
  }

  public getExperiences() {
    let exps = this.experiences;
    this.filter = this.navbar.filterSelect;
    if (this.navbar.searchForm != "" && this.navbar.searchForm != null) {
      exps = this.experiences.filter(
        (exp) =>
          exp.name
            .toUpperCase()
            .includes(this.navbar.searchForm.toUpperCase()) ||
          exp.country
            .toUpperCase()
            .includes(this.navbar.searchForm.toUpperCase()) ||
          exp.province
            .toUpperCase()
            .includes(this.navbar.searchForm.toUpperCase())
      );
    }
    if (this.filter != "" && this.filter != null) {
      exps = exps.filter((exp) => {
        if (
          exp.type != null &&
          exp.type.toUpperCase().startsWith(this.filter.toUpperCase())
        ) {
          return exp;
        }
      });
    }

    exps = this.restrictByPrice(exps);
    return exps;
  }

  public restrictByPrice(exps: Experience[]) {
    if (this.navbar.minPriceSelect != null && this.navbar.minPriceSelect > 0) {
      if (
        this.navbar.maxPriceSelect != null &&
        this.navbar.maxPriceSelect > 0
      ) {
        return exps.filter(
          (f) =>
            f.price >= this.navbar.minPriceSelect &&
            f.price <= this.navbar.maxPriceSelect
        );
      } else {
        return exps.filter((f) => f.price >= this.navbar.minPriceSelect);
      }
    } else {
      if (
        this.navbar.maxPriceSelect != null &&
        this.navbar.maxPriceSelect > 0
      ) {
        return exps.filter((f) => f.price <= this.navbar.maxPriceSelect);
      }
    }
    return exps;
  }

  public getRate(rate) {
    this.arrayRate = [];
    for (let index = 0; index < rate; index++) {
      this.arrayRate.push(index);
    }
    return this.arrayRate;
  }

  remove(): void {
    this.navbar.filterSelect = "";
    this.filter = "";
  }

  public getReviewInExperience(expID: string) {
    return this.reviews.filter((r) => r.experienceID == expID).length;
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
  }

  async onSubmit(value) {
    if (value.photo != null && value.photo != "") {
      const filePath = this.selectedFile.name; //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.selectedFile); //upload task
      await this.getUrl(snap);
    }

    value.photo = this.url;

    await this.experienceService
      .createExperience(value, this.user)
      .then((res) => {
        this.showMessage();
      });
    this.experienceForm.reset();
  }

  showMessage() {
    var newSnackbar = document.createElement("div");
    newSnackbar.classList.add("snackbar");
    document.querySelector("body").appendChild(newSnackbar);

    newSnackbar.textContent = "Experiencia creada!";
    newSnackbar.classList.add("active");
    setTimeout(() => {
      newSnackbar.classList.remove("active");
    }, 3000);
  }
}
