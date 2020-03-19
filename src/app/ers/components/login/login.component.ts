import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm;
  constructor(
    private formBuilder: FormBuilder,
    private login: LoginService, 
  ) {
    this.loginForm = this.formBuilder.group({
      username:'',
      password:''
    });
   }

  ngOnInit(): void {
  }
  onSubmit(loginTemplate){
    let result = this.login.sendLogin(loginTemplate.username, loginTemplate.password)
      .subscribe(result => {
        console.log(result);
      });
  }

}
