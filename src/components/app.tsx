"use client";

import WeatherContainer from "@/components/weather/weather-container";
import { store } from "@/lib/store";
import { City } from "@/lib/types";
import { Provider } from "react-redux";

interface Props {
  cities: City[];
}

export default function App({ cities }: Props) {
  return (
    <Provider store={store}>
      <WeatherContainer cities={cities} />
    </Provider>
  );
}
