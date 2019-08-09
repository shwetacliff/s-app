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
  selector: 'app-postdetails',
  templateUrl: './postdetails.page.html',
  styleUrls: ['./postdetails.page.scss'],
})
export class PostdetailsPage implements OnInit {
  localData: any = []
  p: any;
  date: any;
  data: any = []
  hidePagination = true;
  search ="";
  constructor(public navCtrl: NavController, public redditService: RedditDataService, public datepipe: DatePipe, public http: Http, private router: Router)  {
    this.localData = JSON.parse(localStorage.getItem('postData'));

    console.log((this.localData));

  }

  ngOnInit() {
  }
  async  searchPost() {

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
