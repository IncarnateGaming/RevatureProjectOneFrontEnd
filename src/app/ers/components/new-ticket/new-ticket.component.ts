import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReimbursmentType } from '../../models/reimbursmentType';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.sass']
})
export class NewTicketComponent implements OnInit {

  amount: number;
  description: string;
  type: string;
  types: Observable<ReimbursmentType>;
  constructor() { }

  ngOnInit(): void {
  }

}
