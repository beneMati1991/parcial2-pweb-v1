import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the module from the SDK.
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { CharactersComponent } from './pages/characters/characters.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    EpisodeComponent,
    CharactersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Import the module into the application, with configuration.
    AuthModule.forRoot({
      domain: 'dev-f5z9j2wu.us.auth0.com',
      clientId: '82o1FfwPFSxvbaCxVlIuXzcUoogmuzlo'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
