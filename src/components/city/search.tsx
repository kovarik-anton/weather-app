"use client";

import SearchSuggestions from "./suggestions";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { City } from "@/lib/types";
import { useSearch } from "@/hooks/use-search";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setCity, setSuggestions } from "@/lib/slices/citySlice";

interface Props {
  cities: City[];
}

export default function Search({ cities }: Props) {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector((state) => state.city.suggestions);

  const { debouncedValue, searchQuery, setSearchQuery } = useSearch(cities);

  const ref = useOutsideClick<HTMLFormElement>(() => {
    dispatch(setSuggestions([]));
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const city = cities.find(
      (city) =>
        city.name.toLocaleLowerCase() === debouncedValue.toLocaleLowerCase()
    );
    dispatch(setCity({ city, suggestions: [] }));
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="relative h-12 rounded-3xl bg-white flex border-2 border-slate-400 items-center"
    >
      <input
        type="text"
        placeholder="Hledejte město..."
        className="bg-white text-slate-900 flex-1 border-none pl-2.5 m-2.5 outline-none w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {suggestions.length > 0 && <SearchSuggestions query={searchQuery} />}
      <button
        type="submit"
        aria-label="Hledat"
        className="rounded-md w-14 h-8 place-items-start cursor-pointer mr-4"
      >
        Hledat
      </button>
    </form>
  );
}
