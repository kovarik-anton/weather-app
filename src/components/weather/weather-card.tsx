import { Weather } from "@/lib/types";
import { formatTime } from "@/lib/utils";

interface Props {
  weather: Weather;
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="border-2 border-slate-200 p-2 rounded-md m-1 h-full">
      <p>Čas: {formatTime(weather.time)}</p>
      <p>Teplota: {Math.round(weather.temp)}</p>
      <p>Počasí: {weather.weather}</p>
    </div>
  );
}
