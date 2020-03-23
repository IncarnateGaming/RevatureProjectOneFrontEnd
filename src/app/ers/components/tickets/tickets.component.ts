import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Reimbursment } from '../../models/reimbursment';
import { ListTicketsService } from '../../services/list-tickets.service';
import { ListUsersService } from '../../services/list-users.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../../models/user';
import { UserRole } from '../../models/userRole';
import { ReimbursmentStatus } from '../../models/reimbursmentStatus';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.sass']
})
export class TicketsComponent implements OnInit {
  user: Observable<User>;
  tickets: Observable<Reimbursment[]>;
  users: Observable<User[]>;
  filterBy: string;
  limit = 20;
  offset = 0;
  constructor(
    private listTicketsService: ListTicketsService,
    private storage: StorageMap,
    private listUsersService: ListUsersService,
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = this.storage.get<User>('userLogin');
    this.callReimbursments();
    this.callUsers();
  }
  callReimbursments() {
    this.storage.get<User>('userLogin').subscribe((res: User) => {
      // const employee: UserRole = {id: 1, role: 'Employee'};
      // const filterBy: User = new User('bugsBunny', '****', 'Bugs', 'Bunny', 'bugs@gmail.com', employee);
      // filterBy.id = 3;
      const status: ReimbursmentStatus = new ReimbursmentStatus('Approved');
      status.id = 2;
      let filterByUser: User;
      if (this.filterBy !== undefined){
        filterByUser = JSON.parse(this.filterBy);
      }
      console.log(res, filterByUser);
      this.tickets =
        this.listTicketsService.sendListRequest(res, filterByUser, this.limit, this.offset, status);
        // .subscribe((result)=>{console.log(result)});
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
