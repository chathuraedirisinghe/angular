import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { Observable } from 'rxjs';
import { Vehicle } from "../_classes/vehicle";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  addForm: FormGroup
  vehicles:Vehicle[]

  constructor(private _api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      regno: ['', Validators.required],
      model: ['', Validators.required],
      vin: ['', Validators.required],
      year: ['', Validators.required],
      capacity:[]
    });

    this.vehicles = JSON.parse(localStorage.getItem('electric_vehicles'))
  }

  deleteVehicle(vehicle: Vehicle): void {
    this._api.deleteVehicle(vehicle.id)
      .subscribe( data => {
        this.vehicles = this.vehicles.filter(u => u !== vehicle);
      })
    this._api.getUserData(localStorage.getItem('user_id'))
      .subscribe(
        res=> {
          for(let key of Object.keys(res)){
            localStorage.setItem(key,JSON.stringify(res[key]))
          }
        },
        err => console.log(err)
      )
  }

  editVehicle(vehicle: Vehicle): void {
    
  };
  
  onSubmit() {
    console.log(this.addForm.value)
    // this._api.addVehicle(this.addForm.value)
    // .subscribe( data => {
    //   console.log(data)
    // });
  }

}
