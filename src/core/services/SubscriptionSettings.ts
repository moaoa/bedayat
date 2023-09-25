import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { SubscriptionSettings } from "@/types/SubscriptionSettings";
class SubscriptionSettingsService {


    public static async getSubscriptionSettings():Promise<ApiResponse<SubscriptionSettings[]>> {
        const result =  await ApiService.get(
          `${AppConstants.COMMON_SUBSCRIPTION_URL}/SubscriptionSettings`);

          const data = result.data as ApiResponse<SubscriptionSettings[]>;
        return data;
      }


  public static async updateSubscriptionSettings(data: SubscriptionSettings):Promise<ApiResponse<SubscriptionSettings>> {
    const result =  await ApiService.put<ApiResponse<SubscriptionSettings>>(
      `${AppConstants.COMMON_SUBSCRIPTION_URL}/EditSubscriptionSetting/${data.id}?period=${data.period}`,{}
  
    );
    return result.data;
  }

  public static async addSubscriptionSettings(data: number) :Promise<ApiResponse<SubscriptionSettings>>{
    const result =  await ApiService.post<ApiResponse<SubscriptionSettings>>(
      `${AppConstants.COMMON_SUBSCRIPTION_URL}/AddSubscriptionSetting/${data}`, {}
    );
    return result.data;
  }

  public static async deleteSubscriptionSettings(subscriptionSettingId: string): Promise<ApiResponse<unknown>> {
    const result =  await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.COMMON_SUBSCRIPTION_URL}/RemoveSubscriptionSetting/${subscriptionSettingId}`

    );
    return result.data;
  }
}

export default SubscriptionSettingsService;
