import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page';
import { PagesRoutingModule } from '../Pages/pages-routing.module';

const routes: Routes = [
  {
    path: '', component: AuthPage,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PagesRoutingModule,
  ],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {}
