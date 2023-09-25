import { defineStore } from "pinia";
import {
  AddSettingsRequestDto,
  SystemSettingType,
  SystemSettings,
  systemSettingsResponse,
} from "@/types/SystemSettings";
import Toaster from "@/core/services/Toaster";
import SystemSettingsService from "@/core/services/SystemSettings";

export const useSystemSettingsStore = defineStore({
  id: "systemSettingsStore",

  state: () => ({
    systemSettings: {
      coinPrice: 10,
      startOfYear: new Date("1970"),
      endOfYear: new Date("1970"),
    } as SystemSettings,
    dataLoading: false as boolean,
    coindDataSubmitting: false as boolean,
    startOfYearDataSubmitting: false as boolean,
    endOfYearDataSubmitting: false as boolean,
    errorOccured: false as boolean,
  }),
  getters: {},
  actions: {
    async getSettings() {
      this.dataLoading = true;
      try {

        this.errorOccured = false;
        console.log("test test");
        
        const result = await SystemSettingsService.getSystemSettings();
        this.systemSettings = {
          coinPrice: result.data.coinPrice,
          endOfYear: new Date(result.data.endYear + "-" + result.data.endMonth),
          startOfYear: new Date(
            result.data.startYear + "-" + result.data.startMonth
          ),
        } as SystemSettings;
      } catch (error) {
        console.log(error);
        this.errorOccured = true;
        Toaster.error((error as Error).message);
      } finally {
        this.dataLoading = false;
      }

      return;
    },
    async updateSettings(enumType: SystemSettingType, event: Event) {
      try {
        console.log(enumType);
        console.log(event);

        // this.dataLoading = true;
        this.coindDataSubmitting = enumType === SystemSettingType.CoinPrice;
        this.startOfYearDataSubmitting =
          enumType === SystemSettingType.StartDateOfSchool;
        this.endOfYearDataSubmitting =
          enumType === SystemSettingType.EndDateOfSchool;

        const addSettingsRequestDto = {
          type: enumType,
          coinPrice: enumType == 0 ? this.systemSettings.coinPrice : 0,
          month:
            enumType == 1
              ? `${this.systemSettings.startOfYear.getMonth() + 1}`.padStart(
                  2,
                  "0"
                )
              : enumType == 2
              ? `${this.systemSettings.endOfYear.getMonth() + 1}`.padStart(
                  2,
                  "0"
                )
              : null,
          year:
            enumType == 1
              ? `${this.systemSettings.endOfYear.getFullYear()}`
              : enumType == 2
              ? `${this.systemSettings.endOfYear.getFullYear()}`
              : null,
        } as AddSettingsRequestDto;

        const data = await SystemSettingsService.updateSystemSettings(
          addSettingsRequestDto
        );
        // const result = await ApiService.put(AppConstants.SYSTEMSETTINGS_URL,  addSettingsRequestDto);

        // if (result.status !== 200){
        //   Toaster.error("failed to update data")
        //   return;
        // }

        // const data = result.data as ApiResponse<systemSettingsResponse>;

        if (!data.isSuccess) {
          throw Error(data.message);
        }

        this.systemSettings = {
          coinPrice: data.data.coinPrice,
          endOfYear: new Date(data.data.endYear + "-" + data.data.endMonth),
          startOfYear: new Date(
            data.data.startYear + "-" + data.data.startMonth
          ),
        } as SystemSettings;

        Toaster.Success("Settings updated successfully !");
      } catch (error) {
        console.log(error);
      } finally {
        this.dataLoading = false;
        this.coindDataSubmitting = false;
        this.startOfYearDataSubmitting = false;
        this.endOfYearDataSubmitting = false;
      }

      return;
    },
  },
});
