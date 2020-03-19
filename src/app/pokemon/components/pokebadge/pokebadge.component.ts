import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { PokecallService } from '../../services/pokecall.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokebadge',
  templateUrl: './pokebadge.component.html',
  styleUrls: ['./pokebadge.component.sass']
})
export class PokebadgeComponent implements OnInit {
  pokemon;
  id: number;
  name: string;
  image: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private pokecallService: PokecallService,
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }
  getPokemon(): void{
    const urlPart = this.route.snapshot.paramMap.get('id');
    this.pokecallService.getPokemon(urlPart)
      .subscribe(result => {
        this.pokemon = result;
        console.log(result);
        this.id = result.id;
        this.name = result.name;
        this.image = result.sprites.front_default;
      });
  }

}
