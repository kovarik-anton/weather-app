import { Weather } from "@/lib/types";

interface Props {
  weather: Weather;
}

export default function WeatherCard({ weather }: Props) {
  //TODO
  return (
    <div className="border-2 border-slate-200 p-2 rounded-md m-1 h-full">
      <p>Teplota: {weather.temp}</p>
      <p>Počasí: {weather.weather}</p>
      <p>Čas: {weather.time.toLocaleString()}</p>
    </div>
  );
}
