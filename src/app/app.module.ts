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
 import { AngularFireModule } from '@angular/fire/compat'; //asta era problema data trecuta
import { AppStoreModule } from './store/AppStoreModule';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingComponent } from './components/loading/loading.component';
//import { TabsPageRoutingModule } from './tabs/tabs.page';

@NgModule({
    declarations: [
      AppComponent,
      //LoadingComponent
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        TabsPageRoutingModule,
        TabsPageModule,
        //...AppStoreModule,
        //StoreDevtoolsModule.instrument({ maxAge: 25 }),
        //AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
})
export class AppModule {}
