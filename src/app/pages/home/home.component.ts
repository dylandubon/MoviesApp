import { Component, Host, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  //OnInit EL PRIMERO EN EJECUARSE
  //OnDestroy EL ULTILMO EN EJECUTARSE
  
    public movies: Movie[] = [];
    public moviesSlideShow: Movie[] = [];
    formGroup: any;
    constructor(private PeliculasService: PeliculasService, private formBuilder: FormBuilder,
      private router: Router) { }
  
    @HostListener('window:scroll',['$event'])
    onScroll(){
      const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300
      const max = (document.documentElement.scrollHeight || document.body.scrollHeight)
  
      if(pos > max) {
        if(this.PeliculasService.cargando){return;}
        this.PeliculasService.getCartelera().subscribe(movies => {
          this.movies.push(...movies);
        })
      }
    }
    ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        buscar: new FormControl('')
      })
  
      this.PeliculasService.getCartelera()
      .subscribe(movies => {
        this.movies = movies;
        this.moviesSlideShow = movies;
      })
    }
    ngOnDestroy(): void {
      this.PeliculasService.resetCartelera();
    }
  
    onSubmit(){
      console.log(this.formGroup.value.buscar);
      this.router.navigate(['show/' + this.formGroup.value.buscar]);
    }
   
  
  }
  