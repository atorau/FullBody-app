import { Routes } from '@angular/router';

import { ExercisesListComponent } from './exercises-list/exercises-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ProfileComponent} from'./profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SessionService } from './session.service';
import { MapComponent } from './map/map.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'map', component: MapComponent },
    { path: 'exercise', component: ExercisesListComponent, canActivate: [SessionService] },
    { path: 'profile', component: ProfileComponent, canActivate: [SessionService] },
    { path: 'edit', component: EditProfileComponent, canActivate: [SessionService] },
    { path: '**', redirectTo: '' }
];
