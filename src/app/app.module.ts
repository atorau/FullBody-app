import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from "ng2-file-upload";

import { RouterModule } from "@angular/router";
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { ExercisesListComponent } from './exercises-list/exercises-list.component';
import { ExerciseService } from './exercise.service';
import { SessionService } from './session.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { SafePipe } from './safe.pipe';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FilterPipe } from './filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {ProfileService} from './profile.service';

@NgModule({
  declarations: [
    AppComponent,
    ExercisesListComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    SafePipe,
    FilterPipe,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [ProfileService, ExerciseService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
