import { Component, OnInit, HostBinding } from '@angular/core';
import {trigger, state, style, animate, transition, query, stagger, group} from '@angular/animations'
import {CricketplayerService} from '../cricketplayer.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  animations:[
    trigger('listAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(50,[
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity:1, transform: 'none'}))
          ])
        ], {optional:true})
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            style({opacity: '*', width:'*'}),
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity:0, transform:'translateY(100px)'})),
          ]),
        ], {optional:true})
      ])
    ])
  ]
})
export class SearchBarComponent implements OnInit {
  private playerName:string;
  private names:any[];
  private numNames:any = 0;

  constructor(private cricketPlayerService:CricketplayerService) { }

  ngOnInit() {
  }

  searchPlayer():void{
    if (this.playerName == "") {this.names = null; this.numNames = -1; return; }
    this.cricketPlayerService.searchPlayer(this.playerName).subscribe(data => {
      this.names = data;
      this.numNames = this.names.length;
      if(this.numNames == 0) this.numNames = -1;
    });
  }

}
