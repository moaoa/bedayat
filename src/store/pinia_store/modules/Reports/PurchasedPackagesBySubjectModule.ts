import { defineStore } from "pinia";
import {
  PurchasedPackageBySubject,
  Filters,
  ResponseSchema,
} from "@/types/Reports/PurchasedPackagesBySubject";

import purchasedPackagesBySubjectService from "@/core/repositories/PurchasedPackagesBySubjectService";
import { safeParse } from "valibot";
import { red } from "console-log-colors";

export const usePurchasedPackagesBySubjectStore = defineStore({
  id: "purchasedPackagesBySubjectStore",
  state: () => ({
    purchasedPackagesBySubject: [] as PurchasedPackageBySubject[],
    total: 0,
    dataIsLoading: false,
  }),

  actions: {
    async loadPurchasedPackagesBySubject(params: Filters) {
      this.dataIsLoading = true;

      try {
        const res =
          await purchasedPackagesBySubjectService.getPurchasedPackagesBySubject(
            params
          );
        const validation = safeParse(ResponseSchema, res.data);

        if (!validation.success) {
          console.log(red("issues: "), validation.issues);
        }
        const items = res.data.results;
        this.purchasedPackagesBySubject = items ?? [];
        this.total = res.data.rowsCount;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
