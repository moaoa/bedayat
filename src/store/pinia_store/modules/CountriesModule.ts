import { defineStore } from "pinia";
import type { Country, NewCountryData } from "@/types/Countries";
import type { ApiResponse, PagedList } from "@/types/ApiResponse";

import ApiService from "@/core/services/ApiService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import Toaster from "@/core/services/Toaster";

export const useCountriesStore = defineStore({
  id: "countriesStore",

  state: () => ({
    countries: [] as Country[],
    selectedCountry: null as Country | null,
    dataIsLoading: false,
    errorMessage: "",
    isDeletingItem: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
  }),

  actions: {
    async loadCountries() {
      try {
      this.dataIsLoading = true;
        const result = await ApiService.get(AppConstants.COUNTRIES_URL);
        const data = result.data as ApiResponse<Country[]>;

        if (!data.isSuccess) {
          Toaster.error("حدث خطأ", "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة");
          return;
        }

        this.countries = data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.dataIsLoading = false;
      }
    },
    selectCountry(selectedCountry: Country) {
      this.selectedCountry = selectedCountry;
    },
    /** this method will set the selected country to null */
    unselectCountry() {
      this.selectedCountry = null;
    },
    async createNewItem(item: NewCountryData) {
      this.isCreatingNewItem = true;
      try {
        const res = await ApiService.post(AppConstants.COUNTRIES_URL, {
          name: item.name,
          englishName: item.englishName,
        });
        const data = res.data as ApiResponse<Country>;

        if (!data.isSuccess) {
          throw Error(data.message);
        }

        this.countries.push(data.data);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async deleteItem() {
      if (!this.selectedCountry) {
        Toaster.error("", "");
      }

      this.isDeletingItem = true;

      try {
        const res = await ApiService.delete(
          `${AppConstants.COUNTRIES_URL}/${this.selectedCountry?.id}`
        );

        const data = res.data as ApiResponse<unknown>;

        if (!data.isSuccess) {
          Toaster.error("حدث خطأ", "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة");
          return;
        }
        const index = this.countries.findIndex(
          (country) => country.id === this.selectedCountry?.id
        );

        if (index === -1) return;
        this.countries.splice(index, 1);
      } catch (error) {
        Toaster.error("حدث خطأ", "حدث خطأ أثناء جلب بيانات الأسئلة الشائعة");
      } finally {
        this.isDeletingItem = false;
      }
    },
    async updateItem(newValues: NewCountryData) {
      if (!this.selectedCountry) {
        throw Error("no selected country");
      }

      try {
        this.isUpdatingItem = true;

        const res = await ApiService.put(
          `${AppConstants.COUNTRIES_URL}/${this.selectedCountry.id}`,
          {
            ...newValues,
          }
        );

        const data = res.data as ApiResponse<unknown>;

        if (!data.isSuccess) {
          Toaster.error(data.message!, data.message);
        }

        const index = this.countries.findIndex(
          (country) => this.selectedCountry?.id === country.id
        );

        this.countries.splice(index, 1, {
          ...this.selectedCountry!,
          ...newValues,
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.isUpdatingItem = false;
      }
    },
  },
});
