import { defineStore } from "pinia";
import { City, NewCityData } from "@/types/Cities";
import { Country } from "@/types/Countries";

import CitiesService from "@/core/repositories/CitiesService";
import Toaster from "@/core/services/Toaster";
import CountriesService from "@/core/repositories/CountriesService";
import {Faq, FaqCategory} from "@/types/Faq";
import FaqService from "@/core/services/FaqService";

export const useFaqStore = defineStore({
  id: "faqStore",

  state: () => ({
    faqs: [] as Faq[],
    selectedCountryId: "",
    total: 0,
    currentPage: 1,
    currentSize: 0,
    selectedCity: null as City | null,
    dataIsLoading: false,
  }),

  actions: {
    async loadFaqs(category: FaqCategory) {
      this.dataIsLoading = true;

      try {
        const result = await FaqService.getFaqs(category);
        this.faqs = result.data;
      } catch (e) {
          (e as Error).message ?? "حدث خطأ أثناء محاولة تحميل البيانات";
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectCity() {
      this.selectedCity = null;
    },
    selectCity(selectedCity: City) {
      this.selectedCity =  {...selectedCity};
    },
    updateItem(newValues: NewCityData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedCity) {
          Toaster.error("this item was not deleted", "this item was not deleted")
          return;
        }

        const index = this.cities.findIndex(
          (city) => city.id === this.selectedCity?.id
        );

        const updateResult=CitiesService.updateCity(this.selectedCity.id, newValues);

        this.cities[index] = { ...this.selectedCity, ...updateResult };
        this.cities[index] = { ...this.selectedCity, ...newValues };
      } catch (error) {
        Toaster.error("failed to update city",(error as Error).message);
      } finally {
        this.isUpdatingItem = false;
      }
    },
    async createNewItem(cityData: NewCityData) {
      this.isCreatingNewItem = true;
      try {
        const res = await CitiesService.createCity(cityData);
        this.cities.push(res);
      } catch (error) {
        Toaster.error("failed to add city",(error as Error).message);
      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async deleteItem(cityToDelete: City) {
      this.isDeletingItem = true;
      try {
        const index = this.cities.findIndex(
          (city) => city.id === cityToDelete.id
        );

        if (index === -1) {
          Toaster.error("this item was not deleted", "this item was not deleted")
          return;
        }
        const result = await CitiesService.deleteCity(cityToDelete.id);


      } catch (error) {
        Toaster.error("failed to delete city", (error as Error).message);
      } finally {
        this.isDeletingItem = false;
      }
    }
  }
});
