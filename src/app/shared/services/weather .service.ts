import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = environment.urlGeolocation;
  private apiKey = environment.apiKey;
  private weatherApi = environment.weatherApi;

  constructor(private httpClient: HttpClient) {}

  public getWeather(param: any): Observable<any> {
    return this.httpClient.get(this.baseUrl, {params: param});
  }

  public getWeatherOfTheCapitalCity(city: string): Observable<any> {
    return this.httpClient.get<any>(this.weatherApi, {params: {appid: this.apiKey, q: city}});
  }
}
