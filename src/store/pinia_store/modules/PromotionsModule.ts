import {defineStore} from "pinia";
import Toaster from "@/core/services/Toaster";
import toaster from "@/core/services/Toaster";
import {AddUpdatePromotionDto, Promotion, PromotionDto} from "@/types/Promotions";
import PromotionsService from "@/core/services/PromotionsService";

import i18n from "@/core/plugins/i18n";
const t = i18n.global.t;
export const usePromotionsStore = defineStore({
    id: "promotionsStore",

    state: () => ({
        promotions: [] as PromotionDto[],
        total: 0,
        currentPage: 1,
        currentSize: 0,
        selectedPromotion: null as PromotionDto | null,
        dataIsLoading: false,
        isUpdatingItem: false,
        isCreatingNewItem: false,
    }),

    actions: {
        async loadPromotions(searchValue: string) {
            try {
                this.dataIsLoading = true;
                console.log("----------------")
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
            this.selectedPromotion = structuredClone({...selectedPromotion});
        },
        async updatePromotion(newValues: AddUpdatePromotionDto) {
            try {
                this.isUpdatingItem = true
                if (this.selectedPromotion) {
                    await PromotionsService.updatePromotion(this.selectedPromotion.id, newValues);
                } else {
                    Toaster.info("No Promotion Selected")
                }
                toaster.Success(t("success"), t("updatedSuccessfully"));
            } catch (error) {
                console.error(error);
                Toaster.error("Failed to update Promotion!")
            } finally {
                this.isUpdatingItem = false;
            }
        },
        async createPromotion(newPromotion: AddUpdatePromotionDto) {
            try {
                this.isCreatingNewItem = true;
                await PromotionsService.createPromotion(newPromotion)

                toaster.Success(t("success"), t("createdSuccessfully"));
                this.isCreatingNewItem = false;
            } catch (error) {
                console.error(error)
                toaster.error((error as Error).message)
            } finally {
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
                this.promotions = this.promotions.filter(x => x.id != promotion.id)

                toaster.Success(t("success"), t("deletedSuccessfully"));
            } catch (error) {
                console.error(error)
                toaster.error((error as Error).message)
            } finally {
                this.dataIsLoading = false;
            }
        },


        async activateDeactivatePromotion(promotion: PromotionDto, promotionState) {
            try {

                this.dataIsLoading = true;

                await PromotionsService.activatePromotion(promotion.id, promotionState);

               toaster.Success(t("success"), t("updatedSuccessfully"));

            } catch (error) {
                console.error(error)
                toaster.error((error as Error).message)
            } finally {
                this.dataIsLoading = true;
            }
        },


    },
});
