import { defineStore } from "pinia";
import {
  NewPrepaidCard,
  PrepaidCard,
  PrepaidCardFilters,
} from "@/types/PrepaidCards";

import prepaidCardsService from "@/core/repositories/PrepaidCards";

import { useLocalStorage } from "@vueuse/core";
import toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { Invoice, InvoiceFilters } from "@/types/Invoices";
import { PrepaidCardsExportParams } from "@/types/PrepaidCards";
import saveFile from "@/core/helpers/saveFile";

export const usePrepaidCardsStore = defineStore({
  id: "prepaidCardsStore",
  state: () => ({
    prepaidCards: [] as PrepaidCard[],
    invoices: [] as Invoice[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    searchValue: "",

    isSwitchingInvoiceStatus: false,
    isSwitchingPrepaidCardStatus: false,
    isExportingInvoice: false,

    selectedPrepaidCard: useLocalStorage<Partial<PrepaidCard>>(
      "selectedPrepaidCard",
      {}
    ),
    selectedInvoice: useLocalStorage<Partial<Invoice>>("selectedInvoice", {}),
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadPrepaidCards(params: PrepaidCardFilters) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await prepaidCardsService.getPrepaidCards(params);

        this.prepaidCards = items;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async loadInvoices(params: InvoiceFilters) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const res = await prepaidCardsService.getInvoices(params);

        this.invoices = res.data.data;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectPrepaidCard() {
      this.selectedPrepaidCard = {};
    },
    selectPrepaidCard(selectedPrepaidCard: PrepaidCard) {
      this.selectedPrepaidCard = selectedPrepaidCard;
    },
    selectInvoice(invoice: Invoice) {
      this.selectedInvoice = invoice;
    },
    unselectInvoice() {
      this.selectedInvoice = {};
    },
    async togglePrepaidCardStatus(prepaidCard: PrepaidCard) {
      this.isSwitchingPrepaidCardStatus = true;
      try {
        const newState =
          prepaidCard.state === AppConstants.PREPAID_CARD_STATUS.Active
            ? false
            : true;
        await prepaidCardsService.togglePrepaidCardStatus(
          prepaidCard.id,
          newState
        );
        this.isSwitchingPrepaidCardStatus = false;
      } catch (error) {
        this.isSwitchingPrepaidCardStatus = false;
        console.log(error);
        throw error;
      }
    },
    async createNewItem(prepaidCardData: NewPrepaidCard) {
      this.isCreatingNewItem = true;
      try {
        const res = await prepaidCardsService.createPrepaidCard(
          prepaidCardData
        );
        this.prepaidCards.push(res.data.data);
        this.isCreatingNewItem = false;
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
        throw error;
      }
    },
    async exportInvoice(exportAs: number) {
      this.isExportingInvoice = true;
      try {
        if (!this.selectedInvoice || !this.selectedInvoice.id) {
          return;
        }
        const res = await prepaidCardsService.exportInvoice(
          this.selectedInvoice.id,
          exportAs
        );
        if (exportAs === AppConstants.EXPORT_AS.Excel) {
          const blob = new Blob([res.data as ArrayBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveFile(URL.createObjectURL(blob), "export.xlsx");
        } else if (exportAs === AppConstants.EXPORT_AS.Csv) {
          const blob = new Blob([res.data as string], {
            type: "text/csv",
          });
          saveFile(URL.createObjectURL(blob), "export.csv");
        }
        this.isExportingInvoice = false;
      } catch (error) {
        this.isExportingInvoice = false;
        console.log(error);
        throw error;
      }
    },
    async exportPrepaidCards(params: PrepaidCardsExportParams) {
      this.isExportingInvoice = true;
      try {
        const res = await prepaidCardsService.exportPrepaidCards(params);
        if (params.exportAs === AppConstants.EXPORT_AS.Excel) {
          const blob = new Blob([res.data as ArrayBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveFile(URL.createObjectURL(blob), "export.xlsx");
        } else if (params.exportAs === AppConstants.EXPORT_AS.Csv) {
          const blob = new Blob([res.data as string], {
            type: "text/csv",
          });
          saveFile(URL.createObjectURL(blob), "export.csv");
        }

        this.isExportingInvoice = false;
      } catch (error) {
        this.isExportingInvoice = false;
        console.log(error);
        throw error;
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      if (!this.selectedPrepaidCard) {
        console.error("no prepaidCard selected");
        return;
      }

      try {
        if (!this.selectedPrepaidCard.id) {
          return;
        }
        await prepaidCardsService.deletePrepaidCard(
          this.selectedPrepaidCard.id
        );
        this.prepaidCards = this.prepaidCards.filter(
          (item) => item.id !== this.selectedPrepaidCard?.id
        );
        this.unselectPrepaidCard();
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
