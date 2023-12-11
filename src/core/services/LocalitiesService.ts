import { City, NewCityData } from "@/types/Cities";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";

import ApiService from "./ApiService";
import {GetLocalityVm, Locality, NewLocalityData} from "@/types/Localities";

class LocalitiesService {

  public static async loadLocalities(cityId: string): Promise<GetLocalityVm[]> {
    console.log(cityId  );
    
    const result =  await ApiService.query<ApiResponse<GetLocalityVm[]>>(
      `${AppConstants.LOCALITIES_URL}`,
        {
          params: {
            cityId
          }
        }
    );

    return result.data.data;
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

  public static async updateLocality(localityId: string,  data: NewLocalityData):Promise<ApiResponse<City>> {
    const result = await ApiService.put<ApiResponse<City>>(
      `${AppConstants.LOCALITIES_URL}/${localityId}`,
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
