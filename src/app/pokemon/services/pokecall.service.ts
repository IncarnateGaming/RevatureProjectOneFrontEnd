import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import {Observable, of} from 'rxjs';
import { PokeObservableResponse } from '../models/pokeObservableResponse';

@Injectable({
  providedIn: 'root'
})
export class PokecallService {
  private pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(
    private http: HttpClient,
  ) { }
  getPokemons(offset: number): Observable<PokeObservableResponse>{
    offset = offset || 0;
    return this.http.get<PokeObservableResponse>(this.pokeUrl + "?offset="+offset+"&limit=20");
  }
  getPokemon(label: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.pokeUrl + label);
  }
}
