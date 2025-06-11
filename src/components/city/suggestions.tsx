"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setCity } from "@/lib/slices/citySlice";
import { City } from "@/lib/types";

interface Props {
  query: string;
}

export default function SearchSuggestions({ query }: Props) {
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector((state) => state.city.suggestions);

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
    dispatch(setCity({ city, suggestions: [] }));
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
