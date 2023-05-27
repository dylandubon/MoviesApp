import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';  
import { catchError, map, tap } from 'rxjs/operators';  
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsReponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private baseUrl: string= 'https://api.themoviedb.org/3';
  private carteleraPage =1;
  public cargando:boolean = false;

  constructor(private http: HttpClient) { }

  get params(){
    return{
      api_key: 'd070e0fd80422b7ae7c2736a6da2b92e',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }
  resetCartelera(){
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]>{
    if (this.cargando){
      return of([])
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      map(response => response.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    )
  }
  buscarPeliculas(texto: string):Observable<Movie[]> {
    const params = {...this.params,page:1,query:texto}
    //https://api.themoviedb.org/3/search/movie
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
        map (response => response.results)
      )
  }

  getPelicucaDetalle(id:string){
    //https://api.themoviedb.org/3/movie
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${ id }`,{
      params: this.params
    }).pipe(
      catchError(error => of(null))
    )
  }

  getCast(id:string):Observable<Cast[]>{
    //https://api.themoviedb.org/3/movie/credits
    return this.http.get<CreditsReponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
        params: this.params
    }).pipe(
      map(response => response.cast ),
      catchError(error => of([]))
    )
  }

  getigual(id:string){
    //https://api.themoviedb.org/3/movie
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${ id }/similar`,{
      params: this.params
    }).pipe(
      catchError(error => of(null))
    )
  }

  getVideo(id: string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${ id }/videos`,{
      params: this.params
    }).pipe(
      catchError(error => of(null))
    )
  }
}


