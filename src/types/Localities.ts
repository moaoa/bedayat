import {City} from "@/types/Cities";

export type Locality = {
  id: string;
  name: string;
  englishName: string;
  cityId: string;
  createdAt: string;
  lastUpdated: string;
};
export type GetLocalityVm = {
  id: string;
  name: string;
  englishName: string;
  city: City;
  createdAt: string;
  lastUpdated: string;
};


export type NewLocalityData = {
  name: string;
  englishName: string;
  cityId: string;
};
