import WeatherContainer from "@/components/weather/weather-container";
import { getCities } from "@/lib/utils";

export default async function Page() {
  const cities = await getCities();

  return (
    <div className="min-h-screen p-4 relative w-full h-full">
      <WeatherContainer cities={cities} />
    </div>
  );
}
