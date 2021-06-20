import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'episode',
    component: EpisodeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'characters',
    component: CharactersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
