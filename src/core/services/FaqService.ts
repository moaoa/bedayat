import ApiService from "./ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import { AddSettingsRequestDto, systemSettingsResponse } from "@/types/SystemSettings";
import {Faq, FaqCategory, NewFaqData} from "@/types/Faq";
class FaqService {
    public static async getFaqs(category: FaqCategory):Promise<ApiResponse<Faq[]>> {
        console.log(category as number)
        const result =  await ApiService.get(
          `${AppConstants.FAQS_URL}`, `GetByCategory?faqCategory=${category as number}`);

          const data = result.data as ApiResponse<Faq[]>;
        return data;
      }

  public static async updateFaq(id : string, data: NewFaqData):Promise<ApiResponse<Faq>> {
    const result =  await ApiService.put<ApiResponse<Faq>>(
      `${AppConstants.FAQS_URL}/${id}`,data
    );
    return result.data;
  }
  public static async createFaq(data: NewFaqData):Promise<ApiResponse<Faq>> {
        const result =  await ApiService.post<ApiResponse<Faq>>(
            `${AppConstants.FAQS_URL}`,data
        );
        return result.data;
    }

    public static async deleteFaq(id: string):Promise<ApiResponse<Faq>> {
        const result =  await ApiService.delete<ApiResponse<Faq>>(
            `${AppConstants.FAQS_URL}/${id}`
        );
        return result.data;
    }


}

export default FaqService;
