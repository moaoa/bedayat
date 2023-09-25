import { defineStore } from "pinia";
import { Locality, NewLocalityData } from "@/types/Localities";
import { City } from "@/types/Cities";
export const useLocalitiesStore = defineStore({
  id: "localitiesStore",

  state: () => ({
    localities: [] as Locality[],
    total: 0,
    currentPage: 1,
    currentSize: 0,
    selectedLocality: null as Locality | null,
    selectedCountry: null as City | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadLocalities() {
      try {
        this.dataIsLoading = true;
        this.errorLoadingData = false;

        // const result = await ApiService.get(AppConstants.localities_URL);
        // const data = result.data as ApiResponse<PagedList<Locality>>;

        setTimeout(() => {
          //TODO: REMOVE THIS
          const data = {
            isSuccess: true,
            total: 100,
            currentPage: 1,
            currentSize: 10,
            localities: [
              {
                id: "1",
                name: "asdf",
                englishName: "asdf",
                cityId: "1asdf",
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
              },
              {
                id: "2",
                name: "asdf",
                englishName: "asdf",
                cityId: "1asdf",
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
              },
            ] as Locality[],
            message: "",
          };

          this.total = data.total;
          this.currentPage = data.currentPage;
          this.currentSize = data.currentSize;

          this.localities = data.localities;
          this.dataIsLoading = false;
        }, 2000);
      } catch (e) {
        this.errorLoadingData = true;
        this.errorMessage =
          (e as Error).message ?? "حدث خطأ أثناء محاولة تحميل البيانات";
      } finally {
        //TODO: uncomment this
        // this.dataIsLoading = false;
      }
    },
    unselectLocality() {
      this.selectedLocality = null;
    },
    selectLocality(selectedLocality: Locality) {
      this.selectedLocality = structuredClone({ ...selectedLocality });
    },
    updateItem(newValues: NewLocalityData) {
      this.isUpdatingItem = true;
      return new Promise((res) => {
        setTimeout(() => {
          if (this.selectedLocality) {
            const index = this.localities.findIndex(
              (locality) => locality.id === this.selectedLocality!.id
            );
            this.localities[index] = { ...this.selectedLocality, ...newValues };
          }
          this.isUpdatingItem = false;
          return res(true);
        }, 2000);
      });
    },
    async createNewItem(localityData: NewLocalityData) {
      this.isCreatingNewItem = true;
      return new Promise((res) => {
        setTimeout(() => {
          const newLocality: NewLocalityData = {
            ...localityData,
          };
          const locality: Locality = {
            id: this.localities.length + 1 + "",
            name: newLocality.name,
            englishName: newLocality.englishName,
            cityId: newLocality.cityId,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          };
          this.localities.push(locality);
          this.isCreatingNewItem = false;
          return res(true);
        }, 2000);
      });
    },
    async deleteItem(localityToDelete: Locality) {
      const index = this.localities.findIndex(
        (locality) => locality.id === localityToDelete.id
      );

      if (index === -1) return "this item was not deleted";

      this.localities.splice(index, 1);

      return "deleted successfully";
    },
  },
});
