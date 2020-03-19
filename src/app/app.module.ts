import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import {FormsModule} from '@angular/forms';
import { HeroDetailComponent } from './heroes/components/hero-detail/hero-detail.component';
import { MessagesComponent } from './ers/components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './heroes/components/dashboard/dashboard.component';
import { LoginComponent } from './ers/components/login/login.component';
import { TicketsComponent } from './ers/components/tickets/tickets.component';
import { NewTicketComponent } from './ers/components/new-ticket/new-ticket.component';
import { EditTicketComponent } from './ers/components/edit-ticket/edit-ticket.component';
import { ManageTicketComponent } from './ers/components/manage-ticket/manage-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    LoginComponent,
    TicketsComponent,
    NewTicketComponent,
    EditTicketComponent,
    ManageTicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
