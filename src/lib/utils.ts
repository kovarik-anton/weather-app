import { gunzipSync } from "zlib";
import { CITIES_URL, FORECAST_URL } from "./constants";
import { Coords, WeatherForecast } from "./types";

export async function getCities() {
  const res = await fetch(CITIES_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const buffer = await res.arrayBuffer();
  const unzipped = gunzipSync(Buffer.from(buffer));
  const cities = JSON.parse(unzipped.toString("utf-8"));

  return cities;
}

export async function getForecast(coords: Coords) {
  const response = await fetch(FORECAST_URL(coords.lat, coords.lon));
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const weatherForecast = groupForecastByDay(data);

  return weatherForecast;
}

export function groupForecastByDay(data: any): WeatherForecast[] {
  const dailyForecast: WeatherForecast[] = [];

  data.list.forEach((item: any) => {
    const day = new Date(item.dt_txt.split(" ")[0]);

    let forecastDay = dailyForecast.find(
      (f) => f.day.toString() === day.toString()
    );

    if (!forecastDay) {
      forecastDay = {
        day: day,
        weather: [],
      };
      dailyForecast.push(forecastDay);
    }

    forecastDay.weather.push({
      temp: item.main.temp,
      weather: item.weather[0].main,
      time: new Date(item.dt_txt),
    });
  });

  return dailyForecast;
}

export function formatTime(time: Date) {
  return time.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
