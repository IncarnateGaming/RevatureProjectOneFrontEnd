import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginTemplate } from 'src/app/templates/loginTemplate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginTemplate;
  constructor() {
    // this.loginTemplate = this.formBuilder.group({
    //   username:'',
    //   password:''
    // });
   }

  ngOnInit(): void {
  }
  onSubmit(event: Event){
    console.log(event);
    console.log(event.currentTarget);
    console.log(this.loginTemplate);
  }

}
