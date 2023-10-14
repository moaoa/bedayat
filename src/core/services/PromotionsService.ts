import { City, NewCityData } from "@/types/Cities";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";

import ApiService from "./ApiService";
import { Locality, NewLocalityData } from "@/types/Localities";
import {AddUpdatePromotionDto, Promotion, PromotionDto} from "@/types/Promotions";

class PromotionsService {

  public static async loadPromotions(searchValue: string): Promise<PromotionDto[]> {

    const result =  await ApiService.get<ApiResponse<PromotionDto[]>>(
      `${AppConstants.PROMOTIONS_URL}/${searchValue}`
    );
    return result.data.data;
  }
  public static async createPromotion(data: AddUpdatePromotionDto) {

    const formData = new FormData();
    formData.append("information", data.information)
    formData.append("image", data.image as Blob)

    const result =  await ApiService.post<ApiResponse<PromotionDto>>(
      `${AppConstants.PROMOTIONS_URL}`,formData
    );
    return result.data.data;
  }

  public static async updatePromotion(promotionId: string, data: AddUpdatePromotionDto):Promise<ApiResponse<PromotionDto>> {

    const formData = new FormData();
    formData.append("information", data.information)
    formData.append("image", data.image as Blob)

    const result = await ApiService.put<ApiResponse<PromotionDto>>(
      `${AppConstants.PROMOTIONS_URL}/${promotionId}`,
        formData
    );
    return result.data;
  }

  public static async activatePromotion(promotionId: string, state: string):Promise<ApiResponse<PromotionDto>> {


    const result = await ApiService.put<ApiResponse<PromotionDto>>(
        `${AppConstants.PROMOTIONS_URL}/${promotionId}`,{}    );
    return result.data;
  }

  public static async deletePromotion(promotionId: string): Promise<ApiResponse<unknown>>{
    const result = await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.PROMOTIONS_URL}/${promotionId}`
    );
    return result.data;
  }
}

export default PromotionsService;
