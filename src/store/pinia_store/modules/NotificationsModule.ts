import { useI18n } from "vue-i18n";
import { defineStore } from "pinia";

import { AppConstants } from "@/core/constants/ApplicationsConstants";
import NotificationsService from "@/core/repositories/NotificationsService";
import Toaster from "@/core/services/Toaster";
import {
  NewNotificationPayload,
  NotificationFilters,
  User,
} from "@/types/Notifications";

export const useNotificationsStore = defineStore({
  id: "notificationsStore",

  state: () => ({
    users: [] as User[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadUsers(params: NotificationFilters) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const users = await NotificationsService.filterUsers(params);
        this.users = users ?? [];
      } catch (e) {
        Toaster.error((e as Error).message);
        console.log(e);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async sendNotification(notificationPayload: NewNotificationPayload) {
      this.isCreatingNewItem = true;
      try {
        const res = await NotificationsService.sendNotification(
          notificationPayload
        );

        Toaster.Success("notificationWasSentSuccessfully");
      } catch (error) {
        Toaster.error((error as Error).message);
        console.log(error);
      } finally {
        this.isCreatingNewItem = false;
      }
    },
  },
});
