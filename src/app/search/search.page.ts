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
import { Location } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  localData: any = []
  p: any;
  date: any;
  data: any = []
  hidePagination = true;
    postParams = {"postid": "" ,"cat_id" : ""};
    search ="";
  constructor(public navCtrl: NavController, public redditService: RedditDataService,
              public datepipe: DatePipe, public http: Http, private router: Router, private location: Location)  {
    this.localData = JSON.parse(localStorage.getItem('userData'));

    console.log(this.localData);
     this.localData.date = new Date();
    this.date = this.datepipe.transform(this.localData.date, 'MMM dd,yyyy');

  }

  ngOnInit() {

  }

  getPostById(id: any, categories: any) {
   
      console.log(id);
     // console.log('id');
      this.postParams.postid = id;
      this.postParams.cat_id = categories;
      console.log(this.postParams);
      this.http.post('http://rashtriyashiksha.com/wp-json/custom/v1/get-post-by-post-id', JSON.stringify(this.postParams)).map( res => res.json()).subscribe( data => {
        this.data = data;
        console.log((this.data.post_content));
        localStorage.setItem('postData', JSON.stringify(this.data) );
        this.navCtrl.navigateForward('postdetails');
      });
  
  }
    goBackToPreviousPage() {
        this.navCtrl.pop();
    }
    async  searchPost() {

      //  console.log ( this.search );
        // tslint:disable-next-line:no-conditional-assignment
        if (this.search != '') {
            // tslint:disable-next-line:max-line-length
            this.http.get ( 'http://rashtriyashiksha.com/wp-json/wp/v2/posts?search=' + this.search ).map ( res => res.json () ).subscribe ( data => {
                this.data = data;
                localStorage.setItem ( 'userData', JSON.stringify ( this.data ) )
                console.log ( this.data );
                location.reload();
               // this.navCtrl.navigateRoot('search');

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
