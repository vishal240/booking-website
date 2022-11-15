import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const contents: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact-us',
    component: ContactusComponent
  },
  {
    path: 'listing',
    component: ListingComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'hotel-details/:id',
    component: HotelDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
