import { City, Weather } from "@/lib/types";
import { getForecast } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

export function useSearch(cities: City[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  const { debouncedValue } = useDebounce(searchQuery, 500);

  useEffect(() => {
    function searchCities() {
      if (debouncedValue.length >= 2) {
        try {
          const data = cities
            .filter((city) =>
              city.name
                .toLocaleLowerCase()
                .includes(debouncedValue.toLocaleLowerCase())
            )
            .slice(0, 6);
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching autocomplete suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    }

    searchCities();
  }, [debouncedValue, cities]);

  return {
    searchQuery,
    setSearchQuery,
    suggestions,
    setSuggestions,
    debouncedValue,
  };
}
