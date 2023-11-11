import { defineStore } from "pinia";
import {
  PurchasedPackageByPackage,
  Filters,
  ResponseSchema,
} from "@/types/Reports/PurchasedPackagesByPackage";

import purchasedPackagesByPackagesService from "@/core/repositories/PurchasedPackagesByPackageService";
import { safeParse } from "valibot";
// @ts-ignore
import { red } from "console-log-colors";

export const usePurchasedPackagesByPackageStore = defineStore({
  id: "purchasedPackagesByPackagesStore",
  state: () => ({
    purchasedPackagesByPackages: [] as PurchasedPackageByPackage[],
    total: 0,
    dataIsLoading: false,
  }),

  actions: {
    async loadPurchasedPackagesByPackages(params: Filters) {
      this.dataIsLoading = true;

      try {
        const res =
          await purchasedPackagesByPackagesService.getPurchasedPackagesByPackages(
            params
          );
        const validation = safeParse(ResponseSchema, res.data);

        if (!validation.success) {
          console.log(red("issues: "), validation.issues);
        }
        const items = res.data.results;
        this.purchasedPackagesByPackages = items ?? [];
        this.total = res.data.rowsCount;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
