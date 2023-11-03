import {AppConstants} from "@/core/constants/ApplicationsConstants";
import {ApiResponse} from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import {NewSubscriptionData, Subscription} from "@/types/Subscription";

class SubscriptionService {
    public static async getSubscriptions(packageId: string) {
        const res = await ApiService.get<ApiResponse<Subscription[] | null>>(
            `${AppConstants.SUBSCRIPTION_URL}/${packageId}`
        );
        return res.data.data;
    }

    public static async createSubscriptions(
        data: NewSubscriptionData
    ) {
        return await ApiService.post<ApiResponse<Subscription>>(
            `${AppConstants.SUBSCRIPTION_URL}`,
            {...data}
        );
    }

    public static async deleteSubscription(subscriptionId: string) {
        return await ApiService.delete<ApiResponse<unknown>>(
            `${AppConstants.SUBSCRIPTION_URL}/${subscriptionId}`
        );
    }

    public static async updateSubscriptions(subscriptionId: string,
                                            data: NewSubscriptionData
    ) {
        return await ApiService.put<ApiResponse<Subscription>>(
            `${AppConstants.SUBSCRIPTION_URL}/${subscriptionId}`,
            {
                ...data,
            }
        );
    }

}

export default SubscriptionService;
