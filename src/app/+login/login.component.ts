import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private _api: ApiService, 
    private _router: Router,
    private activatedRoute: ActivatedRoute) { }

  appNamelg='JL'
  appNamest='TripPlanner'
  
  errorMessage:string;

  loginModel:any={
    username:"",
    password:""
  };


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.errorMessage = params.session;
    });

  }

  login(event){
    let button = event.target.querySelector('button');
    this.errorMessage="";
    button.disabled=true;
    button.innerHTML="<i class='fa fa-refresh fa-spin'></i> Logging In...";
    this._api.loginUser(this.loginModel).subscribe(
      observable => {
        if (observable){
          localStorage.setItem('user_id',observable.id)
          localStorage.setItem('token',observable.token)
          this.getUserDetails(localStorage.getItem('user_id'))
        button.innerHTML="<i class='fa fa-refresh fa-spin'></i> Redirecting...";
        }else{
          this.errorMessage="Invalid Username or PIN";
          button.disabled=false;
          button.innerHTML="Log In";
        }
      }
    );
  }


  // loginUser(){
  //   this._api.loginUser(this.loginUserData)
  //   .subscribe(
  //     res => {
  //       console.log(res)
  //       localStorage.setItem('user_id',res.id)
  //       localStorage.setItem('token',res.token)
  //       this.getUserDetails(localStorage.getItem('user_id'))
  //     },
  //     err=> console.log(err)
  //   )
  // }

  getUserDetails(id){
    this._api.getUserData(id)
    .subscribe(
      res=> {
        // this.user=res

        for(let key of Object.keys(res)){
          localStorage.setItem(key,JSON.stringify(res[key]))
        }
        console.log(res)
        
        this._router.navigate([''])
      },
      err => console.log(err)
    )
  }

}
