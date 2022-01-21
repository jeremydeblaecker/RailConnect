import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private http: HttpClient) {
    this.readAPI('https://api.sncf.com/v1/coverage/sncf/stop_points/stop_point:SNCF:87753764:Train/places_nearby?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
    .subscribe((data) => {
    console.log(data);
  });
  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }
}
