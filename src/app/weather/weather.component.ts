import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./weather.service";
import { WeatherModel } from "./weather.model";

import { WEATHER_COLORS } from './weather.constants';
import * as Skycons from '../../assets/skycons.js';

declare var Skycons: any;

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
  pos: Position;
  weatherData = new WeatherModel(null, null, null, null, null);
  currentSpeedUnit = "kph";
  currentTempUnit = "celsius";
  currentLocation: any;
  icons = new Skycons(); 
  dataReceived:boolean = false;
  // Need Typescript Definition file IDE Error No Runtime Error
  
  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.weatherService.getCurrentLocation().subscribe(
      position => {
        this.pos = position;
        this.getCurrentWeather();
        this.getLocationName();
             },
      err => {
        console.error(err);
      }
    );
  }

  getCurrentWeather() {
    this.weatherService
      .getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(
        weather => {
          this.weatherData.temp = weather["currently"]["temperature"];
          this.weatherData.summary = weather["currently"]["summary"];
          this.weatherData.wind = weather["currently"]["windSpeed"];
          this.weatherData.humidity = weather["currently"]["humidity"];
          this.weatherData.icon = weather["currently"]["icon"];
          this.setIcon();
          this.dataReceived = true;
          console.log(this.weatherData);
        },
        err => console.error(err)
      );
  }

  getLocationName() {
    this.weatherService
      .getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(data => {
        this.currentLocation = data["results"][3]["formatted_address"];
        console.log(data);
      });
  }

  toggleUnits() {
    this.toggleTempUnits();
    this.toggleSpeedUnits();
  }

  toggleTempUnits() {
    this.currentTempUnit =
      this.currentTempUnit == "fahrenheit" ? "celsius" : "fahrenheit";
  }

  toggleSpeedUnits() {
    this.currentSpeedUnit = 
      this.currentSpeedUnit == "mph" ? "kph" : "mph";
  }
  setIcon(){
    this.icons.add(document.getElementById("icon"), this.weatherData.icon);
    this.icons.play();
  }

  setStyles(){
      if(this.weatherData.icon){
        this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
        return WEATHER_COLORS[this.weatherData.icon];
      }else{
        this.icons.color = WEATHER_COLORS["default"]["color"];
        return WEATHER_COLORS["default"];
      }
  }
}
