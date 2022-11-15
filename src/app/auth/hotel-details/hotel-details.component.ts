import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModelService } from 'src/app/model.service';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
  providers: [DatePipe]
})
export class HotelDetailsComponent implements OnInit {
  room_uid: any;
  roomDetails: any;

  checkoutForm = this.formBuilder.group({
    property_uid: ['', [Validators.required]],
    property_name: ['', [Validators.required]],
    check_in: [''],
    check_out: [''],
    check_in2: [new Date, [Validators.required]],
    check_out2: [new Date, [Validators.required]],
    adults: ['', [Validators.required]],
    children: ['', [Validators.required]],
    room_type: ['ac'],
    items_perpage: ['10'],
    current_page: ['1']
  });

  property_location: any = [];
  searchArray: any = [];
  searchData: any;
  getAllProperty: any = [];
  searchValue: any;
  totalPages: number = 0;

  @ViewChild('input') input: ElementRef;
  colorTheme = 'theme-blue';
  minDate: Date;
  bsConfig?: Partial<BsDatepickerConfig>;
  roomData: any = [];
  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, public model: ModelService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.searchData = JSON.parse(localStorage.getItem('searchData'));
    this.roomData = JSON.parse(localStorage.getItem('currentUserRoom'));
    if(!this.roomData){
      this.roomData = [];
    }
    if(this.searchData){
      this.checkoutForm.patchValue({
        adults: this.searchData.adults,
        check_in: this.searchData.check_in,
        check_in2: new Date(this.searchData.check_in2),
        check_out: this.searchData.check_out,
        check_out2: new Date(this.searchData.check_out2),
        children: this.searchData.children,
        current_page: this.searchData.current_page,
        items_perpage: this.searchData.items_perpage,
        property_name: this.searchData.property_name,
        property_uid: this.searchData.property_uid,
        room_type: this.searchData.room_type
      })
    }

    this.route.params.subscribe(params => {
      if(params['id']) {
        this.room_uid = params['id'];
        var search1 = new RegExp(this.room_uid , 'i');
        if(this.roomData){
          if(this.roomData.length>0){
            this.searchArray = this.roomData.filter(item => search1.test(item.room_uid));
          } else {
            this.searchArray = [];
          }
        }


        this.model.common_api('customergetroom', {
          room_uid: this.room_uid
        }).subscribe((data: any)=> {
          console.log(data);
          if(data.status==1){
            this.roomDetails = data.data[0]
          }

        }, (err: any) => {
          this.model.typeError('System generated errors');
        })
      }
    });
  }
  removeItem(room_uid){
    var search1 = new RegExp(room_uid , 'i');
    var newdata = [];
    newdata = this.roomData.filter((item: any, i) => {
      if(search1.test(item.room_uid)){
          this.roomData.splice(i, 1);
          localStorage.setItem('currentUserRoom', JSON.stringify(this.roomData));
          this.ngOnInit();
      }
    });
  }
  searchCustomer(){
    if(this.checkoutForm.invalid){
      this.model.typeError('Please fill required fields')
    } else {
      this.checkoutForm.patchValue({
        check_in: this.datePipe.transform(this.checkoutForm.value.check_in2,"yyyy-MM-dd"),
        check_out: this.datePipe.transform(this.checkoutForm.value.check_out2,"yyyy-MM-dd")
      })
      localStorage.setItem('searchData', JSON.stringify(this.checkoutForm.value));
      if(this.searchArray.length>0){
        this.router.navigateByUrl('/home/checkout')
      } else {
        this.roomData.push(this.roomDetails)
        localStorage.setItem('currentUserRoom', JSON.stringify(this.roomData));
        this.ngOnInit()
      }
    }
  }
}
