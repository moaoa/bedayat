import { defineStore } from "pinia";
import Toaster from "@/core/services/Toaster";
import SubscriptionSettingsService from "@/core/services/SubscriptionSettings";
import { SubscriptionSettings } from "@/types/SubscriptionSettings";

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
      
      this.subscriptionSettings = result.data.sort((a, b)=>a.period - b.period);
      
      this.dataLoading = false;
      return;
      
    } catch (error) {
      
      Toaster.error((error as Error).message)
      this.dataLoading = false;
      }
      

    },
    selectSubsctiptionSetting(selectedSubsctiptionSettings: SubscriptionSettings) {

      // @ts-ignore
      this.subsctiptionSettingToUpdate = structuredClone({ ...selectedSubsctiptionSettings });
    },
    async addSubscriptionSettings(numberOfDays: number) {
      try {
        this.dataLoading = true;
        const result =
          await SubscriptionSettingsService.addSubscriptionSettings(
            numberOfDays
          );
        if (!result.isSuccess)
          Toaster.error("could not add Subscription Settings");

        Toaster.Success("Settings updated successfully !");

        const getResult = await SubscriptionSettingsService.getSubscriptionSettings();
       
        if (!getResult.isSuccess)
          Toaster.error("count not get Subscription Settings");
  
        this.subscriptionSettings = getResult.data;

        
        return true;
      } catch (error) {
        Toaster.error((error as Error).message)
        this.dataLoading = false;
        return false;
      } finally {
        this.dataLoading = false;
      }
      return true;
    },

    async updateSubscriptionSettings() : Promise<boolean> {
      try {

        
        const result = await  SubscriptionSettingsService.updateSubscriptionSettings(this.subsctiptionSettingToUpdate);

        if (!result.isSuccess)
        {
          Toaster.error("count not update");
          return false;
        }
        

        Toaster.Success("Subscription Settings updated successfully !");
        

        const getResult = await SubscriptionSettingsService.getSubscriptionSettings();
       
        if (!getResult.isSuccess)
          Toaster.error("count not get Subscription Settings");
  
        this.subscriptionSettings = getResult.data;


      } catch (error) {
        Toaster.error((error as Error).message)
      } finally {
        this.dataLoading = false;
      }

      return true;
    },  
      async deleteSubscriptionSettings() : Promise<boolean> {
      try {

        
        const result = await  SubscriptionSettingsService.deleteSubscriptionSettings(this.subsctiptionSettingToDelete.id);

        Toaster.Success("Subscription Settings deleted successfully !");

        const getResult = await SubscriptionSettingsService.getSubscriptionSettings();

        this.subscriptionSettings = getResult.data;
      } catch (error) {
        console.error(error)
      } finally {
        this.dataLoading = false;
      }

      return true;
    },
  },
});
