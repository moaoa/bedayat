import { defineStore } from "pinia";
import { City, NewCityData } from "@/types/Cities";
import { Country } from "@/types/Countries";

import CitiesService from "@/core/repositories/CitiesService";
import Toaster from "@/core/services/Toaster";
import CountriesService from "@/core/repositories/CountriesService";

export const useCitiesStore = defineStore({
  id: "citiesStore",

  state: () => ({
    cities: [] as City[],
    selectedCountryId: "",
    total: 0,
    currentPage: 1,
    currentSize: 0,
    selectedCity: null as City | null,
    selectedCountry: null as Country | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,
    errorMessage: "",
    errorLoadingData: false
  }),

  actions: {
    async loadCities({ countryId }: { countryId: string }) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const result = await CountriesService.getCountryWithCities(countryId);
        const data = result.data;
        this.cities = data.data.cities;
      } catch (e) {
        this.errorLoadingData = true;
        this.errorMessage =
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
        await CitiesService.deleteCity(cityToDelete.id);

        this.cities.splice(index, 1);
      } catch (error) {
        Toaster.error("failed to add city", (error as Error).message);
      } finally {
        this.isDeletingItem = false;
      }
    }
  }
});
