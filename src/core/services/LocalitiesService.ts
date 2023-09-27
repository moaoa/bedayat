import { City, NewCityData } from "@/types/Cities";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";

import ApiService from "./ApiService";
import { Locality, NewLocalityData } from "@/types/Localities";

class LocalitiesService {

  public static async loadLocalities(cityId: string): Promise<Locality[]> {
    console.log(cityId  );
    
    const result =  await ApiService.get<ApiResponse<City>>(
      `${AppConstants.CITIES_URL}/${cityId}`
    );
    console.log(result.data.data);
    console.log(result.data.data.localities);
    

    return result.data.data.localities;
  }
  public static async createLocality(data: NewLocalityData) {
    const result =  await ApiService.post<ApiResponse<Locality>>(
      `${AppConstants.LOCALITIES_URL}/${data.cityId}`,
      {
        name: data.name,
        englishName: data.englishName,
      }
    );

    return result.data.data;
  }

  public static async updateLocality(cityId: string, data: NewCityData):Promise<ApiResponse<City>> {
    const result = await ApiService.put<ApiResponse<City>>(
      `${AppConstants.LOCALITIES_URL}/${cityId}`,
      {
        name: data.name,
        englishName: data.englishName,
      }
    );
    return result.data;
  }

  public static async deleteLocality(localityId: string): Promise<ApiResponse<unknown>>{
    const result = await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.LOCALITIES_URL}/${localityId}`
    );
    
    return result.data;
  }
}

export default LocalitiesService;
