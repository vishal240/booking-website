import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import {PaginationComponent} from './app-pagination.component';

@NgModule({
    declarations: [
        PaginationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule
{
}
