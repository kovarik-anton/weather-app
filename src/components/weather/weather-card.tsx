import { Weather } from "@/lib/types";

interface Props {
  weather: Weather;
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="border-2 border-slate-200 p-2 rounded-md m-1 h-full">
      <p>Datum: {weather.time.toLocaleDateString()}</p>
      <p>Čas: {weather.time.toLocaleTimeString()}</p>
      <p>Teplota: {weather.temp}</p>
      <p>Počasí: {weather.weather}</p>
    </div>
  );
}
