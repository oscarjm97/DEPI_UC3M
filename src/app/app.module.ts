import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

<<<<<<< HEAD
// Components Import
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { IndexturistaComponent } from "./indexturista/indexturista.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { FilterComponent } from "./filter/filter.component";
import { ExperienceComponent } from "./experience/experience.component";
import { ProfileComponent } from "./profile/profile.component";

// Angular Modules Import
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";

import { DialogExampleComponent } from "./dialog-example/dialog-example.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommentsComponent } from './comments/comments.component';
import { HelpComponent } from './help/help.component';

//import { FlexLayoutModule } from "@angular/flex-layout";
=======
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DatabaseComponent } from './database/database.component';


>>>>>>> firebase

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
    RegistroComponent,
    IndexturistaComponent,
    MainNavComponent,
    FilterComponent,
    ExperienceComponent,
    ProfileComponent,
    DialogExampleComponent,
    CommentsComponent,
    HelpComponent,
=======
    DatabaseComponent
>>>>>>> firebase
  ],
  entryComponents: [DialogExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatRadioModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
=======
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
>>>>>>> firebase
  ],
  providers: [],
  bootstrap: [AppComponent],
})
<<<<<<< HEAD
export class AppModule {}
=======
export class AppModule {



}
>>>>>>> firebase
