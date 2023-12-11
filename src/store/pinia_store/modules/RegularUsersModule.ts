import { defineStore } from "pinia";
import { User } from "@/types/User";

import { AppConstants } from "@/core/constants/ApplicationsConstants";
import UsersService from "@/core/services/UsersService";
import Toaster from "@/core/services/Toaster";

export const useRegularUsersStore = defineStore({
  id: "regularUsersStore",

  state: () => ({
    users: [] as User[],
    selectedFamilyParents: [] as User[],
    selectedFamilyChildren: [] as User[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    selectedUserType: AppConstants.USER_ROLES.Parent as number,
    dataIsLoading: false,
    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    async loadUsers(
      searchBy: number,
      searchValue: string,
      userState: number,
      pageNumber?: number,
      pageSize?: number
    ) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        if (this.selectedUserType === AppConstants.USER_ROLES.Teacher) {
          const res = await UsersService.searchTeacher(
            searchBy,
            searchValue,
            userState,
            pageNumber,
            pageSize
          );
          this.users = res.results ?? [];
          this.pagination.total = res.rowsCount;
        } else if (this.selectedUserType === AppConstants.USER_ROLES.Parent) {
          const res = await UsersService.searchParents(
            searchBy,
            searchValue,
            userState,
            pageNumber,
            pageSize
          );
          this.users = res.results ?? [];
          this.pagination.total = res.rowsCount;
        } else if (this.selectedUserType === AppConstants.USER_ROLES.Child) {
          const res = await UsersService.searchChildren(
            searchBy,
            searchValue,
            userState,
            pageNumber,
            pageSize
          );
          this.users = res ?? [];
        } else {
          throw Error("only filter by teacher, parent or child");
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async searchParents(searchValue: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const res = await UsersService.searchParents(
          AppConstants.FILTER_USER_BY_OPTIONS.ALL,
          searchValue,
          AppConstants.USER_STATE.All,
          1,
          10
        );
        this.users = res.results ?? [];
      } catch (e) {
        console.log(e);
      } finally {
        this.dataIsLoading = false;
      }
    },
    async geUserFamily(userId: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const res = (await UsersService.getUserFamily(userId)) ?? [];

        this.selectedFamilyParents = res.filter(
          (member) => member.role === AppConstants.USER_ROLES.Parent
        );
        this.selectedFamilyChildren = res.filter(
          (member) => member.role === AppConstants.USER_ROLES.Child
        );
      } catch (e) {
        this.errorLoadingData = true;
        this.errorMessage =
          (e as Error).message ?? "حدث خطأ أثناء محاولة تحميل البيانات";
      } finally {
        this.dataIsLoading = false;
      }
    },
  },
});
