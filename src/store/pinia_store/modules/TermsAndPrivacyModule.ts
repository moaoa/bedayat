import { defineStore } from "pinia";
import Toaster from "@/core/services/Toaster";
import { TermsAndPrivacyType, TermsAndPrivacy, UpdateTermsData, AddTermsData } from "@/types/TermsAndPrivacy";
import TermsAndPrivacyService from "@/core/services/TermsAndPrivacy";

export const useTermsAndPrivacyStore = defineStore({
  id: "termsAndPrivacyStore",

  state: () => ({
    termsAndPrivacy: [] as TermsAndPrivacy[],

    dataLoading: false as boolean,
    termsDataSubmitting: false as boolean,
    displayArabic: "0" as string,
  }),
  getters: {},
  actions: {
    async getTermsAndPrivacy() {
      this.dataLoading = true;
      try {
        
        const data = await TermsAndPrivacyService.getTermsAndPrivacy();

        
        if (!data.isSuccess) {
          Toaster.Success(data.message ?? "failed to get data");
        }

        this.termsAndPrivacy = data.data;
        
      } catch (error) {
        
        Toaster.error((error as Error).message);
        console.log(error);
      } finally {
        this.dataLoading = false;
      }

      return;
    },
    async updateTermsAndPrivacy(enumType: TermsAndPrivacyType) {
      try {

        const res = this.termsAndPrivacy.find(x=> x.type == enumType);

        const data = await TermsAndPrivacyService.updateTermsAndPrivacy(res?.id ?? "", {content: res?.content, englishContent: res?.englishContent} as UpdateTermsData);
        if (!data.isSuccess)
          Toaster.error(data.message ?? "Update failed")
        

        Toaster.Success("Terms updated successfully !");
      } catch (error) {
        console.log(error);
      } finally {
        this.dataLoading = false;
        this.termsDataSubmitting = false;
      }

      return;
    },
    async addTermsAndPrivacy(enumType: TermsAndPrivacyType) {
      try {

        const res = {type: enumType} as AddTermsData;
        res.content = "الرجاء تعبئه القواعد هنا";
        res.englishContent = "please fill your conditions here";

        
        const data = await TermsAndPrivacyService.addTermsAndPrivacy(res);

        if (!data.isSuccess)
          Toaster.error(data.message ?? "Added failed")
        
        Toaster.Success("Settings Added successfully !");
        
        await this.getTermsAndPrivacy();
      } catch (error) {
        Toaster.error((error as Error).message);
        console.log(error);
      } finally {
        this.dataLoading = false;
        this.termsDataSubmitting = false;
      }

      return;
    },
  },
});
