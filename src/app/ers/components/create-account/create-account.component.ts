import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NewAccountService } from '../../services/new-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.sass']
})
export class CreateAccountComponent implements OnInit {

  newAccountForm;
  constructor(
    private formBuilder: FormBuilder,
    private newAccount: NewAccountService, 
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
    if(newAccountForm.password === newAccountForm.password2){
      let result = this.newAccount.create(this.newAccountForm.username, this.newAccountForm.password, this.newAccountForm.email)
        .subscribe(result => {
          console.log(result);
        });
    }else{
      alert('Passwords do not match!');
      // document.getElementById('passwordInput').value = '';
      // document.getElementById('passwordInput2').value = '';
    }
  }

}
