import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { PokecallService } from '../../services/pokecall.service';
import {ActivatedRoute} from '@angular/router';
import {Pokemon} from '../../models/pokemon';
import { FormControl } from '@angular/forms';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-pokebadge',
  templateUrl: './pokebadge.component.html',
  styleUrls: ['./pokebadge.component.sass']
})
export class PokebadgeComponent implements OnInit {
  pokemonObs: Observable<Pokemon>;
  pokemon: Pokemon;
  id: number;
  name: string;
  image: string;
  pStyle: any = {
    color: 'darkblue',
    backgroundColor: 'yellow',
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private pokecallService: PokecallService,
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }
  myFunc(){
    this.pokeCall(this.id);
  }
  getPokemon(): void{
    const urlPart = this.route.snapshot.paramMap.get('id');
    this.pokeCall(urlPart);
  }
  pokeCall(urlPart){
    this.pokemonObs = this.pokecallService.getPokemon(urlPart);
      // .subscribe(result => {
      //   this.pokemon = result;
      //   console.log(result);
      //   this.id = result.id;
      //   this.name = result.name;
      //   this.image = result.sprites.front_default;
      // });
  }
  changeStyle():void{
    if(this.pStyle.color == 'darkblue'){
      this.pStyle = {
        color:'green',
        backgroundColor:'white',
      }
    }else{
      this.pStyle = {
        color: 'darkblue',
        backgroundColor: 'yellow',
      }
    }
  }

}
