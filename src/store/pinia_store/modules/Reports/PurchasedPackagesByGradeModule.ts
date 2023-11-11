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
import {
  PurchasedPackageWithCount,
  PurchasedPackageWithCountFilters,
} from "@/types/Reports/PurchasedPackagesWithCount";
import purchasedPackagesWithCountService from "@/core/repositories/PurchasedPackagesWithCountService";
import {
  PurchasedPackageByGrade,
  PurchasedPackageByGradeFilters,
} from "@/types/Reports/PurchasedPackagesByGrade";
import purchasedPackagesByGradeService from "@/core/repositories/PurchasedPackagesByGradeService";

export const usePurchasedPackagesByGradeStore = defineStore({
  id: "purchasedPackagesByGrade" + "Store",
  state: () => ({
    purchasedPackagesByGrade: [] as PurchasedPackageByGrade[],
    total: 0,
    dataIsLoading: false,
  }),

  actions: {
    async loadPurchasedPackagesByGrade(params: PurchasedPackageByGradeFilters) {
      this.dataIsLoading = true;

      try {
        console.log("test test");
        const res =
          await purchasedPackagesByGradeService.getPurchasedPackagesByGrade(
            params
          );
        const validation = safeParse(ResponseSchema, res.data);

        if (!validation.success) {
          console.log(red("issues: "), validation.issues);
        }
        const items = res.data.results;

        this.purchasedPackagesByGrade = items ?? [];
        this.total = res.data.rowsCount;
      } catch (e) {
        console.log((e as Error).message);

        console.log("testcatch exception");
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
