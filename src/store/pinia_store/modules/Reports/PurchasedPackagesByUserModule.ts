import { defineStore } from "pinia";
import {
  PurchasedPackageByUser,
  Filters,
  ResponseSchema,
} from "@/types/Reports/PurchasedPackagesByUser";

import purchasedPackagesByUsersService from "@/core/repositories/PurchasedPackagesByUserService";
import { safeParse } from "valibot";
import { red } from "console-log-colors";

export const usePurchasedPackagesByUserStore = defineStore({
  id: "purchasedPackagesByUsersStore",
  state: () => ({
    purchasedPackagesByUsers: [] as PurchasedPackageByUser[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    dataIsLoading: false,
  }),

  actions: {
    async loadPurchasedPackagesByUsers(params: Filters) {
      this.dataIsLoading = true;

      try {
        const res =
          await purchasedPackagesByUsersService.getPurchasedPackagesByUsers(
            params
          );
        const validation = safeParse(ResponseSchema, res.data);

        if (!validation.success) {
          console.log(red("issues: "), validation.issues);
        }
        const items = res.data.results;
        this.purchasedPackagesByUsers = items ?? [];
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
