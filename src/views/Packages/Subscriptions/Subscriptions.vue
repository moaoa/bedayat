<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("subscriptions") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="subscriptionStore.loadSubscriptions(packageId)"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a
          href="#"
          class="btn btn-sm btn-primary mx-1"
          target="#"
          :data-bs-target="`#kt_modal_add_item`"
        >
          <RouterLink
              class="text-white"
              :to="{
                name: 'AddSubscription',

                  params: { id: packageId },
              }"
          >

            {{ $t("addNewSubscription") }}
          </RouterLink>
        </a>

        <!--end::Menu-->
      </div>


    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="subscriptionStore.dataIsLoading" class="card-body pt-2">
      <!-- begin::table -->

      <el-table :data="subscriptionsTable" style="width: 100%" height="500">
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Subscription, $index: number }">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>



        <el-table-column
          prop="title"
          :label="$t('title')"
          width="150"
          align="center"
          header-align="center"
        >
          <template v-slot="scope: { row: Subscription, $index: number }">
            <ClippedText :text="scope.row.title" />
          </template>
        </el-table-column>

        <el-table-column
          prop="englishTitle"
          :label="$t('englishTitle')"
          width="150"
          align="center"
        >
          <template v-slot="scope: { row: Subscription, $index: number }">
            <ClippedText :text="scope.row.englishTitle" />
          </template>
        </el-table-column>

        <el-table-column
            prop="details"
            :label="$t('details')"
            width="150"
            align="center"
            header-align="center"
        >
          <template v-slot="scope: { row: Subscription, $index: number }">
            <ClippedText :text="scope.row.details" />
          </template>
        </el-table-column>

        <el-table-column
            prop="englishDetails"
            :label="$t('englishDetails')"
            width="150"
            align="center"
            header-align="center"
        >
          <template v-slot="scope: { row: Subscription, $index: number }">
            <ClippedText :text="scope.row.englishDetails" />
          </template>
        </el-table-column>



        <el-table-column
            prop="subTitle"
            :label="$t('subTitle')"
            width="150"
            align="center"
            header-align="center"
        >
          <template v-slot="scope: { row: Subscription, $index: number }">
            <ClippedText :text="scope.row.subTitle" />
          </template>
        </el-table-column>

        <el-table-column
            prop="englishSubTitle"
            :label="$t('englishSubTitle')"
            width="150"
            align="center"
            header-align="center"
        >
          <template v-slot="scope: { row: Subscription, $index: number }">
            <ClippedText :text="scope.row.englishSubTitle" />
          </template>
        </el-table-column>

        <el-table-column
            prop="period"
            :label="$t('period')"
            width="150"
            align="center"
            header-align="center"
        />
        <el-table-column
            prop="price"
            :label="$t('price')"
            width="100"
            align="center"
            header-align="center"
        />

        <el-table-column
            prop="discount"
            :label="$t('discount')"
            width="100"
            align="center"
            header-align="center"
        />
        <el-table-column
            prop="fakePrice"
            :label="$t('fakePrice')"
            width="100"
            align="center"
            header-align="center"
        />

        <el-table-column
          :label="$t('edit')"
          width="90"
          align="center"
          header-align="center"
        >
          <template v-slot="scope: { row: Subscription, $index: number }">
            <RouterLink
              :to="{
                name: 'EditSubscriptions',
                params: { id: scope.row.id },
              }"
            >
              <a
                class="btn btn-icon btn-light-success btn-sm"
                @click="selectSubscription(scope.row)"
              >
                <i class="bi bi-pencil"></i>
              </a>
            </RouterLink>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('remove')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Subscription, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_item`"
                @click="selectSubscription(scope.row)"
              >
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- end::table -->

      <!-- start::pagination -->
      <br />
      <!-- start::pagination -->
      <!-- <el-pagination
        v-if="!sectionsStore.dataIsLoading && sectionsStore.sections"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="sectionsStore.sections.length"
      /> -->
      <!-- end::pagination -->
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteSubscriptionModal></DeleteSubscriptionModal>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { CourseSection } from "@/types/CourseSection";
import CreateSectionForm from "@/views/CourseSections/AddCourseSectionModal.vue";
import UpdateSectionForm from "@/views/CourseSections/UpdateCourseSectionModal.vue";
import DeleteSection from "@/views/CourseSections/DeleteSectionModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useCourseSectionsStore } from "@/store/pinia_store/modules/CourseSectionModule";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ClippedText from "@/components/ClippedText.vue";
import router from "@/router";
import mapIndexToSectionLabel from "@/core/helpers/mapIndexToSectionLabel";
import {useSubscriptionStore} from "@/store/pinia_store/modules/SubscriptionModule";
import {Subscription} from "@/types/Subscription";
import {useSubscriptionSettingsStore} from "@/store/pinia_store/modules/SubscriptionSettings";
import DeleteSubscriptionModal from "@/views/Packages/Subscriptions/DeleteSubscriptionModal.vue";

const { t } = useI18n();
const subscriptionStore = useSubscriptionStore();
const coursesStore = useCoursesStore();
const subscriptionSettingsStore = useSubscriptionSettingsStore();
subscriptionSettingsStore.getSubscriptionSettings()
const packageId = router.currentRoute.value.params.id as string;

const subscriptionsTable = computed(() => subscriptionStore.subscriptions);

subscriptionStore.loadSubscriptions(packageId);

const selectSubscription = (subscriptionService: Subscription) => {
  subscriptionStore.selectSubscription(subscriptionService);
};

const unselectSubscription = () => {
  subscriptionStore.unselectSubscription();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (section: CourseSection) => formatDate(section[key]);
};

setCurrentPageBreadcrumbs(
  coursesStore.selectedPackage.title?.slice(0, 30) || t("subscription"),
  [t("subscriptions")]
);
</script>
