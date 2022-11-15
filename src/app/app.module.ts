import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './auth/home/home.component';
import { HeaderComponent } from './auth/header/header.component';
import { FooterComponent } from './auth/footer/footer.component';
import { AboutComponent } from './auth/about/about.component';
import { ContactusComponent } from './auth/contactus/contactus.component';
import { ListingComponent } from './auth/listing/listing.component';
import { HotelDetailsComponent } from './auth/hotel-details/hotel-details.component';
import { CheckoutComponent } from './auth/checkout/checkout.component';
import { ConfirmationComponent } from './auth/confirmation/confirmation.component';
import { MainComponent } from './auth/main/main.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationComponent } from './auth/app-pagination/app-pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactusComponent,
    ListingComponent,
    HotelDetailsComponent,
    CheckoutComponent,
    ConfirmationComponent,
    MainComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
