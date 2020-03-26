import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { User } from '../../models/user';

@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrls: ['./manage-ticket.component.sass']
})
export class ManageTicketComponent implements OnInit {

  user = this.storage.get<User>('userLogin');
  constructor(
    private storage: StorageMap,
  ) { }

  ngOnInit(): void {
  }

}
