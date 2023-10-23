<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">
        {{ $t("purchasedPackagesBySubject") }}
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
      v-loading="purchasedPackagesBySubjectStore.dataIsLoading"
      class="card-body pt-2"
    >
      <!-- begin::table -->

      <div class="d-flex gap-4 alig-items-center flex-wrap">
        <div class="d-flex flex-column">
          <label>{{ $t("subject") }}</label>
          <el-select
            v-model="filters.subjectId"
            clearable
            filterable
            style="width: 300px"
            :loading="isLoadingSubjects"
            :placeholder="$t('subject')"
          >
            <el-option
              v-for="subject in subjectsStore.subjects"
              :key="subject.id"
              :value="subject.id"
              :label="subject.name"
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
        v-loading="purchasedPackagesBySubjectStore.dataIsLoading"
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
                row: PurchasedPackageBySubject,
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
          :loading="purchasedPackagesBySubjectStore.dataIsLoading"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="
            purchasedPackagesBySubjectStore.purchasedPackagesBySubject.length
          "
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
import { computed } from "vue";
import type {
  PurchasedPackageBySubject,
  Filters,
} from "@/types/Reports/PurchasedPackagesBySubject";
import { formatDate } from "@/core/helpers/formatDate";
import { usePurchasedPackagesBySubjectStore } from "@/store/pinia_store/modules/Reports/PurchasedPackagesBySubjectModule";
import { useSubjectsStore } from "@/store/pinia_store/modules/SubjectModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useUrlSearchParams } from "@vueuse/core";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { watchDebounced } from "@vueuse/core";

const filters = useUrlSearchParams<Filters>("history", {
  initialValue: {
    subjectId: null,
    packageType: AppConstants.PackageTypes.Course,
    checkExpiryDate: false,
    fromDate: null,
    toDate: null,
    pageNumber: 1,
    pageSize: 10,
  },
});

const { t } = useI18n();

const purchasedPackagesBySubjectStore = usePurchasedPackagesBySubjectStore();
const subjectsStore = useSubjectsStore();

const tableData = computed(
  () => purchasedPackagesBySubjectStore.purchasedPackagesBySubject
);

const totalPurchases = computed(() => {
  return (
    purchasedPackagesBySubjectStore.purchasedPackagesBySubject[0]
      ?.totalOfPurchases ?? 0
  );
});

const isLoadingSubjects = computed(() => {
  return subjectsStore.dataIsLoading;
});

const handleSizeChange = (val: number) => {
  filters.pageSize = val;
};

const loadPackagesReport = () => {
  purchasedPackagesBySubjectStore.loadPurchasedPackagesBySubject({
    checkExpiryDate: filters.checkExpiryDate,
    fromDate: filters.fromDate || null,
    toDate: filters.toDate || null,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    subjectId: filters.subjectId || null,
    packageType: filters.packageType,
  });
};

const formatter = (key: "createdAt" | "lastUpdated" | "purchasedAt") => {
  return (record: PurchasedPackageBySubject) => formatDate(record[key]);
};

setCurrentPageBreadcrumbs(t("reports"), [t("purchasedPackagesBySubject")]);

watchDebounced(filters, () => loadPackagesReport(), { debounce: 1000 });

loadPackagesReport();

subjectsStore.loadSubjects();
</script>
