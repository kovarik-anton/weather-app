"use client";

import List from "../shared/list";
import { City } from "@/lib/types";
import WeatherCard from "./weather-card";
import Search from "./search/search";
import { useForecast } from "@/hooks/use-forecast";
import { useState } from "react";

interface Props {
  cities: City[];
}

export default function WeatherContainer({ cities }: Props) {
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const { weatherForecast } = useForecast(selectedCity);
  
  return (
    <>
      <Search cities={cities} setSelectedCity={setSelectedCity} />
      {selectedCity ? (
        <>
          <h1 className="p-2">
            Teplota pro město{" "}
            <span className="font-semibold">{selectedCity.name}</span>
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
