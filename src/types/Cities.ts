import { Locality } from "./Localities";

export type City = {
  id: string;
  name: string;
  englishName: string;
  countryId: string;
  localities: Locality[];
  createdAt: string;
  lastUpdated: string;
};

export type NewCityData = Omit<
  City,
  "id" | "createdAt" | "lastUpdated" | "localities" 
>;
