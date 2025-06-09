export interface City {
  name: string;
  coord: Coords;
}

export interface Coords {
  lon: number;
  lat: number;
}

export interface Weather {
  temp: number;
  weather: string;
  time: Date;
}
