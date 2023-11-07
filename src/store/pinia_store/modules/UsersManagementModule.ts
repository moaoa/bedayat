import { useI18n } from "vue-i18n";
import { defineStore } from "pinia";
import {
  User,
  NewUserData,
  FilterByOptionsValues,
  RoleValues,
} from "@/types/User";

import { AppConstants } from "@/core/constants/ApplicationsConstants";
import UsersService from "@/core/services/UsersService";
import Toaster from "@/core/services/Toaster";
import NotificationsService from "@/core/repositories/NotificationsService";

export const useUsersStore = defineStore({
  id: "usersStore",

  state: () => ({
    users: [] as User[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    filterBy: AppConstants.FILTER_ADMIN_BY_OPTIONS
      .ByName as FilterByOptionsValues,
    filters: {
      selectedUserRole: AppConstants.USER_ROLES.Admin as RoleValues,
    },
    searchValue: "",
    isSwitchingUserStatus: false,
    isLoadingRegularUsers: false,
    isSendingNotification: false,

    selectedUser: null as User | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,
    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadAdmins() {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        if (this.filterBy === AppConstants.FILTER_ADMIN_BY_OPTIONS.ByName) {
          const res = await UsersService.getAdminsByName(this.searchValue);
          this.users = res.data.results ?? [];
        } else {
          const res = await UsersService.getAdminsByPhone(this.searchValue);
          this.users = res.data.results ?? [];
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.dataIsLoading = false;
      }
    },

    async loadUsers() {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        if (this.filterBy === AppConstants.FILTER_ADMIN_BY_OPTIONS.ByName) {
          const res = await UsersService.getAdminsByName(this.searchValue);
          this.users = res.data.results ?? [];
        } else {
          const res = await UsersService.getAdminsByPhone(this.searchValue);
          this.users = res.data.results ?? [];
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async toggleUserStatus(user: User) {
      this.isSwitchingUserStatus = true;
      try {
        await UsersService.changeUserStatus(user, user.isDisabled);
        this.isSwitchingUserStatus = false;
      } catch (error) {
        this.isSwitchingUserStatus = false;
        console.log(error);
      }
    },
    unselectUser() {
      this.selectedUser = null;
    },
    selectUser(selectedUser: User) {
      this.selectedUser = selectedUser;
    },
    async updateItem(newValues: Omit<NewUserData, "email" | "password">) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedUser) {
          throw Error("no selected user");
        }

        const index = this.users.findIndex(
          (user) => user.id === this.selectedUser!.id
        );

        await UsersService.updateUser(this.selectedUser.id, newValues);

        this.users[index] = { ...this.selectedUser, ...newValues };
        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log(error);
      }
    },
    async createNewItem(userData: NewUserData) {
      this.isCreatingNewItem = true;
      try {
        const res = await UsersService.createUser(userData);

        if (res.data.results) {
          this.users.push(...res.data.results);
        }

        Toaster.Success("User created successfully");
      } catch (error) {
        console.log(error);
      } finally {
        this.isCreatingNewItem = false;
      }
    },
  },
});
