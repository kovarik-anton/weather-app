import { store } from "./store";

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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export type CityState = {
  city: City | undefined;
  suggestions: City[];
};
