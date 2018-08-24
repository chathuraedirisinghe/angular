import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history:Observable<any>
  
  constructor(private _api: ApiService) { }

  ngOnInit() {
    this.getHistory()
  }

  getHistory(){
    this._api.getChargingHistory(localStorage.getItem('user_id'))
    .subscribe(
      res => {
        this.history = res
      },
      err=> console.log(err)
    )
  }

}
