import { City, NewCityData } from "@/types/Cities";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";

import ApiService from "../services/ApiService";
import {Country} from "@/types/Countries";
import {isLuhnAlgo} from "valibot";

class CitiesService {
  public static async createCity(data: NewCityData) {
    const result =  await ApiService.post<ApiResponse<City>>(
      `${AppConstants.CITIES_URL}/${data.countryId}`,
      {
        name: data.name,
        englishName: data.englishName,
      }
    );

    return result.data.data;
  }
  public static async deleteCity(cityId: string)
  {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.CITIES_URL}/${cityId}`
    );
  }
  public static async updateCity(cityId: string, data: NewCityData) {
    return await ApiService.put<ApiResponse<City>>(
      `${AppConstants.CITIES_URL}/${cityId}`,
      {
        name: data.name,
        englishName: data.englishName,
      }
    );
  }

    public static async getCities(countryId: string, cityName: string) {

        console.log(countryId)
      console.log(cityName)
        return await ApiService.query<ApiResponse<City[]>>(
            `${AppConstants.CITIES_URL}/${countryId}`,
            {
                params: {
                    name: cityName,
                    includeLocalities: false,
                },
            }
        );
    }
}



export default CitiesService;
