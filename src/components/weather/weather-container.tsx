"use client";

import List from "../shared/list";
import { City } from "@/lib/types";
import WeatherCard from "./weather-card";
import Search from "../city/search";
import { useForecast } from "@/hooks/use-forecast";
import { useAppSelector } from "@/hooks/redux-hooks";
import DailyForecast from "./daily-forecast";

interface Props {
  cities: City[];
}

export default function WeatherContainer({ cities }: Props) {
  const city = useAppSelector((state) => state.city.city);
  const { weatherForecast, errorMessage } = useForecast(city);

  return (
    <>
      <Search cities={cities} />
      {errorMessage && <p className="p-2">{errorMessage}</p>}
      {!errorMessage &&
        (city ? (
          <>
            <h1 className="p-2 text-lg">
              Teplota pro město{" "}
              <span className="font-semibold">{city.name}</span>
            </h1>
            <ul>
              {weatherForecast.map((forecast) => (
                <li className="mt-2" key={forecast.day.toLocaleDateString()}>
                  <DailyForecast forecast={forecast} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h1 className="p-2 text-lg">
            Vyberte prosím město, pro které chcete zobrazit předpověd
          </h1>
        ))}
    </>
  );
}
