import { Injectable } from '@angular/core';
import {Hero} from '../models/hero';
import {HEROES} from '../mock-data/mock-heroes';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHero(id): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero by id: ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
  getHeroes():Observable<Hero[]>{
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  constructor(private messageService: MessageService) { }
}
