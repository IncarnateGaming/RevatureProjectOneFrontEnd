import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/components/heroes/heroes.component';
import {HeroDetailComponent} from './heroes/components/hero-detail/hero-detail.component';
import {DashboardComponent} from './heroes/components/dashboard/dashboard.component';
import {LoginComponent} from './ers/components/login/login.component';
import {EditTicketComponent} from './ers/components/edit-ticket/edit-ticket.component';
import {ManageTicketComponent} from './ers/components/manage-ticket/manage-ticket.component';
import {NewTicketComponent} from './ers/components/new-ticket/new-ticket.component';
import {TicketsComponent} from './ers/components/tickets/tickets.component';
import { CreateAccountComponent } from './ers/components/create-account/create-account.component';
import { PokedexComponent } from './pokemon/components/pokedex/pokedex.component';
import { PokebadgeComponent } from './pokemon/components/pokebadge/pokebadge.component';
import { PageNotFoundComponent } from './ers/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: TicketsComponent, pathMatch: 'full'},
  {path: 'newaccount', component: CreateAccountComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ticket', children:[
    {path: 'edit/:id', component: EditTicketComponent},
    {path: 'list', component: TicketsComponent},
    {path: 'manage/:id', component: ManageTicketComponent},
    {path: 'new', component: NewTicketComponent},
  ]},
  {path: 'pokemon/list', component: PokedexComponent},
  {path: 'pokemon/list/:offset', component: PokedexComponent},
  {path: 'pokemon/:id', component: PokebadgeComponent},
  {path: '**', component: PageNotFoundComponent},
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
