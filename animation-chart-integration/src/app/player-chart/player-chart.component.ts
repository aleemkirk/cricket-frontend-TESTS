import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CricketplayerService} from '../cricketplayer.service';
import {DateHandler, MatchStats} from '../../../src/customClasses';
import * as CanvasJS from '../../../CanvasJS/canvasJS.min';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-player-chart',
  templateUrl: './player-chart.component.html',
  styleUrls: ['./player-chart.component.css']
})
export class PlayerChartComponent implements OnInit {
  private playerMatchStats: MatchStats[];
  private points:{x: Date, y:number, venue:string}[];
  private playerName:string;
  private scaler:number = 10;

  constructor(private cricketPlayerService: CricketplayerService, private router:Router, private route:ActivatedRoute, private dateHandler:DateHandler) {
    this.playerMatchStats = [];
    this.points = [];
    this.playerName = '';
   }

  ngOnInit() {
    this.route.paramMap.subscribe( (params:ParamMap) => {
      this.playerName = params.get('name').replace('_',' ');;
      this.cricketPlayerService.getPlayerStats(this.playerName).subscribe(data => {
        //-->Callback Starts Here
        //-->Create Graph
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          zoomEnabled: true,
          exportEnabled: true,
          title: {
            text: this.playerName+" Batting Match Data"
          },
          data: [{
            type: "scatter",
            toolTipContent: "<span style=\"color:#4F81BC \"><b>Venue:</b> {venue} <br><b>Date:</b> {x} <br/><b> Total Runs:</b></span> {y}",
            dataPoints: []
          }]
        });
        //-->Creating Graph Points
        this.playerMatchStats = data;
        for(var i = 0; i<this.playerMatchStats.length; i++){
          this.dateHandler.genDate(this.playerMatchStats[i].date, (date)=>{
            this.playerMatchStats[i].date = new Date(date['year'], date['month'], date['day']);
            this.playerMatchStats[i].venue = this.playerMatchStats[i].venue.replace('/', '\'');
            this.points.push({x:new Date(date['year'], date['month'], date['day']),
              y:this.playerMatchStats[i].total_runs,
              venue: this.playerMatchStats[i].venue});
            //-->Sorting points and playerMatchStats array and render chart only when all dates are pushed into points array
            if(i==this.playerMatchStats.length-1){
              this.points.sort((a, b) =>{
                return a.x < b.x ? -1 : 1;
              });
              this.playerMatchStats.sort((a, b) =>{
                return a.date < b.date ? -1 : 1;
              });
              chart.options.data[0].dataPoints = this.points;
              chart.render();
            } 
          });
        };
      });
    });
  }

}
