import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-gare',
  templateUrl: './detail-gare.page.html',
  styleUrls: ['./detail-gare.page.scss'],
})
export class DetailGarePage implements OnInit {
  actualNav;

  data : any;
  heure : string;

  schedule = {
    heure: '',
    destination:''
  };

  schedules : any = []
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.storage.get('actualNav').then((nav) => {
      console.log('actualNav: ', nav);
      this.actualNav= nav;
    });

    this.readAPI('https://api.sncf.com/v1/coverage/sncf/stop_points/stop_point:SNCF:87751404:Train/stop_schedules?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
    .subscribe((data) => {
      this.data = data;
      this.data.stop_schedules.forEach(stop => {
        
        stop.date_times.forEach(time => {
          this.schedule.heure = time.base_date_time;
          if(time.links.length===1){
            this.schedule.destination = 'Marseille Saint-Charles'
          }else{
            switch (time.links[0].id) {
              case 'destination:8706567661659224554':
                this.schedule.destination = 'Briançon'
                break;
              case 'destination:5547075821219132384':
                this.schedule.destination = 'Pertuis'
                break;
              case 'destination:3437088451011971465':
                this.schedule.destination = 'Sisteron'
                break;
              case 'destination:2358122872950142815':
                this.schedule.destination = 'Gap'
                break;

              default:
                break;
            }
            
          }
          this.schedules.push({heure:this.schedule.heure,destination:this.schedule.destination})
        });

        
      });
      console.log(this.schedules)
    });
  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  backButton(){
    this.navCtrl.navigateForward(this.actualNav);
  }
}
