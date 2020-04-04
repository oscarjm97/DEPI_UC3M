import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { IndexturistaComponent } from "./indexturista/indexturista.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "registro", component: RegistroComponent },
  { path: "indexturista", component: IndexturistaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
