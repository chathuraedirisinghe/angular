import { ChangeDetectorRef, Component, ViewChild ,Inject, ViewContainerRef, AfterViewInit, ComponentFactory, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material';
import { ApiService} from '../api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  electric_vehicles:any=[]

  public session:{}

  deviceId: string;
  deviceType: string
  status: string;
  address: string;
  buttonDisabled : boolean;

  selected: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _api:ApiService,) {
    this.deviceId = data.device_id;
    this.status =data.status
    this.address = data.location
    this.deviceType = data.charger_type
    
    if(this.status=='Busy' || this.status=='Charging' || this.status=='NA'){
      this.buttonDisabled = true;
    }else{
      this.buttonDisabled = false;
    }
    console.log(data)
   }

   selectedDevice;

   onChange(newValue) {
    this.selectedDevice = newValue.id;
  }

   onClickMe(){
    console.log(this.selectedDevice,this.deviceId)
    this.session['electric_vehicle_id'] = this.selectedDevice;
    this.session['charging_station_id'] = this.deviceId;
    this._api.chargeNow(this.session).subscribe(
      res => {
        console.log(res)
        // localStorage.setItem('user_id',res.id)
        // localStorage.setItem('token',res.token)
        // this.getUserDetails(localStorage.getItem('user_id'))
      },
      err=> console.log(err)
    )
   }

 chargeStart(){
  // this.session['electric_vehicle_id'] = this.current_vehicle;
  // this.session['charging_station_id'] = stationID;
  //this._api.chargeNow(this.session)
}

  ngOnInit() {
    this.electric_vehicles = JSON.parse(localStorage.getItem('electric_vehicles'))
  }

}
