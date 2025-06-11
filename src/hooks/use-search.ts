import { City } from "@/lib/types";
import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { useAppDispatch } from "./redux-hooks";
import { setSuggestions } from "@/lib/slices/citySlice";

export function useSearch(cities: City[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useAppDispatch();
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
          dispatch(setSuggestions(data));
        } catch (error) {
          console.error("Error autocomplete suggestions:", error);
        }
      } else {
        dispatch(setSuggestions([]));
      }
    }

    searchCities();
  }, [debouncedValue, cities]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedValue,
  };
}
