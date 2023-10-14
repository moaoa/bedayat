import { defineStore } from "pinia";
import { Locality, NewLocalityData } from "@/types/Localities";
import { City } from "@/types/Cities";
import LocalitiesService from "@/core/services/LocalitiesService";
import Toaster from "@/core/services/Toaster";
import toaster from "@/core/services/Toaster";
import localitiesService from "@/core/services/LocalitiesService";
import {AddUpdatePromotionDto, Promotion, PromotionDto} from "@/types/Promotions";
import PromotionsService from "@/core/services/PromotionsService";
import promotionsService from "@/core/services/PromotionsService";
export const usePromotionsStore = defineStore({
  id: "promotionsStore",

  state: () => ({
    promotions: [] as PromotionDto[],
    total: 0,
    currentPage: 1,
    currentSize: 0,
    selectedPromotion: null as PromotionDto | null,
    dataIsLoading: false,
    isUpdatingItem : false,
    isCreatingNewItem : false,
  }),

  actions: {
    async loadPromotions(searchValue: string) {
      try {
        this.dataIsLoading = true;

        const result = await PromotionsService.loadPromotions(searchValue);

        this.promotions = result;
        this.dataIsLoading = false;
      } catch (error) {
        toaster.error((error as Error).message)
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectPromotion() {
      this.selectedPromotion = null;
    },
    selectPromotion(selectedPromotion: PromotionDto) {

      // @ts-ignore
      this.selectedPromotion = structuredClone({ ...selectedPromotion });
    },
     async updatePromotion(newValues: AddUpdatePromotionDto)  {
       try {

        if (this.selectedPromotion){
          await PromotionsService.updatePromotion(this.selectedPromotion.id, newValues);
          await this.loadPromotions('')
        }else{
          Toaster.info("No Promotion Selected")
        }
        Toaster.Success("Promotion Updated Succesfully!")
      } catch (error) {
        console.error(error);
        Toaster.error("Failed to update Promotion!")
      }finally{
        this.isUpdatingItem = false;
      }
    },
    async createPromotion(newPromotion: AddUpdatePromotionDto) {
      try {
      this.isCreatingNewItem = true;
        await PromotionsService.createPromotion(newPromotion)

        Toaster.Success("Promotion Created Successfully")
        this.isCreatingNewItem = false;
      }catch (error) {
        console.error(error)
        toaster.error((error as Error).message)
      }finally {
        this.isCreatingNewItem = false;
      }
    },
    async deleteItem(promotion: PromotionDto) {
      try {
        this.dataIsLoading = true;
        const index = this.promotions.findIndex(
            (promotion) => promotion.id === promotion.id
        );
        if (index === -1) return toaster.info("no item was selected");

        await PromotionsService.deletePromotion(promotion.id);

        // this.localities.splice(index, 1);
        Toaster.Success("Promotion Deleted Successfully")
      }catch (error){
        console.error(error)
        toaster.error((error as Error).message)
      }finally {
        this.dataIsLoading = true;
      }
    },


    async activateDeactivatePromotion(promotion: PromotionDto,  promotionState) {
      try {

        this.dataIsLoading = true;

        await PromotionsService.activatePromotion(promotion.id, promotionState);

        Toaster.Success("Promotion status changed")

      }catch (error){
        console.error(error)
        toaster.error((error as Error).message)
      }finally {
        this.dataIsLoading = true;
      }
    },


  },
});
