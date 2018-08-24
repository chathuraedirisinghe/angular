import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Charger  } from '../_classes/charger';
import {} from './icons'

import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

declare var require: any

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  charger : Charger[]=[]
  zoom: number = 12
  current_lat: number
  current_lng: number

  public origin: {}
  public destination: {}

  

  DCA=require('./icons/dcA.png'); 
  DCB=require('./icons/dcB.png');
  DCN=require('./icons/dcN.png');
  ACA=require('./icons/acA.png');
  ACB=require('./icons/acB.png');
  ACN=require('./icons/acN.png');

  constructor(private _api:ApiService, 
    private _firedb:AngularFireDatabase,
    public dialog: MatDialog) {

   }

   getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
  }

  markerIconUrl(type,status) {
    if(type=='DC' && status=='Available'){
      return this.DCA
    }else if(type=='DC' && status=='Busy'){
      return this.DCB
    }else if(type=='DC' && status=='Charging'){
      return this.DCB
    }else if(type=='DC' && status=='NA'){
      return this.DCN
    }else if(type=='AC' && status=='Available'){
      return this.ACA
    }else if(type=='AC' && status=='Busy'){
      return this.ACB
    }else if(type=='AC' && status=='Charging'){
      return this.ACB
    }else if(type=='AC' && status=='NA'){
      return this.ACN
    }
    // return require(url)
  }

  myIconUrl(){
    return require('./icons/current.png')
  }


   openDialog(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log("Dialog was closed")
      // console.log(result)
    });
  }

  ngOnInit() {
    this.trackMe()
    this.getChargerData()
    this.updateChargerData()
  }

  trackMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { 
        console.log("Got position", position.coords.latitude, position.coords.longitude )
        this.current_lat = +position.coords.latitude
        this.current_lng = +position.coords.longitude
      })
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  getChargerData(){
    this._api.getChargerData()
    .subscribe(
      res => {
        for (let instance of res) {
          instance.lat = +instance.lat
          instance.lng = +instance.lng
          // instance.maximum_power = +instance.maximum_power
          // instance.minimum_power = +instance.minimum_power
        }
        this.charger= res
        console.log(res)
      },
      err=> console.log(err)
    )
  }

  

  updateChargerData(){
    this._firedb.list('/charging_stations').snapshotChanges()
    .subscribe((items => {
      return items.map(a => {
        const value = a.payload.val();
        const key = a.payload.key;
        // console.log (key, value)
        this.findAndReplace(this.charger, key, value)
      });
    }));
  }

  

  findAndReplace(object, value, replacevalue) {
    for (var x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] == 'object') {
          this.findAndReplace(object[x], value, replacevalue);
        }
        if (object[x] == value) { 
          object["status"] = replacevalue;
          // break; // uncomment to stop after first replacement
        }
      }
    }
  }
}
