import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ReimbursmentType } from '../../models/reimbursmentType';
import { ListReimbursmentTypesService } from '../../services/list-reimbursment-types.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Reimbursment } from '../../models/reimbursment';
import { ReimbursmentService } from '../../services/reimbursment.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.sass']
})
export class EditTicketComponent implements OnInit {
  reimbursment: Observable<Reimbursment>;
  types: Observable<ReimbursmentType[]>;
  constructor(
    private listReimbursmentTypesService: ListReimbursmentTypesService,
    private storage: StorageMap,
    private reimbursmentService: ReimbursmentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.callReimbursmentTypes();
    this.storage.get<User>('userLogin').subscribe((res: User) => {
      this.reimbursment = this.route.paramMap.pipe(
        switchMap((params:ParamMap)=>
          this.reimbursmentService.get(res,+params.get('id'))))
    });
  }
  callReimbursmentTypes(){
    this.types = this.listReimbursmentTypesService.sendListRequest();
  }
  submit(){
  }

}
