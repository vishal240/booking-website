import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, public model: ModelService, public router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {

  }
  submit(){
    this.model.common_api('adminlogin', this.loginForm.value).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.model.typeSuccess(data.message);
        localStorage.setItem('admin_login', JSON.stringify(data.data))
        this.router.navigateByUrl('/')
      } else {
        this.model.typeError(data.message);
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
}
