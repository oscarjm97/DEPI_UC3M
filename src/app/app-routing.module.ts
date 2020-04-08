import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { IndexturistaComponent } from "./indexturista/indexturista.component";
<<<<<<< HEAD
import { MainNavComponent } from "./main-nav/main-nav.component";
=======
import { ExperienceComponent } from "./experience/experience.component";
import { ProfileComponent } from "./profile/profile.component";
>>>>>>> a4eb7acbf0d82f86247d2bc8cc74617f9bf49887

const routes: Routes = [
  { path: "index", component: IndexturistaComponent },
  { path: "login", component: LoginComponent },
<<<<<<< HEAD
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "registro", component: RegistroComponent },
  { path: "indexturista", component: IndexturistaComponent },
  { path: "main-nav", component: MainNavComponent }
=======
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "sigup", component: RegistroComponent },
  { path: "experience", component: ExperienceComponent },
  { path: "profile", component: ProfileComponent },
>>>>>>> a4eb7acbf0d82f86247d2bc8cc74617f9bf49887
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
