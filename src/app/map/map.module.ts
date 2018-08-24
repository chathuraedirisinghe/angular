import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
    AgmCoreModule,
    AgmDirectionModule
  ],
  declarations: [MapComponent],
})
export class MapModule { }
