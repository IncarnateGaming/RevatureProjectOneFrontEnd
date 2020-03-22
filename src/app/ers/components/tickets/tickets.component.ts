import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Reimbursment } from '../../models/reimbursment';
import { ListTicketsService } from '../../services/list-tickets.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../../models/user';
import { UserRole } from '../../models/userRole';
import { ReimbursmentStatus } from '../../models/reimbursmentStatus';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.sass']
})
export class TicketsComponent implements OnInit {
  tickets : Observable<Reimbursment[]>;
  constructor(
    private listTicketsService: ListTicketsService,
    private storage: StorageMap,
  ) { }

  ngOnInit(): void {
    this.callReimbursments();
  }
  callReimbursments(){
    this.storage.get<User>('userLogin').subscribe((res:User) =>{
      let employee: UserRole = {"id":1,"role":"Employee"};
      let filterBy: User = new User("bugsBunny","****","Bugs","Bunny","bugs@gmail.com",employee);
      filterBy.id = 3;
      let status: ReimbursmentStatus = new ReimbursmentStatus("Approved");
      status.id = 2;
      this.tickets = 
      this.listTicketsService.sendListRequest(res, filterBy, 10, 10, status);
        // .subscribe((result)=>{console.log(result)});
    });
  }

}
