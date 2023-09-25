import { City } from "./Cities";
export type Country = {
  id: string;
  name: string;
  englishName: string;
  cities: City[];
  createdAt: string;
  lastUpdated: string;
};

export type NewCountryData = Omit<
  Country,
  "id" | "createdAt" | "lastUpdated" | "cities"
>;
