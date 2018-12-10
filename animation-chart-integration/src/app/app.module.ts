import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PlayerChartComponent } from './player-chart/player-chart.component';
import {CricketplayerService} from './cricketplayer.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {DateHandler} from '../../src/customClasses';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PlayerChartComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:SearchBarComponent, data:{animation:'searchPage'}},
      {path:'player-chart/:name', component:PlayerChartComponent, data:{animation:'playerChart'}},
      {path:'player-chart', component:NotFoundComponent, data:{animation:'playerChart'}}
    ])
  ],
  providers: [CricketplayerService, DateHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
