import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CricketplayerService {
  
  private  host:string = "http://localhost:3000/";
  private players:string = "players/";
  private search_player:string = "player_search/";
  private match_stats = "match_stats/";
  constructor(private http:HttpClient) { }

  getAllPlayers():any{
    return this.http.get(this.host + this.players);
  }

  searchPlayer(name:string): any{
    return this.http.get(this.host + this.search_player + name.replace(' ', '_'));
  }

  getPlayerStats(name:string):any{
    return this.http.get(this.host + this.match_stats + name.replace(' ', '_'));
  }
}
