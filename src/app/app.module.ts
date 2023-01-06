import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsPageRoutingModule } from './tabs/tabs-routing.module';
import { TabsPageModule } from './tabs/tabs.module';
import { TabsPage } from './tabs/tabs.page';
import { environment } from 'src/environments/environment';
//import { AngularFireModule } from '@angular/fire';
//import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStoreModule } from 'src/store/AppStoreModule';
//import { StoreDevtools } from '@ngrx/store-devtools';
import { StoreDevtoolsModule } from '@ngrx/store-devtools/src';
import { LoadingPageModule } from "./pages/loading/loading.module";
import { LoadingComponent } from './components/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { TabsPageRoutingModule } from './tabs/tabs.page';

@NgModule({
    declarations: [
      AppComponent,
      LoadingComponent],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        CommonModule,
        FormsModule,
        //      AngularFireModule.initializeApp(environment.firebaseConfig),
        TabsPageRoutingModule,
        TabsPageModule,
        ...AppStoreModule,
        StoreDevtoolsModule.instrument({ maxAge: 25 }),
        LoadingPageModule,
        BrowserAnimationsModule
    ]
})
export class AppModule {}
