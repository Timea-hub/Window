import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard';

//import { TabsPage } from './tabs.page';

const routes: Routes = [
  {path: '', redirectTo: 'loading', pathMatch: "full"},
  {path: 'loading', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  {path: 'register',loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)},
  {path: 'tabs', loadChildren: () => import('./tabs/tabs-routing.module').then(m => m.TabsPageRoutingModule),
  canLoad: [AuthGuard]}



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
