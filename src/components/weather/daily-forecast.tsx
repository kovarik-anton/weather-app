"use client";

import List from "../shared/list";
import { WeatherForecast } from "@/lib/types";
import WeatherCard from "./weather-card";

interface Props {
  forecast: WeatherForecast;
}

export default function DailyForecast({ forecast }: Props) {
  return (
    <>
      <p className="p-2">Datum: {forecast.day.toLocaleDateString()}</p>
      <List
        data={forecast.weather}
        render={(weather) => (
          <li key={weather.time.toLocaleString()}>
            <WeatherCard weather={weather} />
          </li>
        )}
      ></List>
    </>
  );
}
