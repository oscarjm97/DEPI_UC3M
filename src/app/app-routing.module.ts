import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { IndexturistaComponent } from "./indexturista/indexturista.component";
import { ExperienceComponent } from "./experience/experience.component";
import { ProfileComponent } from "./profile/profile.component";
import { HelpComponent } from "./help/help.component";

const routes: Routes = [
  { path: "index", component: IndexturistaComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: RegistroComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "experience", component: ExperienceComponent },
  { path: "profile", component: ProfileComponent },
  { path: "help", component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
