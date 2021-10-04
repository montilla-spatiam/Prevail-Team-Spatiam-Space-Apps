import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { DataService } from './services/data.service';
import { CookieService } from './services/cookie.service';
import { HeaderComponent } from './header/header.component';
import { MissionLogsComponent } from './mission-logs/mission-logs.component';
import { MatTableModule } from '@angular/material/table';
import { MenuBarComponent } from './mission-logs/menu-bar/menu-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EntryDetailsComponent } from './mission-logs/entry-details/entry-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    MissionLogsComponent,
    MenuBarComponent,
    EntryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [
    DataService,
    CookieService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
