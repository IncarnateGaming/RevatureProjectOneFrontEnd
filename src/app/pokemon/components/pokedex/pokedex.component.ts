import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { PokecallService } from '../../services/pokecall.service';
import {ActivatedRoute} from '@angular/router';
import {Pokemon} from '../../models/pokemon';
import {PokemonList} from '../../models/pokemonList';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.sass']
})
export class PokedexComponent implements OnInit {
  pokemonObs: Observable<PokemonList[]>;
  pokemon: PokemonList[];
  // id: number;
  // name: string;
  // image: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private pokecallService: PokecallService,
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }
  getPokemon(): void{
    const urlPart = this.route.snapshot.paramMap.get('offset');
    this.pokeCall(urlPart);
  }
  pokeCall(urlPart){
    this.pokecallService.getPokemons(urlPart)
      .subscribe(result => {
        this.pokemon = result.results;
        const listPoke = document.getElementsByClassName("pokemon")[0];
        this.pokemon.forEach(poke =>{
          let elem = document.createElement("li");
          elem.innerHTML = `<a href="/pokemon/${poke.name}">${poke.name}</a>`;
          listPoke.appendChild(elem);
        })
      });
  }
}
