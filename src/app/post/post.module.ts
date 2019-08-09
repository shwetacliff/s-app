import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostPage } from './post.page';
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  {
    path: '',
    component: PostPage
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
  declarations: [PostPage]
})
export class PostPageModule {}
