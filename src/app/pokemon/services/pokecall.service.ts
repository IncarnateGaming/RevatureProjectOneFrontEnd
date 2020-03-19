import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { PokemonList } from '../models/pokemonList';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokecallService {
  private pokeUrl = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(
    private http: HttpClient,
  ) { }
  getPokemons(offset: number): Observable<>{
    offset = offset || 0;
    return this.http.get(this.pokeUrl + "?offset="+offset+"&limit=20");
  }
  getPokemon(label: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.pokeUrl + label);
  }
}
