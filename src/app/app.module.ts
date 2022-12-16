import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsPageRoutingModule } from './tabs/tabs-routing.module';
import { TabsPageModule } from './tabs/tabs.module';
import { TabsPage } from './tabs/tabs.page';
//import { TabsPageRoutingModule } from './tabs/tabs.page';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
       TabsPageRoutingModule,
        TabsPageModule
      ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
