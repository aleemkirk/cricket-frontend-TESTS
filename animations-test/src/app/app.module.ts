import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {CricketPlayerService} from './cricket-player.service';
import {FormsModule} from '@angular/forms';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { SearchPlayerComponent } from './search-player/search-player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerInfoComponent,
    SearchPlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'', component:SearchPlayerComponent, data:{animation: 'searchPage'}},
      {path:'player-info', component:PlayerInfoComponent, data:{animation:'playerInfoPage'}}
    ])
  ],
  providers: [CricketPlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
