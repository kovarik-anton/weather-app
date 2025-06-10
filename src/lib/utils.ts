import { gunzipSync } from "zlib";
import { CITIES_URL } from "./constants";
import { Coords } from "./types";

export async function getCities() {
  const res = await fetch(CITIES_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const buffer = await res.arrayBuffer();
  const unzipped = gunzipSync(Buffer.from(buffer));
  const json = JSON.parse(unzipped.toString("utf-8"));

  return json;
}

export async function getForecast(coords: Coords) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const weatherForecast = data.list.map((item: any) => {
    return {
      temp: item.main.temp,
      weather: item.weather[0].main,
      time: new Date(item.dt_txt),
    };
  });

  return weatherForecast;
}
