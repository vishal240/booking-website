import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public router: Router) { }
  currentUserRoom: any = [];
  searchData: any;
  diffDays: any;

  allAmount: any = [];
  totalAmount: any = 0;
  gstAmount: any = 0;
  grandTotal: any = 0;
  rooms_and_extra_beds: any = [];
  ngOnInit(): void {
    this.totalAmount = 0;
    this.currentUserRoom = JSON.parse(localStorage.getItem('currentUserRoom'));
    if(!this.currentUserRoom){
      this.router.navigateByUrl('/');
    }

    if(!this.currentUserRoom){
      this.currentUserRoom = [];
    }
    this.searchData = JSON.parse(localStorage.getItem('searchData'));
    if(!this.searchData){
      this.searchData = [];
    }
    if(this.searchData){
      var date1:any = new Date(this.searchData.check_in);
      var date2:any = new Date(this.searchData.check_out);
      this.diffDays = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    }

    for (const key in this.currentUserRoom) {
      this.currentUserRoom[key].extra_bed = 0
    }
    this.allAmount = [];
    for (let i = 0; i < this.currentUserRoom.length; i++) {
      this.allAmount.push(parseInt(this.currentUserRoom[i].room_charge) + (0 * parseInt(this.currentUserRoom[i].room_extrabedcharge)))
    }
    for (let i = 0; i < this.allAmount.length; i++) {
      this.totalAmount += this.allAmount[i];
    }

    this.gstAmount = (this.totalAmount * 5 / 100) + this.totalAmount ;
    this.grandTotal = (this.gstAmount-this.totalAmount) +  this.gstAmount;
  }
  removeItem(i,room_uid){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this item",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.currentUserRoom.splice(i, 1);
        localStorage.setItem('currentUserRoom', JSON.stringify(this.currentUserRoom));
        if(this.currentUserRoom.length>0){
          this.ngOnInit()
        } else {
          this.router.navigateByUrl('/');
    }
      }
    })


  }
  addExtraBed(e,i){
    this.currentUserRoom[i].extra_bed=parseInt(e.target.value);
    this.allAmount = [];
    for (let i = 0; i < this.currentUserRoom.length; i++) {
      this.allAmount.push(parseInt(this.currentUserRoom[i].room_charge) + (parseInt(this.currentUserRoom[i].extra_bed) * parseInt(this.currentUserRoom[i].room_extrabedcharge)))
    }
    this.totalAmount = 0;
    for (let i = 0; i < this.allAmount.length; i++) {
      this.totalAmount += this.allAmount[i];
    }

    this.gstAmount = (this.totalAmount * 5 / 100) + this.totalAmount ;
    this.grandTotal = (this.gstAmount-this.totalAmount) +  this.gstAmount;
  }
  getTotalAmount(a,b,c){
    return parseInt(a) + (parseInt(b)*parseInt(c))
  }
  cancelBooking(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this card",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('searchData');
        localStorage.removeItem('currentUserRoom');
        this.router.navigateByUrl('/');
      }
    })
  }
}
