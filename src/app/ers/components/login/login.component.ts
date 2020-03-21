import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { StorageMap } from '@ngx-pwa/local-storage';

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
    private storage: StorageMap,
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
        this.storage.set('userLogin',result).subscribe(()=>{});
        // this.storage.get('userLogin').subscribe((res) =>{console.log(res);});
      });
  }

}
