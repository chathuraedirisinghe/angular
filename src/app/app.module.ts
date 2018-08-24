import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { adminLteConf } from './admin-lte.conf';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatDialog, MatSelectModule, MatDialogModule, MatButtonModule, MatCardModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { LayoutModule } from 'angular-admin-lte';

import { AppComponent } from './app.component';

import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { MapComponent } from './map/map.component';
import { MapModule } from './map/map.module';
import { HistoryComponent } from './history/history.component';
import { HistoryModule } from './history/history.module';
import { PaymentComponent } from './payment/payment.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { PaymentModule } from './payment/payment.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule.forRoot(adminLteConf),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD-YZ3R3A7Yo4-S_hGn-wc41iX1sIk8Jj4",
      authDomain: "ev-chargingstations.firebaseapp.com",
      databaseURL: "https://ev-chargingstations.firebaseio.com",
      projectId: "ev-chargingstations",
      storageBucket: "ev-chargingstations.appspot.com",
      messagingSenderId: "741002652600"  
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2jVPzAvr1lkeHy0vM_lJ67_iD3NCowF0'
    }),
    AgmDirectionModule,
    AngularFireDatabaseModule,
    LoadingPageModule, MaterialBarModule
  ],
  declarations: [
    AppComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  bootstrap: [AppComponent],
  exports: [MapModule,HistoryModule,PaymentModule,VehicleModule]
})
export class AppModule {}
