import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes/heroes.component';
import {HeroDetailComponent} from './heroes/components/hero-detail/hero-detail.component';
import {DashboardComponent} from './heroes/components/dashboard/dashboard.component';
import {LoginComponent} from './ers/components/login/login.component';
import {EditTicketComponent} from './ers/components/edit-ticket/edit-ticket.component';
import {ManageTicketComponent} from './ers/components/manage-ticket/manage-ticket.component';
import {NewTicketComponent} from './ers/components/new-ticket/new-ticket.component';
import {TicketsComponent} from './ers/components/tickets/tickets.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ticket/list', component: TicketsComponent},
  {path: 'ticket/new', component: NewTicketComponent},
  {path: 'ticket/edit/:id', component: EditTicketComponent},
  {path: 'ticket/manage/:id', component: ManageTicketComponent},
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
