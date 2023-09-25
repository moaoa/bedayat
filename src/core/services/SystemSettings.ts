import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { AddSettingsRequestDto, systemSettingsResponse } from "@/types/SystemSettings";
class SystemSettingsService {


    public static async getSystemSettings():Promise<ApiResponse<systemSettingsResponse>> {
        const result =  await ApiService.get(
          `${AppConstants.SYSTEMSETTINGS_URL}`);

          const data = result.data as ApiResponse<systemSettingsResponse>;
        return data;
      }


  public static async updateSystemSettings(data: AddSettingsRequestDto):Promise<ApiResponse<systemSettingsResponse>> {
    const result =  await ApiService.put<ApiResponse<systemSettingsResponse>>(
      `${AppConstants.COMMON_SUBSCRIPTION_URL}`,data
    );
    return result.data;
  }
}

export default SystemSettingsService;
