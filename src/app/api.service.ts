import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map} from 'rxjs/operators';
import { Vehicle } from "./_classes/vehicle";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private  http:  HttpClient) { }

  API_URL  =  'https://api.goev.lk:2083/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

toFormData(Obj){
  let body = new URLSearchParams();
  for (let key in Obj) {
    body.set(key,Obj[key])
  }
  return body
}

loggedIn(){
  return !!localStorage.getItem('token')
}

loginUser(user){
  return this.http.post<any>(this.API_URL+'ev_owners/login/',this.toFormData(user).toString(),{
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'})
  })
}

chargeNow(session){
  return this.http.post<any>(this.API_URL+'charging_stations/init_charge/',session,{
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Token '+localStorage.getItem('token')
    })
  })
}

getUserData(id):Observable<any>{
  return this.http.get(this.API_URL+'ev_owners/'+id, {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Token '+localStorage.getItem('token')
    })
  })
}

getChargingHistory(id):Observable<any>{
  return this.http.get(this.API_URL+'ev_owners/charging_history/'+id, {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Token '+localStorage.getItem('token')})
  }).pipe(map(res => res));
}

getChargerData():Observable<any>{
  return this.http.get(this.API_URL+'charging_stations/',{
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Token '+localStorage.getItem('token')})
  }).pipe(map(res => res));
}

addVehicle(vehicle: Vehicle){
  return this.http.post(this.API_URL+'electric_vehicles/',{
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Token '+localStorage.getItem('token')})
  }).pipe(map(res => res));

}

updateVehicle(data){
  return this.http.patch(this.API_URL+'electric_vehicles/'+data.id+'/',{
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Token '+localStorage.getItem('token')})
  }).pipe(map(res => res));

}

deleteVehicle(id){
  return this.http.delete(this.API_URL+'electric_vehicles/'+id+'/',{
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Token '+localStorage.getItem('token')})
  }).pipe(map(res => res));

}


}
