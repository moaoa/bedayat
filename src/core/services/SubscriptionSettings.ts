import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { SubscriptionSettings } from "@/types/SubscriptionSettings";
class SubscriptionSettingsService {
  public static async getSubscriptionSettings(): Promise<
    ApiResponse<SubscriptionSettings[]>
  > {
    const result = await ApiService.get(
      `${AppConstants.SUBSCRIPTION_URL}/SubscriptionSettings`
    );

    const data = result.data as ApiResponse<SubscriptionSettings[]>;
    return data;
  }

  public static async updateSubscriptionSettings(
    data: SubscriptionSettings
  ): Promise<ApiResponse<SubscriptionSettings>> {
    const result = await ApiService.put<ApiResponse<SubscriptionSettings>>(
      `${AppConstants.SUBSCRIPTION_URL}/EditSubscriptionSetting/${data.id}`,
      {
        period: data.period,
        periodArabicName: data.periodArabicName,
        periodEnglishName: data.periodEnglishName,
      }
    );
    return result.data;
  }

  public static async addSubscriptionSettings(params: {
    period: number;
    arabicName: string;
    englishName: string;
  }): Promise<ApiResponse<SubscriptionSettings>> {
    const result = await ApiService.post<ApiResponse<SubscriptionSettings>>(
      `${AppConstants.SUBSCRIPTION_URL}/AddSubscriptionSetting/${params.period}?arabicName=${params.arabicName}&englishName=${params.englishName}`,
      {}
    );
    return result.data;
  }

  public static async deleteSubscriptionSettings(
    subscriptionSettingId: string
  ): Promise<ApiResponse<unknown>> {
    const result = await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.SUBSCRIPTION_URL}/RemoveSubscriptionSetting/${subscriptionSettingId}`
    );
    return result.data;
  }
}

export default SubscriptionSettingsService;
