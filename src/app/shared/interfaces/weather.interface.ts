export interface WeatherInterface {
  coords: IGeolocation;
}

export interface IGeolocation {
  latitude: number;
  longitude: number;
}

export interface IWeather {
  name: string;
  main: ITemp;
  wind: IWind;
  weather: Array<weatherInterface>;
  id: number
}

export interface weatherInterface {
  icon: string;
}

export interface IWind {
  speed: number;
}

export interface ITemp {
  temp: any;
  humidity: number;
}
