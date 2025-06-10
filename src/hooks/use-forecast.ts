import { City, Weather } from "@/lib/types";
import { getForecast } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useForecast(city?: City) {
  const [weatherForecast, setWeatherForecast] = useState<Weather[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!city) {
        setWeatherForecast([]);
        return;
      }
      const forecast = await getForecast(city.coord);
      setWeatherForecast(forecast);
    }

    if (city) {
      fetchData();
    }
  }, [city]);

  return { weatherForecast };
}
