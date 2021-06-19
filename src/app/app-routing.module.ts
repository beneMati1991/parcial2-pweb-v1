import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'menu',
    component: MenuComponent
  },
  {
    path:'episode',
    component: EpisodeComponent
  },
  {
    path:'characters',
    component: CharactersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
