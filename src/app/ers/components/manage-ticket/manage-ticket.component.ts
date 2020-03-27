import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReimbursmentService } from '../../services/reimbursment.service';
import { ListReimbursmentStatusesService } from '../../services/list-reimbursment-statuses.service';
import { Reimbursment } from '../../models/reimbursment';
import { switchMap } from 'rxjs/operators';
import { ReimbursmentStatus } from '../../models/reimbursmentStatus';

@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrls: ['./manage-ticket.component.sass']
})
export class ManageTicketComponent implements OnInit {

  user = this.storage.get<User>('userLogin');
  reimbursment: Observable<Reimbursment>;
  statuses: Observable<ReimbursmentStatus[]>;
  status: HTMLSelectElement;
  constructor(
    private storage: StorageMap,
    private listReimbursmentStatusesService: ListReimbursmentStatusesService,
    private reimbursmentService: ReimbursmentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.statuses = this.listReimbursmentStatusesService.sendListRequest();
    this.storage.get<User>('userLogin').subscribe((res: User) => {
      this.reimbursment = this.route.paramMap.pipe(
        switchMap((params:ParamMap)=>
          this.reimbursmentService.get(res,+params.get('id'))
          ));
      this.reimbursment.subscribe((reimbursment)=>{
        this.statuses.subscribe((statuses)=>{
          this.status = <HTMLSelectElement> document.getElementById('status');
          this.status.value = JSON.stringify(reimbursment.status);
        })
      })
    });
  }
  submit(){
    this.reimbursment.subscribe((reimbursment)=>{
      this.storage.get<User>('userLogin').subscribe((res: User) => {
        reimbursment.status = JSON.parse(this.status.value);
        this.reimbursmentService.update(res, reimbursment).subscribe(()=>{
          location.reload();
        });
      });
    });
  }

}
