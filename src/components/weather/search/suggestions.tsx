"use client";

import { City } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  suggestions: City[];
  setSuggestions: Dispatch<SetStateAction<City[]>>;
  setSelectedCity: Dispatch<SetStateAction<City | undefined>>;
  query: string;
}

export default function SearchSuggestions({
  suggestions,
  query,
  setSelectedCity,
  setSuggestions,
}: Props) {
  function highlightText(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={query + index} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  function handleSelectCity(city: City) {
    setSelectedCity(city);
    setSuggestions([]);
  }

  return (
    <ul className="absolute top-12 w-full rounded-xl bg-white text-slate-900 shadow-2xl z-50 overflow-hidden">
      {suggestions.map((sugg) => (
        <li
          className="p-4 hover:bg-slate-200"
          key={sugg.name}
          onClick={() => handleSelectCity(sugg)}
        >
          <span> {highlightText(sugg.name, query)}</span>
        </li>
      ))}
    </ul>
  );
}
