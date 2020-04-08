import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { IndexturistaComponent } from "./indexturista/indexturista.component";
import { ExperienceComponent } from "./experience/experience.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "index", component: IndexturistaComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "sigup", component: RegistroComponent },
  { path: "experience", component: ExperienceComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
