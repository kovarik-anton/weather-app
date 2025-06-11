"use client";

import List from "../shared/list";
import { City } from "@/lib/types";
import WeatherCard from "./weather-card";
import Search from "../city/search";
import { useForecast } from "@/hooks/use-forecast";
import { useAppSelector } from "@/hooks/redux-hooks";

interface Props {
  cities: City[];
}

export default function WeatherContainer({ cities }: Props) {
  const city = useAppSelector((state) => state.city.city);
  const { weatherForecast } = useForecast(city);

  return (
    <>
      <Search cities={cities} />
      {city ? (
        <>
          <h1 className="p-2">
            Teplota pro město <span className="font-semibold">{city.name}</span>
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
