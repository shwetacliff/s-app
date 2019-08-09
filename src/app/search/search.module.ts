import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  {
    path: '',
    component: SearchPage
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
  declarations: [SearchPage]
})
export class SearchPageModule {}
