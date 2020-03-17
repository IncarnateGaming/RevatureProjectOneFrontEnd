import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {EditTicketComponent} from './components/edit-ticket/edit-ticket.component';
import {ManageTicketComponent} from './components/manage-ticket/manage-ticket.component';
import {NewTicketComponent} from './components/new-ticket/new-ticket.component';
import {TicketsComponent} from './components/tickets/tickets.component';

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
