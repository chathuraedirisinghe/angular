import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public customLayout: boolean;
  appNamelg='JL'
  appNamest='TripPlanner'

  constructor(
    private layoutService: LayoutService,
    private _firedb: AngularFireDatabase

  ) {}

  ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });
  }

  updateChargerData(){
    this._firedb.list('charging_sessions/' + localStorage.getItem('userid')).snapshotChanges()
    .subscribe((items => {
      return items.map(a => {
        const value = a.payload.val();
        const key = a.payload.key;
        console.log (key, value)
        // this.findAndReplace(this.charger, key, value)
      });
    }));
  }
}
