import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPage } from './auth.page';

import { AuthPageRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { PagesModule } from '../Pages/pages.module';
import { SplashComponent } from '../Pages/splash/splash.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    PagesModule,
    ReactiveFormsModule,
    RouterModule,
    provideAuth(() => getAuth()),
    ToastrModule,
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
