"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchSuggestions from "./suggestions";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useDebounce } from "@/hooks/use-debounce";
import { City } from "@/lib/types";
import { useSearch } from "@/hooks/use-search";

interface Props {
  cities: City[];
  setSelectedCity: Dispatch<SetStateAction<City | undefined>>;
}

export default function Search({ cities, setSelectedCity }: Props) {
  const {
    debouncedValue,
    searchQuery,
    setSearchQuery,
    suggestions,
    setSuggestions,
  } = useSearch(cities);

  const ref = useOutsideClick<HTMLFormElement>(() => {
    setSuggestions([]);
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const city = cities.find(
      (city) =>
        city.name.toLocaleLowerCase() === debouncedValue.toLocaleLowerCase()
    );
    setSelectedCity(city);
    setSuggestions([]);
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
      {suggestions.length > 0 && (
        <SearchSuggestions
          setSelectedCity={setSelectedCity}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          query={searchQuery}
        />
      )}
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
