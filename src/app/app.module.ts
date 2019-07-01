import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JsonpModule, HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { WeatherComponent } from "./weather/weather.component";
import { SpeedUnitPipe  } from './weather/pipes/speed.unit.pipe';
import { TempUnitPipe } from './weather/pipes/temp.unit.pipe';

//import {  } from 'skycons';

@NgModule({
  declarations: [AppComponent, WeatherComponent, SpeedUnitPipe, TempUnitPipe],
  imports: [BrowserModule, JsonpModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
