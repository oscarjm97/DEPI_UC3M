import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
})
export class MainNavComponent {
  public searchForm: string = "";
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authFire: AngularFireAuth,
    private router: Router
  ) {}

  filterCollapse() {
    var filter = document.getElementById("filter-component");
    var isActive = filter.classList.contains("active");
    if (isActive === false) {
      filter.classList.add("active");
    } else {
      filter.classList.remove("active");
    }
  }

  SignOut() {
    this.authFire.signOut();
    this.router.navigate(["login"]);
  }

  isInIndex(): boolean {
    if (this.router.url.valueOf() == "/to/index") {
      return true;
    } else {
      return false;
    }
  }
}
