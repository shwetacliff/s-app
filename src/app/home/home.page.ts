import { Component  } from '@angular/core';
import { NavController, AlertController , ToastController} from '@ionic/angular';
import { Toast } from '@ionic-native/toast';
import { Http } from '@angular/http';
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
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users: any = []
  data: any = []
  date: any = []
    tvalue: any = {}
    hideButton = true;
    hidePagination = true;
    collection = [];
    p: any;
    search = "";
    postParams = {"id": ""};
    emailParams = {"email": ""};
    postsParams = {"postid": "" ,"cat_id" : ""};
    email ="";
  constructor(public navCtrl: NavController, public redditService: RedditDataService, public datepipe: DatePipe, public http: Http,  public alertCtrl: AlertController) {
         if (this.hidePagination) {
          this.hidePagination = false;
         }

        this.http.get('http://rashtriyashiksha.com/wp-json/my-route/my-phrase').map(res => res.json()).subscribe(data => {
          console.log(data);

          this.data = data;
          console.log(data[0].category_name);
            this.users.date = new Date();
            this.date = this.datepipe.transform(this.users.date, 'MMM dd,yyyy');
      });


  }
   ionViewDidLoad() {
   // this.redditService.getRemoteData();
      const users = this.redditService.getRemoteData();
      this.users = users;
      console.log(this.users);
      this.users.date = new Date();
      this.date = this.datepipe.transform(this.users.date, 'MMM dd,yyyy');
       }

       getAllPost() {
        this.navCtrl.navigateForward('post');
       }
    getPostById(postid: any) {
        console.log(postid);
        console.log('this is details page');
        this.postsParams.postid = postid;
        console.log(this.postsParams);
        this.http.post('http://rashtriyashiksha.com/wp-json/custom/v1/get-post-by-post-id', JSON.stringify(this.postsParams))
            .map( res => res.json()).subscribe( data => {
            this.data = data;
            console.log((this.data.post_content));
            localStorage.setItem('postData', JSON.stringify(this.data) );
            this.navCtrl.navigateForward('postdetails');
        });
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

    async  searchPost() {

           console.log ( this.search );
           // tslint:disable-next-line:no-conditional-assignment
           if ( this.search != '') {
               // tslint:disable-next-line:max-line-length
           this.http.get ( 'http://rashtriyashiksha.com/wp-json/wp/v2/posts?search=' + this.search ).map ( res => res.json () ).subscribe ( data => {
               this.data = data;
               localStorage.setItem ( 'userData', JSON.stringify( this.data ) )
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

    async subscribeEmail() {
        console.log ( this.email );
        // @ts-ignore
        this.emailParams.email = this.email;

        const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (this.email != '') {
            if (regexEmail.test(this.email)) {
                this.http.post ( 'http://rashtriyashiksha.com/wp-json/custom/v1/get-subscriber-email', JSON.stringify ( this.emailParams ) )
                    .map ( res => res.json () ).subscribe ( data => {
                    this.data = data;
                    localStorage.setItem ( 'userData', JSON.stringify ( this.data ) )
                    console.log ( this.data );
                    this.navCtrl.navigateForward ( 'thankyou' );

                } );
            } else {
                const alert = await this.alertCtrl.create ( {
                    message: 'Invalid mail id',
                    subHeader: 'Please Enter Valid Email Id ',
                    buttons: ['OK']
                } as any );
                alert.present();
            }
        } else {
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            const alert = await this.alertCtrl.create ( {
                message: 'No Email Id Found',
                subHeader: 'Please Enter The Email Id ',
                buttons: ['OK']
            } as any );
            alert.present();
        }

    }
}
