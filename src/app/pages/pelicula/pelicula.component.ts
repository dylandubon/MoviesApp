import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service.service';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public movie: MovieResponse | undefined;
  public movies: Movie[] = [];
  public videos: any[] | undefined;
  constructor(private ActivatedRoute: ActivatedRoute, 
    private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const {id} = params;
      this.peliculasService.getPelicucaDetalle(id).subscribe((data:any) => {
        this.movie = data;

        
      })
      this.peliculasService.getigual(id).subscribe((data:any) => {

        this.movies = data.results;
        this.peliculasService.getVideo(id).subscribe((data:any) => {

          this.videos = data.results;
          this.videos?.forEach(element => {
            element.link =  'https://www.youtube.com/embed/' + element.key;
            console.log(element);

          })
        })

      })

    })
  }

}
