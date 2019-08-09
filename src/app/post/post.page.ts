import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { RedditDataService } from '../provider/reddit-data.service';
import { DatePipe } from '@angular/common';
import {json} from '@angular-devkit/core';
import {count, map} from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  users: any = []
  data: any = []
  date: any = []
  tvalue: any = {}
  hideButton = true;
  search = "";
  hidePagination = true;
  p: any;

  constructor(public navCtrl: NavController, public redditService: RedditDataService,
              public datepipe: DatePipe, public http: Http, public  paginate: NgxPaginationModule) {
    this.http.get ( 'http://rashtriyashiksha.com/wp-json/custom/v1/all-posts' ).map ( res => res.json () ).subscribe ( data => {
      console.log ( data );
      if (this.hideButton || this.hidePagination) {
        this.hideButton = false;
        this.hidePagination = true;
      }
      this.data = data;
      this.tvalue = this.data.length;
      console.log ( data[0].category_name );
    } );
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log ( 'This is Post page' );
  }


  async searchPost() {

    console.log ( this.search );
    // tslint:disable-next-line:no-conditional-assignment
    if (this.search != '') {
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
      alert.present ();
    }
  }
}
