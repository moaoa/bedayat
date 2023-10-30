import { Country } from "@/types/Countries";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";

class CountriesService {
  public static async getCountryWithCities(countryId: string, cityName: string) {

    return await ApiService.query<ApiResponse<Country>>(
      `${AppConstants.COUNTRIES_URL}/${countryId}`,
      {
        params: {
          includeCities: true,
        },
      }
    );
  }
  //   public static async deleteCity(cityId: string) {
  //     return await ApiService.delete<ApiResponse<unknown>>(
  //       `${AppConstants.CITIES_URL}/${cityId}`
  //     );
  //   }
  //   public static async updateCity(cityId: string, data: NewCityData) {
  //     return await ApiService.put<ApiResponse<City>>(
  //       `${AppConstants.CITIES_URL}/${cityId}`,
  //       {
  //         name: data.name,
  //         englishName: data.englishName,
  //       }
  //     );
  //   }
}

export default CountriesService;
