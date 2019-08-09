import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryPage } from '../category/category.page';
import {json} from '@angular-devkit/core';
import {count, map} from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.page.html',
  styleUrls: ['./categorydetails.page.scss'],
})
export class CategorydetailsPage implements OnInit {
  localData: any = []
  p: any;
  date: any;
  data: any = []
   hidePagination = true;
  postParams = {"postid": "" ,"cat_id" : ""};
  search = "";
  constructor(public navCtrl: NavController, public http: Http, public datepipe: DatePipe , private router: Router) {
    this.localData = JSON.parse(localStorage.getItem('userData'));
    console.log((this.localData));
    this.localData.date = new Date ();
    this.date = this.datepipe.transform ( this.localData.date, 'MMM dd,yyyy' );

  }

  ngOnInit() {
  }

  // tslint:disable-next-line:variable-name
  getPostById(postid: any, cat_id: any) {
    console.log(postid);
    console.log('this is details page');
    this.postParams.postid = postid;
    this.postParams.cat_id = cat_id;
    console.log(this.postParams);
     this.http.post('http://rashtriyashiksha.com/wp-json/custom/v1/get-post-by-post-id', JSON.stringify(this.postParams)).map( res => res.json()).subscribe( data => {
      this.data = data;
         console.log((this.data.post_content));
        localStorage.setItem('postData', JSON.stringify(this.data) );
        this.navCtrl.navigateForward('postdetails');
    });
  }


  async searchPost() {

    console.log ( this.search );
    // tslint:disable-next-line:no-conditional-assignment
    if ( this.search != '') {
      // tslint:disable-next-line:max-line-length
      this.http.get ( 'http://rashtriyashiksha.com/wp-json/wp/v2/posts?search=' + this.search ).map ( res => res.json () ).subscribe ( data => {
        this.data = data;
        localStorage.setItem ( 'userData', JSON.stringify ( this.data ) )
        console.log ( this.data );
        this.navCtrl.navigateForward ( 'search' );
      } );
    } else {
      // @ts-ignore
      // @ts-ignore
      // @ts-ignore
      const alert = await this.alertCtrl.create ( {
        message: 'No text Found',
        subHeader: 'Please Enter The Text ',
        buttons: ['OK']
      } as any );
      alert.present();
    }
  }
}
