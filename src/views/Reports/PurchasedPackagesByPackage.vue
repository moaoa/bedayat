<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">
        {{ $t("purchasedPackagesByUser") }}
      </h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="loadPackagesReport"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div
      v-loading="purchasedPackagesByPackageStore.dataIsLoading"
      class="card-body pt-2"
    >
      <!-- begin::table -->

      <div class="d-flex gap-4 alig-items-center flex-wrap">
        <div>
          <lable class="d-flex flex-column">
            {{ $t("fromDate") }}
            <el-date-picker
              :placeholder="$t('fromDate')"
              v-model="filters.fromDate"
              style="width: 300px"
            >
            </el-date-picker>
          </lable>
        </div>
        <div>
          <lable class="d-flex flex-column">
            {{ $t("toDate") }}
            <el-date-picker
              :placeholder="$t('toDate')"
              v-model="filters.toDate"
              style="width: 300px"
            >
            </el-date-picker>
          </lable>
        </div>
        <div>
          <lable class="d-flex flex-column">
            {{ $t("checkExpiryDate") }}
            <el-switch v-model="filters.checkExpiryDate" style="width: 300px">
            </el-switch>
          </lable>
        </div>
      </div>
      <div class="mt-8">{{ $t("totalPurchases") }} : {{ totalPurchases }}</div>
      <div
        v-loading="purchasedPackagesByPackageStore.dataIsLoading"
        class="card-body pt-2"
      >
        <el-table :data="tableData" style="width: 100%" height="400">
          <el-table-column
            index="scope.$index"
            :label="t('noNumber')"
            width="55"
            align="center"
            header-align="center"
          >
            <template
              #default="scope: {
                row: PurchasedPackageByPackage,
                $index: number,
              }"
            >
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="title" :label="$t('title')" width="120" />
          <el-table-column
            prop="englishTitle"
            :label="$t('englishTitle')"
            width="120"
          />
          <el-table-column
            prop="englishName"
            :label="$t('englishName')"
            width="120"
          />
          <el-table-column
            prop="userName"
            :label="$t('userName')"
            width="120"
          />
          <el-table-column prop="price" :label="$t('price')" width="120" />
          <el-table-column
            prop="numberOfPurchases"
            :label="$t('numberOfPurchases')"
            width="150"
          />
          <el-table-column
            prop="sumOfPrice"
            :label="$t('sumOfPrice')"
            width="120"
          />
          <el-table-column
            prop="totalPurchases"
            :label="$t('totalPurchases')"
            width="120"
          />
          <el-table-column
            prop="purchasedAt"
            :label="$t('purchasedAt')"
            width="120"
            :formatter="formatter('purchasedAt')"
          />
        </el-table>
        <!-- end::table -->

        <!-- start::pagination -->
        <br />
        <!-- start::pagination -->
        <el-pagination
          :loading="purchasedPackagesByPackageStore.dataIsLoading"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="purchasedPackagesByPackageStore.total"
          v-model:current-page="filters.pageNumber"
          v-model:page-size="filters.pageSize"
        />
        <!-- end::pagination -->
      </div>
    </div>

    <!--end::Body-->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  PurchasedPackageByPackage,
  Filters,
} from "../../types/Reports/PurchasedPackagesByPackage";
import { formatDate } from "@/core/helpers/formatDate";
import { usePurchasedPackagesByPackageStore } from "../../store/pinia_store/modules/Reports/PurchasedPackagesByPackageModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useUrlSearchParams } from "@vueuse/core";
import { watchDebounced } from "@vueuse/core";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import { useRoute } from "vue-router";

const route = useRoute();
const filters = useUrlSearchParams<Filters>("history", {
  initialValue: {
    packageId: route.params.id as string,
    packageType: Number(route.params.packageType ?? 0),
    checkExpiryDate: false,
    fromDate: null,
    toDate: null,
    pageNumber: 1,
    pageSize: 10,
  },
});

filters.packageType = Number(filters.packageType);
filters.pageNumber = Number(filters.pageNumber);
filters.pageSize = Number(filters.pageSize);

const { t } = useI18n();

const purchasedPackagesByPackageStore = usePurchasedPackagesByPackageStore();

const tableData = computed(
  () => purchasedPackagesByPackageStore.purchasedPackagesByPackages
);

const totalPurchases = computed(() => {
  return (
    purchasedPackagesByPackageStore.purchasedPackagesByPackages[0]
      ?.totalOfPurchases ?? 0
  );
});

const loadPackagesReport = () => {
  purchasedPackagesByPackageStore.loadPurchasedPackagesByPackages({
    checkExpiryDate: filters.checkExpiryDate,
    packageId: filters.packageId,
    fromDate: filters.fromDate || null,
    toDate: filters.toDate || null,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    packageType: filters.packageType,
  });
};

const formatter = (key: "createdAt" | "lastUpdated" | "purchasedAt") => {
  return (record: PurchasedPackageByPackage) => formatDate(record[key]);
};

setCurrentPageBreadcrumbs(t("reports"), [t("purchasedPackagesByPackage")]);

watchDebounced(filters, () => loadPackagesReport(), { debounce: 1000 });

loadPackagesReport();
</script>
