import { defineStore } from "pinia";
import {
  PurchasedPackageByUser,
  Filters,
  ResponseSchema,
} from "@/types/Reports/PurchasedPackagesByUser";

import purchasedPackagesByUsersService from "@/core/repositories/PurchasedPackagesByUserService";

// @ts-ignore
import { safeParse } from "valibot";
// @ts-ignore
import { red } from "console-log-colors";
import {PurchasedPackageWithCount, PurchasedPackageWithCountFilters} from "@/types/Reports/PurchasedPackagesWithCount";
import purchasedPackagesWithCountService from "@/core/repositories/PurchasedPackagesWithCountService";

export const usePurchasedPackagesWithCountStore = defineStore({
  id: "purchasedPackagesWithCount" +
      "Store",
  state: () => ({
    purchasedPackagesWithCount: [] as PurchasedPackageWithCount[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    dataIsLoading: false,
  }),

  actions: {
    async loadPurchasedPackagesWithCount(params: PurchasedPackageWithCountFilters) {
      this.dataIsLoading = true;

      try {
        const res =
          await purchasedPackagesWithCountService.getPurchasedPackagesWithCount(
            params
          );
        const validation = safeParse(ResponseSchema, res.data);

        if (!validation.success) {
          console.log(red("issues: "), validation.issues);
        }
        const items = res.data.results;
        this.purchasedPackagesWithCount = items ?? [];
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
