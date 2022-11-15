import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {

  admin_login: any;
  dashboardDtails: any ;
  constructor(public model: ModelService) { }
  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
    this.model.common_api('adminadashboard', {
      admin_uid: this.admin_login.admin_uid
    }).subscribe((data: any)=> {
      console.log(data)
      if(data.status==1){
        this.dashboardDtails = data.data;
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
}
