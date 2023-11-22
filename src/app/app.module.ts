import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulingComponent } from './components/scheduling/scheduling.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalSchedulingComponent } from './components/modal-scheduling/modal-scheduling.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    SchedulingComponent,
    ModalSchedulingComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    FormsModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
