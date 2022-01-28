import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-gare',
  templateUrl: './detail-gare.page.html',
  styleUrls: ['./detail-gare.page.scss'],
})
export class DetailGarePage implements OnInit {
  actualNav;
  destinations: any[] = [];
  data: any;
  title: any;
  id: any;
  url: any
  schedule = {
    heure: '',
    destination:''
  };

  schedules: any = [];
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient,
  ) {
    
   }

  ngOnInit() {
    this.storage.get('actualNav').then((nav) => {
      console.log('actualNav: ', nav);
      this.actualNav= nav;
    });
    this.storage.get('titreGare').then((titreGare) => {
      console.log('titreGare: ', titreGare);
      this.title = titreGare.titre;
      this.id = titreGare.id

      this.url = 'https://api.sncf.com/v1/coverage/sncf/stop_points/'+this.id+'/stop_schedules?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6'
    console.log(this.url)

    this.readAPI(this.url)
    .subscribe((data) => {
      this.data = data;
      this.data.stop_schedules.forEach(stop => {

        stop.date_times.forEach(time => {
          this.schedule.heure = time.base_date_time;
          if(time.links.length===1){
            this.schedule.destination = stop.display_informations.direction;
          }else{
            this.schedule.destination = time.links[0].id;

          }
          this.schedules.push({heure:this.schedule.heure,destination:this.schedule.destination});
          
        });
      });
      this.schedules.forEach(schedules => {
        if(schedules.destination === 'default'){
        }
        else{
        this.data.notes.forEach(notes => {
          if(notes.category ==='terminus'){
            if(notes.id===schedules.destination){
              schedules.destination=notes.value;
            }
          }
        })
      }
      });

      console.log(this.schedules);
      for (var i = 0; i < Object.keys(this.schedules).length; i++){
        this.destinations.push(this.formatDateHeure(this.schedules[i].heure, this.schedules[i].destination));
      }
      console.log("this.destinations: ", this.destinations);

    });
  
      
      
    });
  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  formatDateHeure(madate, destination){
    // Prend une date format yyyymmddThhmmss

    // console.log('maDate: ',madate);
    let tabDate: any[] = [];

    tabDate = madate.split('T');
    // console.log('maDate: ',madate);
    // console.log('tabDate[0]: ',tabDate[0]);
    // console.log('tabDate[1]: ',tabDate[1]);

    const annee = tabDate[0].substr(0,4);
    const mois = tabDate[0].substr(4,2);
    const jour = tabDate[0].substr(6);
    // console.log('annee: ',annee);
    // console.log('mois: ',mois);
    // console.log('jour: ',jour);

    const heure = tabDate[1].substr(0,2);
    const minute = tabDate[1].substr(2,2);
    // console.log('heure: ',heure);
    // console.log('minute: ',minute);
    
    const date = jour + "/" + mois + "/" + annee;
    const horaire = heure + ":" + minute;

    return { "date": date, "heure": horaire, "destination": destination }; // retourne un object avec la date et l'heure
  }

  backButton(){
    this.navCtrl.navigateRoot(this.actualNav);
  }
}
