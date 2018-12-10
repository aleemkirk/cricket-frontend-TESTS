import { Component } from '@angular/core';
import {CricketPlayerService} from './cricket-player.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public names:Observable<any[]>;
  private playerNames:any[];
  private searchBar:string;
  private playerName:string;
  private stats:Observable<any[]>;
  private matchStats: any[];

  constructor(private cricketPlayerService: CricketPlayerService){}

  ngOnInit(){}

  searchPlayer(){
    this.playerNames = [];
    if(this.searchBar == "") return;
    this.names = this.cricketPlayerService.searchPlayer(this.searchBar);  //need to assign the observable to a variable first before we subscribe to it!!
    this.names.subscribe(data =>{
      this.playerNames = data;
    });
  }

  updateMatchStats(){
    this.matchStats = null;
    if (this.playerName == '') return;
    this.stats = this.cricketPlayerService.getPlayerStats(this.playerName);
    this.stats.subscribe(data =>{
      this.matchStats = data;
      console.log(this.matchStats);
    });
  }

  onClick(obj){
    this.playerName = obj.Name;
    this.updateMatchStats();
  }

}
