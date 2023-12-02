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
      v-loading="purchasedPackagesBySpecificUserStore.dataIsLoading"
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
      </div>
      <div class="mt-8">{{ $t("totalPurchases") }} : {{ totalPurchases }}</div>
      <div
        v-loading="purchasedPackagesBySpecificUserStore.dataIsLoading"
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
                row: PurchasedPackageBySpecificUser,
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
          :loading="purchasedPackagesBySpecificUserStore.dataIsLoading"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="purchasedPackagesBySpecificUserStore.total"
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
  PurchasedPackageBySpecificUser,
  Filters,
} from "@/types/Reports/AllPurchasedPackagesByUser";
import { formatDate } from "@/core/helpers/formatDate";
import { useAllPurchasedPackagesBySpecificUserStore } from "@/store/pinia_store/modules/Reports/AllPurchasedPackageForSpecifcUserModule";
import { useRegularUsersStore } from "@/store/pinia_store/modules/RegularUsersModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useUrlSearchParams } from "@vueuse/core";
import { watchDebounced } from "@vueuse/core";

const filters = useUrlSearchParams<Filters>("history", {
  initialValue: {
    userId: null,
    pageNumber: 1,
    pageSize: 10,
  },
});

filters.pageNumber = Number(filters.pageNumber);
filters.pageSize = Number(filters.pageSize);

const parentsFilters = useUrlSearchParams<{ parentsSearchField: string }>(
  "history"
);

const { t } = useI18n();

const purchasedPackagesBySpecificUserStore =
  useAllPurchasedPackagesBySpecificUserStore();
const usersStore = useRegularUsersStore();

const tableData = computed(
  () => purchasedPackagesBySpecificUserStore.purchasedPackagesByUsers
);

const totalPurchases = computed(() => {
  return (
    purchasedPackagesBySpecificUserStore.purchasedPackagesByUsers[0]
      ?.sumOfPrice ?? 0
  );
});

const isLoadingUsers = computed(() => {
  return usersStore.dataIsLoading;
});

const loadPackagesReport = () => {
  purchasedPackagesBySpecificUserStore.loadPurchasedPackagesByUsers({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    userId: filters.userId || null,
  });
};

const handleChange = (query: string) => {
  parentsFilters.parentsSearchField = query;
};

const formatter = (key: "createdAt" | "lastUpdated" | "purchasedAt") => {
  return (record: PurchasedPackageBySpecificUser) => formatDate(record[key]);
};

setCurrentPageBreadcrumbs(t("reports"), [t("purchasedPackagesBySpecificUser")]);

watchDebounced(filters, () => {
  if (!filters.userId) {
    return;
  }

  loadPackagesReport(), { debounce: 1000 };
});

watchDebounced(
  () => parentsFilters.parentsSearchField,
  () => {
    usersStore.searchParents(parentsFilters.parentsSearchField as string);
  },
  { debounce: 1000 }
);
</script>
