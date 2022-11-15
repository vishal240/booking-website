import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModelService } from 'src/app/model.service';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [DatePipe]
})
export class ListingComponent implements OnInit {
  searchData: any;
  getAllProperty: any = [];
  searchValue: any;
  totalPages: number = 0;

  @ViewChild('input') input: ElementRef;
  colorTheme = 'theme-blue';
  minDate: Date;
  bsConfig?: Partial<BsDatepickerConfig>;

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
  roomData: any = [];
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, public model: ModelService, public router: Router) { }

  ngOnInit(): void {
    this.searchData = JSON.parse(localStorage.getItem('searchData'));
    this.roomData = JSON.parse(localStorage.getItem('currentUserRoom'));
    console.log(this.roomData)
    if(!this.roomData){
      this.roomData = []
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
      console.log(this.checkoutForm.value)
    }

    this.minDate = new Date();
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.model.common_api('customergetallactiveproperties', {}).subscribe((data: any)=> {
      console.log(data);
      if(data.status==1){
        this.property_location = data.data;
        console.log(this.property_location)
      } else {
        this.model.typeError(data.message);
      }
    }, (err: any) => {
      this.model.typeError('System generated errors');
    })
  }
  addData(item, i){
    this.roomData.push(item)
    localStorage.setItem('currentUserRoom', JSON.stringify(this.roomData));
    this.getAllProperty[i].isbooked = true;
  }
  removeItem(i,room_uid){
    var search1 = new RegExp(room_uid , 'i');
    var newdata = [];
    newdata = this.roomData.filter((item: any, i) => {
      if(search1.test(item.room_uid)){
          this.roomData.splice(i, 1);
          localStorage.setItem('currentUserRoom', JSON.stringify(this.roomData));
          this.displayActivePage(0)
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
      this.searchData = JSON.parse(localStorage.getItem('searchData'));
      this.displayActivePage(0)
    }
  }
  setAddress(uid, name, address){
    this.checkoutForm.patchValue({
      property_uid: uid,
      property_name: name + ' ' + address
    })
    this.searchArray = [];
  }
  ngAfterViewInit() {
  fromEvent(this.input.nativeElement,'keyup')
      .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          tap((text) => {
            var search = new RegExp(this.input.nativeElement.value , 'i');
            this.searchArray = this.property_location.filter(item => search.test(item.property_address));
          })
      )
      .subscribe();
  }
  displayActivePage(activePageNumber: number): void {
    if (!this.searchValue) {
      this.model.common_api('customersearchrooms', this.searchData).subscribe((data: any)=> {
        console.log(data);
        this.getAllProperty = [];
        this.totalPages = 0
        if(data.status==1){
          this.getAllProperty = data.data;
          this.totalPages= data.total
          for (const i in this.getAllProperty) {
            this.getAllProperty[i].isbooked = false;
          }

        let combined2 = this.roomData.map(item => ({
          articles: this.getAllProperty.filter((f, i) => {
            if(f.room_uid == item.room_uid){
              this.getAllProperty[i].isbooked = true;
            }
          })
        }));
        }

      }, (err: any) => {
        this.model.typeError('System generated errors');
      })
    }
  }
}
