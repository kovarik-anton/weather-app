"use client";

import List from "../shared/list";
import { City, Weather } from "@/lib/types";
import WeatherCard from "./weather-card";
import { useEffect, useState } from "react";
import Search from "./search/search";

interface Props {
  cities: City[];
}

export default function WeatherContainer({ cities }: Props) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<Weather[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!selectedCity) return;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.coord.lat}&lon=${selectedCity.coord.lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const weatherItems = data.list.map((item: any) => {
        return {
          temp: item.main.temp,
          weather: item.weather[0].main,
          time: new Date(item.dt_txt),
        };
      });

      setWeatherForecast(weatherItems);
    }

    if (selectedCity) {
      fetchData();
    }
  }, [selectedCity]);

  return (
    <>
      <Search cities={cities} setSelectedCity={setSelectedCity} />
      {selectedCity ? (
        <>
          <h1 className="p-2">
            Teplota pro město{" "}
            <span className="font-semibold"> {selectedCity.name}</span>
          </h1>
          <List
            data={weatherForecast}
            render={(weather) => (
              <li key={weather.time.toLocaleString()}>
                <WeatherCard weather={weather} />
              </li>
            )}
          ></List>
        </>
      ) : (
        <h1 className="p-2">
          Vyberte prosím město, pro které chcete zobrazit předpověd
        </h1>
      )}
    </>
  );
}
