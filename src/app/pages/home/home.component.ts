import {Component, OnInit} from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {WeatherService} from "../../shared/services/weather .service";
import {IWeather, WeatherInterface} from "../../shared/interfaces/weather.interface";
import {ToastrService} from "ngx-toastr";
import {FormControl, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  weather!: IWeather;
  city = new FormControl('', [Validators.required], [this.nameAsyncValidator.bind(this)]);
  arrayCity: Array<IWeather> = [];
  page: number = 1;

  constructor(
    private geolocation$: GeolocationService,
    private weatherService: WeatherService,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getArrayStorage();
    this.getPosition()
  }

  getArrayStorage(): void {
    const date = JSON.parse(localStorage.getItem('arrayCity') as string)
    if (date.length) {
      this.arrayCity = date
    }
  }

  nameAsyncValidator(control: FormControl | any): Observable<ValidationErrors> {
    return this.weatherService.validateEmail(control.value.trim())
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}: WeatherInterface) => {
      this.weatherService.getWeather({lat: latitude, lon: longitude}).subscribe((res: IWeather) => {
        this.weather = res;
      })
    })
  }

  get iconDownload(): string {
    return this.weather?.weather[0]?.icon;
  }

  addCity(): void {
    this.weatherService.getWeatherOfTheCapitalCity(this.city.value.trim()).subscribe(res => {
      if(this.city.errors?.['nameError']) {
        this.toaster.error('уже сушествует город')
      } else {
        this.toaster.success('Add City')
        this.arrayCity.push(res);
        localStorage.setItem('arrayCity', JSON.stringify(this.arrayCity))
        this.city.reset()
      }
      }, error => {
      this.toaster.error('no City')
    })
  }

  get validatorEmail(): boolean {
    return this.city.errors?.['nameError']
  }

  deleteCity(city: IWeather): void {

    const array = this.arrayCity.filter((el:IWeather) => el.id !== city.id)
    this.arrayCity = array
    localStorage.setItem('arrayCity', JSON.stringify(array))
  }
}
