import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { AddSettingsRequestDto, systemSettingsResponse } from "@/types/SystemSettings";
import {PackageAddData} from "@/types/Packages/Packages";
class PackagesService {


    public static async getPackages():Promise<ApiResponse<systemSettingsResponse>> {
        const result =  await ApiService.get(
          `${AppConstants.SYSTEMSETTINGS_URL}`);

          const data = result.data as ApiResponse<systemSettingsResponse>;
        return data;
      }

  public static async updatePackage(data: AddSettingsRequestDto):Promise<ApiResponse<systemSettingsResponse>> {
    const result =  await ApiService.put<ApiResponse<systemSettingsResponse>>(
      `${AppConstants.SYSTEMSETTINGS_URL}`,data
    );
    return result.data;
  }


    public static async createPackage(data: PackageAddData):Promise<ApiResponse<systemSettingsResponse>> {
        const result =  await ApiService.post<ApiResponse<systemSettingsResponse>>(
            `${AppConstants.Packages_URL}`, {...data}
        );
        return result.data;
    }

    // public static async getCoursesForPackageSelection():Promise<ApiResponse<>> {
    //     const result =  await ApiService.get(
    //         `${AppConstants.SYSTEMSETTINGS_URL}`);
    //
    //     const data = result.data as ApiResponse<systemSettingsResponse>;
    //     return data;
    // }
}

export default PackagesService;
