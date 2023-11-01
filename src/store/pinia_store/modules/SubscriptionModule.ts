import { defineStore } from "pinia";
import { CourseSection, NewCourseSectionData } from "@/types/CourseSection";

import courseSectionService from "@/core/repositories/CourseSectionsService";
import { useLocalStorage } from "@vueuse/core";
import CourseSectionServise from "@/core/repositories/CourseSectionsService";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import {GetPackagesResponseDto, Package} from "@/types/Packages/Packages";
import {NewSubscriptionData, Subscription} from "@/types/Subscription";
import SubscriptionService from "@/core/repositories/SubscriptionService";
import Subscriptions from "@/views/Packages/Subscriptions/Subscriptions.vue";
import Toaster from "@/core/services/Toaster";
import {t} from "element-plus/es/locale";
import router from "@/router";

export const useSubscriptionStore = defineStore({
  id: "subscriptionStore",
  state: () => ({
    subscriptions: [] as Subscription[],
    pagination: {
      total: 0,
      currentPage: 1,
      currentSize: 0,
    },
    selectedPackage: useLocalStorage<Partial<GetPackagesResponseDto>>(
      "selectedPackage",
      {}
    ),
    selectedSubscription: useLocalStorage<Partial<Subscription>>(
        "selectedSubscription",
        {}
    ),
    gradeTypeOfCurentCourseOrSection: AppConstants.GradeTypes.Yearly,

    dataIsLoading: false,
    isCreatingNewItem: false,
    isUpdatingItem: false,
    isDeletingItem: false,

    errorMessage: "",
    errorLoadingData: false,
  }),

  actions: {
    unselectSubscription() {
      this.selectedSubscription = {};
    },
    selectSubscription(subscriptionToSelect: Subscription) {
      this.selectedSubscription = subscriptionToSelect;
    },
    unselectPackage() {
      this.selectedPackage = {};
    },
    selectPackage(subscriptionToSelect: GetPackagesResponseDto) {
      this.selectedPackage = subscriptionToSelect;
    },

    async loadSubscriptions(packageId: string) {
      this.dataIsLoading = true;
      this.errorLoadingData = false;

      try {
        const items = await SubscriptionService.getSubscriptions(packageId);

        this.subscriptions = items ?? [];
      } catch (e) {
        console.log((e as Error).message);
      } finally {
        this.dataIsLoading = false;
      }
    },

    async createNewItem(newData: NewSubscriptionData) {
      this.isCreatingNewItem = true;
      try {
        const res = await SubscriptionService.createSubscriptions(newData);

        this.subscriptions.push(res.data.data);
        this.isCreatingNewItem = false;
        Toaster.Success(t("success"), t("createdNewItem"));
        await router.push({
          name:"Subscriptions"
        })
      } catch (error) {
        this.isCreatingNewItem = false;
        console.log(error);
        throw error;
      }
    },
    async updateItem(newValues: NewSubscriptionData) {
      this.isUpdatingItem = true;

      this.isCreatingNewItem = true;
      try {
        if (!this.selectedSubscription) {
          throw Error("no selected course");
        }

        const index = this.subscriptions.findIndex(
          (course) => course.id === this.selectedSubscription!.id
        );

        if (this.selectedSubscription.id === undefined) {
          return;
        }

        await SubscriptionService.updateSubscriptions(this.selectedSubscription.id, newValues);

        this.subscriptions[index] = {
          ...(this.selectedSubscription as Subscription),
          ...newValues,
        };
        this.unselectSubscription();
        await router.push({
          name:"Subscriptions"
        })
      } catch (error) {
        console.log(error);
      }finally {

        this.isUpdatingItem = false;
        this.isCreatingNewItem = false;
      }
    },
    async deleteItem() {
      this.isDeletingItem = true;

      try {
        if (!this.selectedSubscription) {
          console.error("no course selected");
          return;
        }

        if (!this.selectedSubscription.id) {
          return;
        }

        await SubscriptionService.deleteSubscription(
          this.selectedSubscription.id
        );
        this.subscriptions = this.subscriptions.filter(
          (item) => item.id !== this.selectedSubscription?.id
        );
        this.unselectSubscription();
        Toaster.Success("success", "deletedItem");
      } catch (error) {
        console.log(error);
      } finally {
        this.isDeletingItem = false;
      }
    },
  },
});
