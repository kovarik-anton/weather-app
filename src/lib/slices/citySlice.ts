import { createSlice } from "@reduxjs/toolkit";
import { City, CityState } from "../types";

const initialState: CityState = {
  city: undefined,
  suggestions: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload.city;
      state.suggestions = action.payload.suggestions;
    },
    setSuggestions(state, action) {
      state.suggestions = action.payload;
    },
  },
});

export const { setCity, setSuggestions } = citySlice.actions;

export default citySlice.reducer;
