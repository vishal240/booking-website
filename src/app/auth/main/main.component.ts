import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModelService } from 'src/app/model.service';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DatePipe]
})
export class MainComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  colorTheme = 'theme-blue';
  minDate: Date;
  bsConfig?: Partial<BsDatepickerConfig>;

  checkoutForm = this.formBuilder.group({
    property_uid: ['', [Validators.required]],
    property_name: ['', [Validators.required]],
    check_in: ['', [Validators.required]],
    check_out: ['', [Validators.required]],
    check_in2: [''],
    check_out2: [''],
    adults: ['', [Validators.required]],
    children: ['', [Validators.required]],
    room_type: ['ac'],
    items_perpage: ['10'],
    current_page: ['1']
  });

  property_location: any = [];
  searchArray: any = [];
  constructor(private datePipe: DatePipe,private formBuilder: FormBuilder, public model: ModelService, public router: Router) { }

  ngOnInit(): void {
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
  setAddress(uid, name, address){
    this.checkoutForm.patchValue({
      property_uid: uid,
      property_name: name + ' ' + address
    })
    this.searchArray = [];
  }
  ngAfterViewInit() {
    // server-side search
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
  searchCustomer(){
    if(this.checkoutForm.invalid){
      this.model.typeError('Please fill required fields')
    } else {
      this.checkoutForm.patchValue({
        check_in2: this.checkoutForm.value.check_in,
        check_out2: this.checkoutForm.value.check_out,
        check_in: this.datePipe.transform(this.checkoutForm.value.check_in,"yyyy-MM-dd"),
        check_out: this.datePipe.transform(this.checkoutForm.value.check_out,"yyyy-MM-dd")
      })
      localStorage.setItem('searchData', JSON.stringify(this.checkoutForm.value));
      this.router.navigateByUrl('/home/listing')
    }
  }
}
