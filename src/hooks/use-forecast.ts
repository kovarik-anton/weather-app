import { City, Weather, WeatherForecast } from "@/lib/types";
import { getForecast } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useForecast(city?: City) {
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      if (!city) {
        setWeatherForecast([]);
        return;
      }
      try {
        const forecast = await getForecast(city.coord);
        setErrorMessage(null);
        setWeatherForecast(forecast);
      } catch {
        setErrorMessage("Předpověď se nepovedla načíst");
      }
    }

    if (city) {
      fetchData();
    }
  }, [city]);

  return { weatherForecast, errorMessage };
}
