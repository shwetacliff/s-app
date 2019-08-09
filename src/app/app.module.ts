import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { PostPage } from './post/post.page';
import { CategoryPage } from './category/category.page';
import { HttpModule, Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ BrowserModule, HttpModule, IonicModule.forRoot(), AppRoutingModule, NgxPaginationModule],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
