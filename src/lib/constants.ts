export const CITIES_URL =
  "http://bulk.openweathermap.org/sample/city.list.json.gz";

const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
export const FORECAST_URL = (lat: number, lon: number) =>
  `${BASE_FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
