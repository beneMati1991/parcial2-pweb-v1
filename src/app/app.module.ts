import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the module from the SDK.
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { ErrorComponent } from './pages/error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    EpisodeComponent,
    CharactersComponent,
    LogoutButtonComponent,
    LoginButtonComponent,
    ErrorComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Import the module into the application, with configuration.
    AuthModule.forRoot({
      domain: 'dev-f5z9j2wu.us.auth0.com',
      clientId: '82o1FfwPFSxvbaCxVlIuXzcUoogmuzlo',
    }),
    MDBBootstrapModulesPro.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    MatDialogModule
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
})
export class AppModule {}
