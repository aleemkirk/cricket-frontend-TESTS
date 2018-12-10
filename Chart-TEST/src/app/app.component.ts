import { Component } from '@angular/core';
import {CricketPlayerService} from './cricket-player.service';
import {Observable} from 'rxjs';
import * as CanvasJS from '../../CanvasJS/canvasjs.min';
import {DateHandler, MatchStats} from '../../src/customClasses';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private allPlayerNames:any[];
  private playerMatchStats: MatchStats[];
  private points:{x: Date, y:number, venue:string}[];
  private playerName:string;
  private scaler:number = 10;

  constructor(private cricketPlayerService: CricketPlayerService, private dateHandler: DateHandler){
    this.allPlayerNames = [];
    this.playerMatchStats = [];
    this.points = [];
    this.playerName = 'S Randiv';
  }

  ngOnInit() {
    
    this.cricketPlayerService.getPlayerStats(this.playerName).subscribe(data =>{
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
      } 
    });
    

    //-->generate graph after we get information. We have to put this inside the callback function
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
        dataPoints: this.points
      }]
    });
    chart.render();
    }
  
}
