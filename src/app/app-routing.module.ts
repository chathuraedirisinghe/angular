import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: '',
      component: MapComponent
    }, {
      path: 'map',
      loadChildren: './map/map.module#MapModule',
      data: {
        title: 'Map'
      }
    },{
      path: 'history',
      loadChildren: './history/history.module#HistoryModule',
      data: {
        title: 'History'
      }
    },{
      path: 'payment',
      loadChildren: './payment/payment.module#PaymentModule',
      data: {
        title: 'Payment'
      }
    },{
      path: 'vehicle',
      loadChildren: './vehicle/vehicle.module#VehicleModule',
      data: {
        title: 'Vehicle'
      }
    },
    ]
  }, {
    path: 'login',
    loadChildren: './+login/login.module#LoginModule',
    data: {
      customLayout: true
    }
  }, {
    path: 'register',
    loadChildren: './+register/register.module#RegisterModule',
    data: {
      customLayout: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
