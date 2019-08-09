import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedditDataService {

  constructor(public http: Http) { console.log('Hello RedditData Provider'); }

  getRemoteData() {
    // return this.http.get('http://localhost/wordpress/wp-json/my-route/my-phrase').pipe(map(data => {})).subscribe(result => {
    //
    //   console.log(result);
    //           });
   return this.http.get('http://localhost/wordpress/wp-json/my-route/my-phrase').subscribe((response) => {
      console.log(response);
    });

  /* return this.http.get('http://localhost/wordpress/wp-json/my-route/my-phrase').pipe(map(res => res.json()));*/
  /*  return this.http.get('http://localhost/wordpress/wp-json/my-route/my-phrase').pipe(map(res => res.json()));*/
    }

}
