import { Component, OnInit } from '@angular/core';
import {User} from './ers/models/user';
import { StorageMap } from '@ngx-pwa/local-storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Employee Reimbursment System';
  titleAbbreviation = 'ERS';
  user: Observable<User>;
  constructor(
      private storage: StorageMap,
  ) { }
  ngOnInit():void{
    // @ts-ignore
    this.user = this.storage.get<User>('userLogin');
  }
  logout() {
    this.storage.delete('userLogin').subscribe(() => {});
  }
}
