import { defineStore } from "pinia";
import { Locality, NewLocalityData } from "@/types/Localities";
import { City } from "@/types/Cities";
import LocalitiesService from "@/core/services/LocalitiesService";
import Toaster from "@/core/services/Toaster";
import toaster from "@/core/services/Toaster";
import localitiesService from "@/core/services/LocalitiesService";
export const useLocalitiesStore = defineStore({
  id: "localitiesStore",

  state: () => ({
    localities: [] as Locality[],
    selectedCityId: "",
    total: 0,
    currentPage: 1,
    currentSize: 0,
    selectedLocality: null as Locality | null,
    selectedCountry: null as City | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    // errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadLocalities(cityId: string) {
      try {
        this.dataIsLoading = true;
        this.errorLoadingData = false;

        const result = await LocalitiesService.loadLocalities(cityId);
        console.log(result);
        
        this.localities = result;
        
        this.dataIsLoading = false;
      } catch (error) {
        this.errorLoadingData = true;
        toaster.error((error as Error).message)
          Toaster.error("failed to load localities")
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectLocality() {
      this.selectedLocality = null;
    },
    selectLocality(selectedLocality: Locality) {
      this.selectedLocality = structuredClone({ ...selectedLocality });
    },
     async updateItem(newValues: NewLocalityData)  {
       try {
        this.isUpdatingItem = true;

        if (this.selectedLocality){
          await LocalitiesService.updateLocality(this.selectedLocality.id, newValues);
          await this.loadLocalities(this.selectedCityId)
        }else{
          Toaster.info("No locality Selected")
        }
        Toaster.Success("Locality Updated Succesfully!")
      } catch (error) {
        console.error(error);
        Toaster.error("Failed to update locality!")
      }finally{
        this.isUpdatingItem = false;
      }
    },
    async createNewItem(newLocality: NewLocalityData) {
      try {
      this.isCreatingNewItem = true;
        await localitiesService.createLocality(newLocality)

        Toaster.Success("Locality Created Successfully")
        this.isCreatingNewItem = false;
      }catch (error) {
        console.error(error)
        toaster.error((error as Error).message)
      }
    },
    async deleteItem(localityToDelete: Locality) {
      try {

        const index = this.localities.findIndex(
            (locality) => locality.id === localityToDelete.id
        );
        if (index === -1) return toaster.info("no item was selected");

        await LocalitiesService.deleteLocality(localityToDelete.id);

        // this.localities.splice(index, 1);
        Toaster.Success("Locality Deleted Successfully")
      }catch (error){
        console.error(error)
        toaster.error((error as Error).message)
      }
    },
  },
});
