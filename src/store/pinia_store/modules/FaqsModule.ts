import { Faq, FaqCategory, NewFaqData } from "@/types/Faq";
import { Country } from "@/types/Countries";
import ApiService from "@/core/services/ApiService";
import { ApiResponse } from "@/types/ApiResponse";
import Toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import i18n from "@/core/plugins/i18n";

import { defineStore } from "pinia";

import axios from "axios";
import FaqService from "@/core/services/FaqService";
import toaster from "@/core/services/Toaster";



export const useFaqsStore = defineStore({
  id: "useFaqsStore",

  state: () => ({
    faqs: [] as Faq[],
    total: 0,
    currentPage: 1,
    currentSize: 0,
    selectedFaq: {} as Faq | null,
    selectedCategory: null as FaqCategory | null ,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    errorMessage: "" as string,
    errorLoadingData: false,
  }),

  actions: {
    async addFaq(faq: NewFaqData) {
      this.isCreatingNewItem = true;
      try {
        const result = await FaqService.createFaq(faq);
            this.faqs.push(result.data);
            Toaster.Success(
              "Faq added Successfully "
            );
      } catch (e: unknown) {
          Toaster.error(
            "حدث خطأ",
            (e as Error).message || "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
          );
      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async updateFaq(faq: NewFaqData) {
      try {

        const result = await FaqService.updateFaq(this.selectedFaq!.id, faq)

        await this.loadFaqs(this.selectedCategory);

      } catch (e) {
        Toaster.error(
          "حدث خطأ",
          e.message || "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
        );
      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async deleteFaq() {
      try {

        await FaqService.deleteFaq(this.selectedFaq!.id!)

        await this.loadFaqs(this.selectedCategory!)
        toaster.Success("Success", "Question Deleted successfully")

      } catch (e) {
        Toaster.error(
          "حدث خطأ",
          e.message || "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
        );
      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async loadFaqs(faqCategory: FaqCategory | null) {
      try {
        this.dataIsLoading = true;

        const response = await FaqService.getFaqs(faqCategory);
            this.faqs = response.data;


      } catch (e) {
        this.errorLoadingData = true;
        this.errorMessage =
          (e as Error).message ?? "حدث خطأ أثناء محاولة تحميل البيانات";
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectFaq() {
      this.selectedFaq = null;
    },
    selectFaq(selectedFaq: Faq) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.selectedFaq = structuredClone({ ...selectedFaq });
    },
  },
});
