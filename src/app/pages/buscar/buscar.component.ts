import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public text: string =""
  public movie : Movie[] = [];
  constructor(private ActivatedRoute: ActivatedRoute, 
              private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const {id} = params;
      this.text = id;
      this.peliculasService.buscarPeliculas(params.text).subscribe(movies => {
        console.log(movies);
        this.movie = movies;
      })
    })
  }

}

