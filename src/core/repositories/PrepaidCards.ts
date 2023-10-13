import {
  NewPrepaidCard,
  PrepaidCard,
  PrepaidCardFilters,
  PrepaidCardsExportParams,
} from "@/types/PrepaidCards";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ApiResponse } from "@/types/ApiResponse";
import ApiService from "@/core/services/ApiService";
import { Invoice, InvoiceFilters } from "@/types/Invoices";

class PrepaidCardsService {
  public static async getPrepaidCards(params: PrepaidCardFilters) {
    const res = await ApiService.query<ApiResponse<PrepaidCard[]>>(
      `${AppConstants.PREPAID_CARDS_URL}/Search`,
      {
        params: {
          ...params,
        },
      }
    );
    return res.data.data;
  }
  public static async getInvoices(params: InvoiceFilters) {
    const res = await ApiService.query<ApiResponse<Invoice[]>>(
      `${AppConstants.PREPAID_CARDS_URL}/Search`,
      {
        params: {
          ...params,
        },
      }
    );
    return res;
  }
  public static async deletePrepaidCard(cardId: string) {
    return await ApiService.delete<ApiResponse<unknown>>(
      `${AppConstants.PREPAID_CARDS_URL}/${cardId}`
    );
  }
  public static async updatePrepaidCard(itemId: string, data: NewPrepaidCard) {
    return await ApiService.put<ApiResponse<PrepaidCard>>(
      `${AppConstants.PREPAID_CARDS_URL}/${itemId}`,
      {
        ...data,
      }
    );
  }
  public static async togglePrepaidCardStatus(itemId: string, state: boolean) {
    return await ApiService.put<ApiResponse<PrepaidCard>>(
      `${AppConstants.PREPAID_CARDS_URL}/Activation/${itemId}`,
      {
        activeState: state,
      }
    );
  }
  public static async createPrepaidCard(data: NewPrepaidCard) {
    return await ApiService.post<ApiResponse<PrepaidCard>>(
      `${AppConstants.PREPAID_CARDS_URL}`,
      data
    );
  }
  public static async exportInvoice(invoiceId: string, exportAs: number) {
    return await ApiService.post<ApiResponse<PrepaidCard>>(
      `${AppConstants.PREPAID_CARDS_URL}/ExportExistInvoice/${invoiceId}`,
      {
        exportAs,
      }
    );
  }
  public static async exportPrepaidCards(params: PrepaidCardsExportParams) {
    return await ApiService.post<ApiResponse<PrepaidCard>>(
      `${AppConstants.PREPAID_CARDS_URL}/ExportPrepaidCards`,
      params
    );
  }
}

export default PrepaidCardsService;
