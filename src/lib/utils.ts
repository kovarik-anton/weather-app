import { gunzipSync } from "zlib";
import { CITIES_URL } from "./constants";

export async function getCities() {
  const res = await fetch(CITIES_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const buffer = await res.arrayBuffer();
  const unzipped = gunzipSync(Buffer.from(buffer));
  const json = JSON.parse(unzipped.toString("utf-8"));

  return json;
}
