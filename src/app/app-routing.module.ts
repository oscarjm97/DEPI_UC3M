import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { IndexturistaComponent } from "./indexturista/indexturista.component";
import { ExperienceComponent } from "./experience/experience.component";
import { ProfileComponent } from "./profile/profile.component";
import { HelpComponent } from "./help/help.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { ViewExperienceComponent} from './view-experience/view-experience.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: RegistroComponent },
  {
    path: "",
    component: MainNavComponent,
    children: [
      { path: "index", component: IndexturistaComponent },
      { path: "experience", component: ExperienceComponent },
      {path: 'view-experience', component: ViewExperienceComponent},
      { path: "profile", component: ProfileComponent },
      { path: "help", component: HelpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  import { ViewExperienceComponent } from './view-experience/view-experience.component';
exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
