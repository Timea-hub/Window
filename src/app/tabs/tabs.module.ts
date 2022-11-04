import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

// const routes: Routes = {
//   path: '',
//   component: TabsPages
// }

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule

  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
