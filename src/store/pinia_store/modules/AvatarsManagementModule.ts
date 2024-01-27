import { defineStore } from "pinia";
import { Avatar, NewAvatarData } from "@/types/Avatar";

import { AppConstants } from "@/core/constants/ApplicationsConstants";
import AvatarRepository from "@/core/repositories/AvatarsRepository";
import Toaster from "@/core/services/Toaster";

import i18n from "@/core/plugins/i18n";
const t = i18n.global.t;
export const useAvatarsStore = defineStore({
  id: "avatarStore",

  state: () => ({
    avatars: [] as Avatar[],

    selectedAvatar: null as Avatar | null,
    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,
    errorMessage: "",
  }),

  actions: {
    async loadAvatars(params: {
      currentPage: number;
      pageSize: number;
      roleType: number | null;
    }) {
      this.dataIsLoading = true;

      try {
        const res = await AvatarRepository.getAvatars(params);
        this.avatars = res.data.data ?? [];
      } catch (e) {
        console.log(e);
      } finally {
        this.dataIsLoading = false;
      }
    },
    unselectItem() {
      this.selectedAvatar = null;
    },
    selectItem(selectedAvatar: Avatar) {
      this.selectedAvatar = selectedAvatar;
    },
    async updateItem(newValues: NewAvatarData) {
      this.isUpdatingItem = true;
      try {
        if (!this.selectedAvatar) {
          throw Error("no selected user");
        }

        const index = this.avatars.findIndex(
          (user) => user.id === this.selectedAvatar!.id
        );

        const res = await AvatarRepository.updateAvatar(
          this.selectedAvatar.id,
          newValues
        );

        this.avatars[index] = { ...res.data.data, id: this.selectedAvatar.id };
        this.isUpdatingItem = false;
      } catch (error) {
        this.isUpdatingItem = false;
        console.log(error);
      }
    },
    async createNewItem(data: NewAvatarData) {
      this.isCreatingNewItem = true;
      try {
        const res = await AvatarRepository.createAvatar(data);

        if (res) {
          this.avatars.push({ ...res, roleType: data.roleType });
        }

        Toaster.Success(t("success"), t("createdSuccessfully"));
      } catch (error) {
        console.log(error);
      } finally {
        this.isCreatingNewItem = false;
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;
      try {
        await AvatarRepository.deleteAvatar(this.selectedAvatar!.id);
        const index = this.avatars.findIndex(
          (item) => item.id === this.selectedAvatar!.id
        );
        this.avatars.splice(index, 1);
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
