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
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from "@agm/core";
import { ReactiveFormsModule } from '@angular/forms';
import {} from "@types/googlemaps";
import { TabsModule } from 'ngx-bootstrap';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    ExercisesListComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FileSelectDirective,
    SafePipe,
    FilterPipe,
    ProfileComponent,
    EditProfileComponent,
    MapComponent,
    FooterComponent

  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC78vpwi7aeVo0o_6DlQm8_B4NM41EUEr4",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [ProfileService, ExerciseService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
