import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Reimbursment } from '../../models/reimbursment';
import { ListTicketsService } from '../../services/list-tickets.service';
import { ListUsersService } from '../../services/list-users.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../../models/user';
import { ReimbursmentStatus } from '../../models/reimbursmentStatus';
import { ListReimbursmentStatusesService } from '../../services/list-reimbursment-statuses.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.sass']
})
export class TicketsComponent implements OnInit {
  user: Observable<User>;
  tickets: Observable<Reimbursment[]>;
  users: Observable<User[]>;
  reimbursmentStatuses: Observable<ReimbursmentStatus[]>;
  filterBy: string;
  status: string;
  limit = 20;
  offset = 0;
  constructor(
    private listTicketsService: ListTicketsService,
    private storage: StorageMap,
    private listUsersService: ListUsersService,
    private listReimbursmentStatusesService: ListReimbursmentStatusesService,
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.storage.get<User>('userLogin');
    this.callReimbursments();
    this.callUsers();
    this.callReimbursmentStatuses();
  }
  callReimbursmentStatuses(){
    this.reimbursmentStatuses = this.listReimbursmentStatusesService.sendListRequest();
  }
  callReimbursments() {
    this.storage.get<User>('userLogin').subscribe((res: User) => {
      let filterByUser: User = new User("","","","","",{"id":0,"role":""});
      if (this.filterBy !== undefined && this.filterBy !== ""){
        filterByUser = JSON.parse(this.filterBy);
      }
      let status: ReimbursmentStatus = new ReimbursmentStatus("");
      if(this.status !== undefined && this.status !== ""){
        status = JSON.parse(this.status);
      }
      this.tickets =
        this.listTicketsService.sendListRequest(res, filterByUser, this.limit, this.offset, status);
    });
  }
  callUsers() {
    this.storage.get<User>('userLogin').subscribe((res: User) => {
      if (res.role && res.role.role === 'Admin') {
        this.users =
          this.listUsersService.sendListRequest(res, 20, 0);
      }
    });
  }

}
