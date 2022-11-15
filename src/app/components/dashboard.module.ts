import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PaginationComponent } from 'src/app/shared/components/app-pagination/app-pagination.component'
import { NgxMaskModule, IConfig  } from 'ngx-mask';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    DefaultComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    BsDatepickerModule.forRoot(),
    DashboardRoutingModule, NgxDropzoneModule, NgxMaskModule.forRoot(),
  ]
})
export class DashboardModule { }
