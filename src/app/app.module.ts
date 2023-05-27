import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CastSlideshowComponent } from './components/cast-slideshow/cast-slideshow.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PeliculasPosterGridComponent } from './components/peliculas-poster-grid/peliculas-poster-grid.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { PosterPipe } from './pipes/poster.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/SafePipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscarComponent,
    PeliculaComponent,
    PeliculasPosterGridComponent,
    PosterPipe,
    CastSlideshowComponent,
    NavbarComponent, 
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
