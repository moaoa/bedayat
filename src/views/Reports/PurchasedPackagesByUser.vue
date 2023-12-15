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
        v-loading="purchasedPackagesByUserStore.dataIsLoading"
        class="card-body pt-2"
    >
      <!-- begin::table -->

      <div class="d-flex gap-4 alig-items-center flex-wrap">
        <div class="d-flex flex-column">
          <label>{{ $t("user") }}</label>
          <el-select
              v-model="filters.userId"
              clearable
              filterable
              remote
              :remote-method="handleChange"
              style="width: 300px"
              :loading="isLoadingUsers"
              :placeholder="$t('searchForUserWithPhoneEmail')"
          >
            <el-option
                v-for="user in usersStore.users"
                :key="user.id"
                :value="user.id"
                :label="user.fullName"
            >
            </el-option>
          </el-select>
        </div>
        <div class="d-flex flex-column">
          <label>{{ $t("packageType") }}</label>
          <el-select v-model="filters.packageType" style="width: 300px">
            <el-option
                :value="AppConstants.PackageTypes.Course"
                :label="$t('course')"
            />
            <el-option
                :value="AppConstants.PackageTypes.Package"
                :label="$t('package')"
            />
          </el-select>
        </div>
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
        <div class="d-flex flex-row is-justify-space-between">
          <lable class="d-flex p-2 ">
            {{ $t("filterByExpiryDate") }}
            <el-switch
                v-model="filters.checkExpiryDate"
                style="width: 300px;"

            >
            </el-switch>
          </lable>
        </div>
      </div>
      <div class="mt-8">{{ $t("totalPurchases") }} : {{ totalPurchases }}</div>
      <div
          v-loading="purchasedPackagesByUserStore.dataIsLoading"
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
                #default="scope: { row: PurchasedPackageByUser, $index: number }"
            >
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="title" :label="$t('title')" width="120"/>
          <el-table-column
              prop="englishTitle"
              :label="$t('englishTitle')"
              width="120"
          />
          <el-table-column
              prop="userName"
              :label="$t('userName')"
              width="120"
          />
          <el-table-column prop="price" :label="$t('price')" width="120"/>

          <el-table-column
              prop="purchasedAt"
              :label="$t('purchasedAt')"
              width="120"
              :formatter="formatter('purchasedAt')"
          />
        </el-table>
        <!-- end::table -->

        <!-- start::pagination -->
        <br/>
        <!-- start::pagination -->
        <el-pagination
            :loading="purchasedPackagesByUserStore.dataIsLoading"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="purchasedPackagesByUserStore.purchasedPackagesByUsers.length"
            v-model:current-page="filters.pageNumber"
            @size-change="handleSizeChange"
        />
        <!-- end::pagination -->
      </div>
    </div>

    <!--end::Body-->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed} from "vue";
import type {
  PurchasedPackageByUser,
  Filters,
} from "@/types/Reports/PurchasedPackagesByUser";
import {formatDate} from "@/core/helpers/formatDate";
import {usePurchasedPackagesByUserStore} from "@/store/pinia_store/modules/Reports/PurchasedPackagesByUserModule";
import {useRegularUsersStore} from "@/store/pinia_store/modules/RegularUsersModule";
import {useI18n} from "vue-i18n";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import {useUrlSearchParams} from "@vueuse/core";
import {AppConstants} from "@/core/constants/ApplicationsConstants";
import {watchDebounced} from "@vueuse/core";

const filters = useUrlSearchParams<Filters>("history", {
  initialValue: {
    userId: null,
    packageType: AppConstants.PackageTypes.Course,
    checkExpiryDate: false,
    fromDate: null,
    toDate: null,
    pageNumber: 1,
    pageSize: 10,
  },
});

filters.packageType = Number(filters.packageType);

const parentsFilters = useUrlSearchParams<{ parentsSearchField: string }>(
    "history"
);

const {t} = useI18n();

const purchasedPackagesByUserStore = usePurchasedPackagesByUserStore();
const usersStore = useRegularUsersStore();

const tableData = computed(
    () => purchasedPackagesByUserStore.purchasedPackagesByUsers
);

const totalPurchases = computed(() => {
  return (
      purchasedPackagesByUserStore.purchasedPackagesByUsers[0]?.sumOfPrice ?? 0
  );
});

const isLoadingUsers = computed(() => {
  return usersStore.dataIsLoading;
});

const handleSizeChange = (val: number) => {
  filters.pageSize = val;
};

const loadPackagesReport = () => {
  purchasedPackagesByUserStore.loadPurchasedPackagesByUsers({
    checkExpiryDate: filters.checkExpiryDate,
    fromDate: filters.fromDate || null,
    toDate: filters.toDate || null,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    userId: filters.userId || null,
    packageType: filters.packageType,
  });
};

const handleChange = (query: string) => {
  parentsFilters.parentsSearchField = query;
};

const formatter = (key: "createdAt" | "lastUpdated" | "purchasedAt") => {
  return (record: PurchasedPackageByUser) => formatDate(record[key]);
};

setCurrentPageBreadcrumbs(t("reports"), [t("purchasedPackagesByUser")]);

watchDebounced(filters, () => loadPackagesReport(), {debounce: 1000});

loadPackagesReport();

watchDebounced(
    () => parentsFilters.parentsSearchField,
    () => {
      usersStore.searchParents(parentsFilters.parentsSearchField as string);
    },
    {debounce: 1000}
);
</script>
