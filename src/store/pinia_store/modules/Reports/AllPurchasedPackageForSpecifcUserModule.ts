import { defineStore } from "pinia";
import {
  PurchasedPackageBySpecificUser,
  Filters,
  ResponseSchema,
} from "@/types/Reports/AllPurchasedPackagesByUser";

import allPurchasedPackagesByUserService from "@/core/repositories/AllPurchasedPackagesByUserService";
import { safeParse } from "valibot";
import { red } from "console-log-colors";
import Toaster from "@/core/services/Toaster";
import i18n from "@/core/plugins/i18n";

export const useAllPurchasedPackagesBySpecificUserStore = defineStore({
  id: "purchasedPackagesBySpecificUserStore",
  state: () => ({
    purchasedPackagesByUsers: [] as PurchasedPackageBySpecificUser[],
    total: 0,
    dataIsLoading: false,
  }),

  actions: {
    async loadPurchasedPackagesByUsers(params: Filters) {
      if (!params.userId) {
        Toaster.error(i18n.global.t("selectUserFirst"));
        return;
      }

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
        this.total = res.data.rowsCount;
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
