import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, group, animateChild } from '@angular/animations';
import {CricketPlayerService} from './cricket-player.service';
import {Observable} from 'rxjs';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('routerAnimations', [
      transition('searchPage <=> playerInfoPage',[
        style({ position:'relative'}),
        query(':enter, :leave', [
          style({
            position:'absolute',
            top:0,
            left:0,
            width:'100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild(), {optional:true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%'}))
          ], {optional:true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ], {optional:true})
        ]),
        query(':enter', animateChild(), {optional:true}),
      ]),
      transition('* <=> playerInfoPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        query(':leave', animateChild(), {optional:true}),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ left: '100%'}))
          ], {optional:true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ], {optional:true})
        ]),
        query(':enter', animateChild(), {optional:true}),
      ])
    ])
  ]
})
export class AppComponent {
  @HostBinding('@.disabled') public animationsDisabled = false;

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
