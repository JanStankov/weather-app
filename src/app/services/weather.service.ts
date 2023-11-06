import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherCity } from '../models/WeatherCity';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  headers: HttpHeaders;
  baseUrl = `http://localhost:5001/weather`;

  constructor(private httpClient: HttpClient) { }

  getWeather(city: string): Observable<WeatherCity[]> {
    return this.httpClient.get<WeatherCity[]>(this.baseUrl + '/' + city);
  }
}
