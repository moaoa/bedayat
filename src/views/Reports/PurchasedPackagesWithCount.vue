<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">
        {{ $t("purchasedPackagesWithCount") }}
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
        v-loading="purchasedPackagesWithCountStore.dataIsLoading"
        class="card-body pt-2"
    >
      <!-- begin::table -->

      <div class="d-flex gap-4 align-items-center flex-wrap">
        <div class="d-flex flex-column">
          <label>{{ $t("packageType") }}</label>
          <el-select v-model="filters.packageType" style="width: 300px">
            <el-option
                :value="AppConstants.PackageTypes.Course"
                :label="$t('course')"
            />
            <el-option
                :value="AppConstants.PackageTypes.Package"
                :label="$t('packages')"
            />
          </el-select>
        </div>
        <div>
          <label class="d-flex flex-column">
            {{ $t("fromDate") }}
            <el-date-picker
                :placeholder="$t('fromDate')"
                v-model="filters.fromDate"
                style="width: 300px"
            >
            </el-date-picker>
          </label>
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
            {{ $t("orderByMostPurchased") }}
            <el-switch v-model="filters.orderByMostPurchased" style="width: 300px">
            </el-switch>
          </lable>
        </div>
      </div>
      <div
          v-loading="purchasedPackagesWithCountStore.dataIsLoading"
          class="card-body pt-2"
      >


        <div class="mt-8 fs-4 fw-bold">{{ $t("totalOfPurchased") }} : {{ total }}</div>

        <el-table :data="tableData" class="table-responsive" max-width style="width: 100%" height="400">
          <el-table-column
              index="scope.$index"
              :label="t('noNumber')"
              width="55"
              align="center"
              header-align="center"
          >
            <template
                #default="scope: { row: PurchasedPackageWithCount, $index: number }"
            >
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="title"
                           header-align="center"
                           align="center" :label="$t('title')"/>
          <el-table-column
              prop="englishTitle"
              header-align="center"
              align="center"
              :label="$t('englishTitle')"

          />


          <el-table-column
              :label="t('gradeName')"

              align="center"
              header-align="center"
          >
            <template
                #default="scope: { row: PurchasedPackageWithCount, $index: number }"
            >
              {{ gradesStore.grades.find(x => x.id == scope.row?.gradeId ?? '')?.name }}
            </template>
          </el-table-column>


          <el-table-column prop="price"
                           header-align="center"
                           align="center" :label="$t('monthlyPackagePrice')"/>
          <el-table-column
              prop="sumOfPrice"
              :label="$t('totalPurchases')"
              width="120"
          />
          <el-table-column
              prop="numberOfPurchases"
              :label="$t('numberOfPurchases')"
          />
          <el-table-column
              prop="sumOfPrice"
              header-align="center"
              align="center"
              :label="$t('sumOfPrice')"

          />

        </el-table>
        <!-- end::table -->

        <!-- start::pagination -->
        <br/>
        <div class="grid row">
          <div class="col-9">


            <!-- start::pagination -->
            <el-pagination
                :loading="purchasedPackagesWithCountStore.dataIsLoading"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="purchasedPackagesWithCountStore.purchasedPackagesWithCount.length"
                v-model:current-page="filters.pageNumber"
                @size-change="handleSizeChange"
            />
          </div>



        </div>

        <!-- end::pagination -->
      </div>
    </div>

    <!--end::Body-->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed} from "vue";

import {formatDate} from "@/core/helpers/formatDate";
import {useRegularUsersStore} from "@/store/pinia_store/modules/RegularUsersModule";
import {useI18n} from "vue-i18n";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import {useUrlSearchParams} from "@vueuse/core";
import {AppConstants} from "@/core/constants/ApplicationsConstants";
import {watchDebounced} from "@vueuse/core";
import {PurchasedPackageWithCount, PurchasedPackageWithCountFilters} from "@/types/Reports/PurchasedPackagesWithCount";
import {usePurchasedPackagesWithCountStore} from "@/store/pinia_store/modules/Reports/PurchasedPackagesWithCountModule";
import {useGradesStore} from "@/store/pinia_store/modules/GradesModule";

const total = computed(() => tableData.value[0]?.totalOfPurchases)
const filters = useUrlSearchParams<PurchasedPackageWithCountFilters>("history");
const parentsFilters = useUrlSearchParams<{ parentsSearchField: string }>(
    "history"
);

filters.orderByMostPurchased = false;
filters.packageType = AppConstants.PackageTypes.Course;
filters.fromDate = null;
filters.toDate = null;
filters.pageNumber = 1;
filters.pageSize = 10;

const {t} = useI18n();
const gradesStore = useGradesStore();
gradesStore.loadGrades();

const purchasedPackagesWithCountStore = usePurchasedPackagesWithCountStore();

const tableData = computed(
    () => purchasedPackagesWithCountStore.purchasedPackagesWithCount as PurchasedPackageWithCount[]
);

const handleSizeChange = (val: number) => {
  filters.pageSize = val;
};

const loadPackagesReport = () => {
  purchasedPackagesWithCountStore.loadPurchasedPackagesWithCount({
    orderByMostPurchased: filters.orderByMostPurchased,
    fromDate: filters.fromDate || null,
    toDate: filters.toDate || null,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    packageType: filters.packageType,
  });

};

const formatter = (key: "createdAt" | "lastUpdated" | "purchasedAt") => {
  return (record: PurchasedPackageWithCount) => formatDate(record[key]);
};

setCurrentPageBreadcrumbs(t("reports"), [t("purchasedPackagesWithCount")]);

watchDebounced(filters, () => loadPackagesReport(), {debounce: 700});

loadPackagesReport();

// watchDebounced(
//   () => parentsFilters.parentsSearchField,
//   () => {
//     // usersStore.searchParents(parentsFilters.parentsSearchField as string);
//   },
//   { debounce: 1000 }
// );
</script>
