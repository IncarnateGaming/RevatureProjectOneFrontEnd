import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokecallService {
  private pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(
    private http: HttpClient,
  ) { }
  getPokemons(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.pokeUrl);
  }
  getPokemon(label: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.pokeUrl + label);
  }
}
