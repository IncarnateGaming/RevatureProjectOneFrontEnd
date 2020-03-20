import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { PokemonRoutingModule } from './pokemon-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PokemonRoutingModule
  ]
})
export class PokemonModule { }
