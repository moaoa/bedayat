import { Faq, FaqCategory, NewFaqData } from "@/types/Faq";
import { Country } from "@/types/Countries";
import ApiService from "@/core/services/ApiService";
import { ApiResponse } from "@/types/ApiResponse";
import Toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import i18n from "@/core/plugins/i18n";

import { defineStore } from "pinia";

import axios from "axios";



export const useFaqsStore = defineStore({
  id: "useFaqsStore",

  state: () => ({
    faqs: [] as Faq[],
    total: 0,
    currentPage: 1,
    currentSize: 0,
    selectedFaq: {} as Faq | null,
    selectedCountry: null as Country | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    errorMessage: "" as string,
    errorLoadingData: false,
  }),

  actions: {
    async addFaq(faq: NewFaqData | null = null) {
      this.isCreatingNewItem = true;
      try {
        const response = await axios.post(
          AppConstants.MANAGEMENT_URL + "/faqs",
          faq
        );
        if (response.status == 200) {
          if (response.data.isSuccess) {
            this.faqs.push(response.data.data);
            Toaster.Success(
              "ssssssssssssssssssssssssssssssssssssss",
              "sssssssssssssssssss"
            );
          } else {
            this.errorLoadingData = false;
            this.errorMessage = "response.data.message";
            Toaster.error(
              "حدث خطأ",
              response.data.message ||
                "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
            );
          }
        }
      } catch (e: unknown) {
        
          Toaster.error(
            "حدث خطأ",
            e.message || "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
          );


      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async updateFaq(faq: NewFaqData) {
      try {
        const response = await axios.put(
          AppConstants.MANAGEMENT_URL + "/faqs/" + this.selectedFaq?.id,
          faq
        );
        if (response.status == 200) {
          if (response.data.isSuccess) {
            const index = this.faqs.findIndex(
              (faq) => faq.id === this.selectedFaq?.id
            );
            this.faqs[index] = { ...response.data.data as Faq };
            Toaster.Success(i18n.global.t("faqs"),i18n.global.t('ok')            );

          } else {
            this.errorLoadingData = false;
            this.errorMessage = "response.data.message";
            Toaster.error(
              "حدث خطأ",
              response.data.message ||
              "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
            );
          }
        }
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
        const response = await axios.delete(
          AppConstants.MANAGEMENT_URL + "/faqs/" + this.selectedFaq?.id
        );
        if (response.status == 200) {
          if (response.data.isSuccess) {
            const index = this.faqs.findIndex(
              (faq) => faq.id === this.selectedFaq?.id
            );
            this.faqs.splice(index, 1);
            Toaster.Success(i18n.global.t("faqs"),i18n.global.t('ok')            );

          } else {
            this.errorLoadingData = false;
            this.errorMessage = "response.data.message";
            Toaster.error(
              "حدث خطأ",
              response.data.message ||
              "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
            );
          }
        }
      } catch (e) {
        Toaster.error(
          "حدث خطأ",
          e.message || "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
        );
      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async loadFaqs(faqCategory: FaqCategory | null = null) {
      try {
        this.dataIsLoading = true;
        this.errorLoadingData = false;
        let url = AppConstants.FAQS_URL + "/GetByCategory";
        if (faqCategory) {
          url += "/?faqCategory=" + faqCategory;
        }

        const response = await ApiService.vueInstance.axios.get<
          ApiResponse<Faq[]>
        >(url);
        if (response.status == 200) {
          if (response.data.isSuccess) {
            this.faqs = response.data.data;
          } else {
            this.errorLoadingData = false;
            this.errorMessage = "response.data.message";
            Toaster.error(
              "حدث خطأ",
              response.data.message ||
                "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
            );
          }
        }
        // const result = await ApiService.get(AppConstants.CITIES_URL);
        // const data = result.data as ApiResponse<PagedList<Faq>>;
      } catch (e) {
        this.errorLoadingData = true;
        this.errorMessage =
          (e as Error).message ?? "حدث خطأ أثناء محاولة تحميل البيانات";

        this.errorLoadingData = false;
        this.dataIsLoading = false;
        Toaster.error(
          "حدث خطأ",
          e.errorMessage || "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة"
        );
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
