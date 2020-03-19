import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokebadgeComponent } from './components/pokebadge/pokebadge.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';



@NgModule({
  declarations: [
    PokebadgeComponent,
    PokedexComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class PokemonModule { }
