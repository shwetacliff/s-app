import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { RedditDataService } from '../provider/reddit-data.service';
import { PostPage } from '../post/post.page';
import { DatePipe } from '@angular/common';
import {json} from '@angular-devkit/core';
import {count, map} from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  users: any = []
  data: any = []
  category: any = []
  date: any = []
  tvalue: any = {}
  hideButton = true;
  hidePagination = true;
  collection = [];
  p: any;
  catid: any;
  postParams = {"id": ""};
   search ="";
  constructor(public navCtrl: NavController, public redditService: RedditDataService, public datepipe: DatePipe, public http: Http,private router: Router) {
    this.http.get('http://rashtriyashiksha.com/wp-json/custom/v1/get-category').map(res => res.json()).subscribe(data => {
      console.log(data);

      this.data = data;
      this.category = this.data.category_id;
      console.log(data[0].category_name);
    });
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
      }

  getPostDetails(id: any) {

    this.postParams.id = id;

    console.log(this.postParams);
    this.http.post('http://rashtriyashiksha.com/wp-json/custom/v1/get-post-by-category', JSON.stringify(this.postParams)).map( res => res.json()).subscribe( data => {
      this.data = data;
      localStorage.setItem('userData', JSON.stringify(this.data) )
      console.log(data);
      this.navCtrl.navigateForward('categorydetails');
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

