import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/components/heroes/heroes.component';
import { HeroDetailComponent } from './heroes/components/hero-detail/hero-detail.component';
import { MessagesComponent } from './ers/components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './heroes/components/dashboard/dashboard.component';
import { LoginComponent } from './ers/components/login/login.component';
import { TicketsComponent } from './ers/components/tickets/tickets.component';
import { NewTicketComponent } from './ers/components/new-ticket/new-ticket.component';
import { EditTicketComponent } from './ers/components/edit-ticket/edit-ticket.component';
import { ManageTicketComponent } from './ers/components/manage-ticket/manage-ticket.component';
import { CreateAccountComponent } from './ers/components/create-account/create-account.component';
import { PageNotFoundComponent } from './ers/components/page-not-found/page-not-found.component';
import { PokebadgeComponent } from './pokemon/components/pokebadge/pokebadge.component';
import { PokedexComponent } from './pokemon/components/pokedex/pokedex.component';
import { JsonStringifyPipe } from './ers/pipes/json-stringify.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    CreateAccountComponent,
    MessagesComponent,
    DashboardComponent,
    LoginComponent,
    TicketsComponent,
    NewTicketComponent,
    EditTicketComponent,
    ManageTicketComponent,
    PageNotFoundComponent,
    PokebadgeComponent,
    PokedexComponent,
    JsonStringifyPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
