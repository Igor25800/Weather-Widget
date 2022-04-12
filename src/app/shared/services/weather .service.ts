import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = environment.urlGeolocation;
  private apiKey = environment.apiKey;
  private weatherApi = environment.weatherApi;

  constructor(private httpClient: HttpClient) {
  }

  public getWeather(param: any): Observable<any> {
    return this.httpClient.get(this.baseUrl, {params: param});
  }

  public getWeatherOfTheCapitalCity(city: string): Observable<any> {
    return this.httpClient.get<any>(this.weatherApi, {params: {appid: this.apiKey, q: city}});
  }

  validateCity(city: string): Observable<ValidationErrors> {
    return new Observable<ValidationErrors>(observer => {
      const date = JSON.parse(localStorage.getItem('arrayCity') as string)
      const cityArray = date?.find(({name}: any) => name?.toLowerCase() === city?.toLowerCase());
      if (cityArray) {
        observer.next({
          nameError: 'email с таким именем уже существует'
        });
        observer.complete();
      }
      observer.next({
        nameError: false
      });
      observer.complete();
    })
  }
}
