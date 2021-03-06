import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NewAccountService } from '../../services/new-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.sass']
})
export class CreateAccountComponent implements OnInit {

  newAccountForm;
  @Input() pass;
  @Input() pass2;

  constructor(
    private formBuilder: FormBuilder,
    private newAccount: NewAccountService, 
    private router: Router,
  ) {
    this.newAccountForm = this.formBuilder.group({
      username:'',
      password:'',
      password2:'',
      email:'',
    });
   }

  ngOnInit(): void {
  }
  onSubmit(newAccountForm){
    console.log(newAccountForm);
    if(newAccountForm.password === newAccountForm.password2){
      let result = this.newAccount.create(newAccountForm.username, newAccountForm.password, newAccountForm.email)
        .subscribe(result => {
          alert(result.username + " created!");
            this.router.navigate(['/ticket/new/']);
        });
    }else{
      alert('Passwords do not match!');
      this.pass = document.getElementById('passwordInput');
      this.pass.value = '';
      this.pass2 = document.getElementById('passwordInput2');
      this.pass2.value = '';
    }
  }

}
