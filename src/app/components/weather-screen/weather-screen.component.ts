import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherCity } from 'src/app/models/WeatherCity';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-screen',
  templateUrl: './weather-screen.component.html',
  styleUrls: ['./weather-screen.component.scss']
})
export class WeatherScreenComponent implements OnInit{
  cityName = 'Skopje';
  selectedDay = ''
  cityControl = new FormControl('');

  weatherList: WeatherCity[] = [];
  weatherListPerDay: WeatherCity[] = [];

  midDayWeather: WeatherCity[] = [];

  constructor(
    private weatherService: WeatherService,
  ){

  }

  ngOnInit(): void {
    this.weatherService.getWeather(this.cityName).subscribe(res => {
      this.weatherList = res;
      this.midDayWeather = [];
      this.midDayWeather.push(res[0])
      this.midDayWeather = [...this.midDayWeather, ...res.filter(x => x.dateTime.includes("15:00:00") && x.dateTime.split(' ')[0] !== res[0].dateTime.split(' ')[0]).slice(0, 4)];
      this.showDayWeather(this.midDayWeather[0]);
    });
  }

  search(){
    const city = this.cityControl.value ?? "";

    this.weatherService.getWeather(city).subscribe(res => {
      if(res){
        this.weatherList = res;
        this.midDayWeather = [];
        this.midDayWeather.push(res[0])
        this.midDayWeather = [...this.midDayWeather, ...res.filter(x => x.dateTime.includes("15:00:00")
         && x.dateTime.split(' ')[0] !== res[0].dateTime.split(' ')[0]).slice(0, 4)];
        this.cityName = city.charAt(0).toUpperCase() + city.slice(1);

        this.showDayWeather(this.midDayWeather[0]);
      }
      
    });
  }

  showDayWeather(weather :WeatherCity){
    this.weatherListPerDay = this.weatherList.filter(x => x.dateTime.includes(weather.dateTime.split(' ')[0]));
    this.selectedDay = weather.dateTime;
  }
}
