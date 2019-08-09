import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategorydetailsPage } from './categorydetails.page';
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  {
    path: '',
    component: CategorydetailsPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild ( routes ),
        NgxPaginationModule
    ],
  declarations: [CategorydetailsPage]
})
export class CategorydetailsPageModule {}
