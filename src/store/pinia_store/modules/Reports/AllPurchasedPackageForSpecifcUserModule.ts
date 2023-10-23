import { defineStore } from "pinia";
import {
  PurchasedPackageBySpecificUser,
  Filters,
  ResponseSchema,
} from "@/types/Reports/AllPurchasedPackagesByUser";

import allPurchasedPackagesByUserService from "@/core/repositories/AllPurchasedPackagesByUserService";
import { safeParse } from "valibot";
import { red } from "console-log-colors";

export const useAllPurchasedPackagesBySpecificUserStore = defineStore({
  id: "purchasedPackagesBySpecificUserStore",
  state: () => ({
    purchasedPackagesByUsers: [] as PurchasedPackageBySpecificUser[],
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
          await allPurchasedPackagesByUserService.getAllPurchasedPackagesByUser(
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
