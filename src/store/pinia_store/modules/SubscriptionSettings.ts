import { defineStore } from "pinia";
import Toaster from "@/core/services/Toaster";
import SubscriptionSettingsService from "@/core/services/SubscriptionSettings";
import { SubscriptionSettings } from "@/types/SubscriptionSettings";
import i18n from "@/core/plugins/i18n";
const t = i18n.global.t;
export const useSubscriptionSettingsStore = defineStore({
  id: "subscriptionSettingsStore",

  state: () => ({
    subsctiptionSettingToUpdate: {} as SubscriptionSettings,
    subsctiptionSettingToDelete: {} as SubscriptionSettings,
    dataLoading: false as boolean,
    subscriptionSettings: [] as SubscriptionSettings[],
  }),
  getters: {
    // returnValidUpdatePeriods(){
    //   const self = this;
    //   return Array.from({length: 365}).filter(function(_, i) {
    //     return !self.subscriptionSettings.some(x=> x.period == i+1)
    //   })
    // }
  },
  actions: {
    async getSubscriptionSettings() {
      try {
        this.dataLoading = true;
        const result =
          await SubscriptionSettingsService.getSubscriptionSettings();

        if (!result.isSuccess)
          Toaster.error("count not get Subscription Settings");

        this.subscriptionSettings = result.data.sort(
          (a, b) => a.period - b.period
        );

        this.dataLoading = false;
        return;
      } catch (error) {
        Toaster.error((error as Error).message);
        this.dataLoading = false;
      }
    },
    selectSubsctiptionSetting(
      selectedSubsctiptionSettings: SubscriptionSettings
    ) {
      // @ts-ignore
      this.subsctiptionSettingToUpdate = structuredClone({
        ...selectedSubsctiptionSettings,
      });
    },
    async addSubscriptionSettings(params: {
      period: number;
      arabicName: string;
      englishName: string;
    }) {
      try {
        this.dataLoading = true;
        await SubscriptionSettingsService.addSubscriptionSettings(params);

        Toaster.Success(t("success"), t("createdSuccessfully"));

        const getResult =
          await SubscriptionSettingsService.getSubscriptionSettings();

        if (!getResult.isSuccess)
          Toaster.error("count not get Subscription Settings");

        this.subscriptionSettings = getResult.data;

        return true;
      } catch (error) {
        // Toaster.error((error as Error).message)
        this.dataLoading = false;
        return false;
      } finally {
        this.dataLoading = false;
      }
    },

    async updateSubscriptionSettings(params: {
      period: number;
      arabicName: string;
      englishName: string;
    }): Promise<boolean> {
      try {
        const result =
          await SubscriptionSettingsService.updateSubscriptionSettings({
            ...this.subsctiptionSettingToUpdate,
            period: params.period,
            periodArabicName: params.arabicName,
            periodEnglishName: params.englishName,
          });

        if (!result.isSuccess) {
          Toaster.error("count not update");
          return false;
        }

        Toaster.Success(t("success"), t("updatedSuccessfully"));

        const getResult =
          await SubscriptionSettingsService.getSubscriptionSettings();

        if (!getResult.isSuccess)
          Toaster.error("count not get Subscription Settings");

        this.subscriptionSettings = getResult.data;
        return true;
      } catch (error) {
        Toaster.error((error as Error).message);
        return false;
      } finally {
        this.dataLoading = false;
      }
    },
    async deleteSubscriptionSettings(): Promise<boolean> {
      try {
        const result =
          await SubscriptionSettingsService.deleteSubscriptionSettings(
            this.subsctiptionSettingToDelete.id
          );

        Toaster.Success(t("success"), t("deletedSuccessfully"));

        const getResult =
          await SubscriptionSettingsService.getSubscriptionSettings();

        this.subscriptionSettings = getResult.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.dataLoading = false;
      }

      return true;
    },
  },
});
