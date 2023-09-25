import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { AddTermsData, TermsAndPrivacy, UpdateTermsData } from "@/types/TermsAndPrivacy";
class TermsAndPrivacyService {

    public static async getTermsAndPrivacy() {
        const result =  await ApiService.get(`${AppConstants.TERMS_AND_PRIVACY_URL}`);

        const data = result.data as ApiResponse<TermsAndPrivacy[]>;

        return data;
  }

  public static async deleteTermsAndPrivacy(termId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.TERMS_AND_PRIVACY_URL}/${termId}`
    );
  }
  public static async updateTermsAndPrivacy(termId: string, data: UpdateTermsData) : Promise<ApiResponse<TermsAndPrivacy>> {
   
    const  result =  await ApiService.put<ApiResponse<TermsAndPrivacy>>(
      `${AppConstants.TERMS_AND_PRIVACY_URL}/${termId}`, data
    );

    return result.data;
  }

  public static async addTermsAndPrivacy( data: AddTermsData) : Promise<ApiResponse<TermsAndPrivacy>> {
   
    const  result =  await ApiService.post<ApiResponse<TermsAndPrivacy>>(
      `${AppConstants.TERMS_AND_PRIVACY_URL}`, data
    );

    return result.data;
  }


}

export default TermsAndPrivacyService;
