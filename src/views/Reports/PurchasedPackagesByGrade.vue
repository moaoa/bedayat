<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">
        {{ $t("purchasedPackagesByGrade") }}
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
      v-loading="purchasedPackagesByGradeStore.dataIsLoading"
      class="card-body pt-2"
    >
      <!-- begin::table -->

      <div class="d-flex gap-4 align-items-center flex-wrap">
        <div class="d-flex flex-column">
          <label>{{ $t("grades") }}</label>
          <el-select v-model="filters.gradeId" filterable>
            <el-option
              v-for="grade in gradesStore.grades"
              :key="grade.id"
              :value="grade.id"
              :label="grade.name"
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
            {{ $t("checkExpiryDate") }}
            <el-switch v-model="filters.checkExpiryDate" style="width: 300px">
            </el-switch>
          </lable>
        </div>
      </div>
      <div
        v-loading="purchasedPackagesByGradeStore.dataIsLoading"
        class="card-body pt-2"
      >
        <el-table
          :data="tableData"
          class="table-responsive"
          max-width
          style="width: 100%"
          height="400"
        >
          <el-table-column
            index="scope.$index"
            :label="t('noNumber')"
            width="55"
            align="center"
            header-align="center"
          >
            <template
              #default="scope: { row: PurchasedPackageByGrade, $index: number }"
            >
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            header-align="center"
            align="center"
            :label="$t('title')"
          />
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
              #default="scope: { row: PurchasedPackageByGrade, $index: number }"
            >
              {{
                gradesStore.grades.find((x) => x.id == scope.row?.gradeId ?? "")
                  ?.name
              }}
            </template>
          </el-table-column>

          <el-table-column
            prop="price"
            align="center"
            header-align="center"
            :label="$t('price')"
          />

          <!--          <el-table-column-->
          <!--              prop="sumOfPrice"-->
          <!--              :label="$t('sumOfPrice')"-->

          <!--          />-->

          <el-table-column
            prop="purchasedAt"
            header-align="center"
            align="center"
            :label="$t('purchasedAt')"
            :formatter="formatter('purchasedAt')"
          />
        </el-table>
        <!-- end::table -->

        <!-- start::pagination -->
        <br />
        <div class="grid row">
          <div class="col-9">
            <!-- start::pagination -->
            <el-pagination
              :loading="purchasedPackagesByGradeStore.dataIsLoading"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="purchasedPackagesByGradeStore.total"
              v-model:current-page="filters.pageNumber"
              v-model:page-size="filters.pageSize"
              v-model:pager-count="pagerCount"
            />
          </div>

          <div class="col-3 flex">
            <h3>
              {{ t("sumOfPrice") }}
            </h3>
            <h2>
              <b> {{ total }} </b>
            </h2>
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
import { computed, ref, watch } from "vue";
import type {
  PurchasedPackageByGrade,
  PurchasedPackageByGradeFilters,
} from "@/types/Reports/PurchasedPackagesByGrade";
import { formatDate } from "@/core/helpers/formatDate";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useUrlSearchParams } from "@vueuse/core";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { watchDebounced } from "@vueuse/core";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { usePurchasedPackagesByGradeStore } from "@/store/pinia_store/modules/Reports/PurchasedPackagesByGradeModule";

const { t } = useI18n();
const gradesStore = useGradesStore();
gradesStore.loadGrades();

const filters = useUrlSearchParams<PurchasedPackageByGradeFilters>("history", {
  initialValue: {
    gradeId: gradesStore.grades[0]?.id,
    checkExpiryDate: false,
    packageType: AppConstants.PackageTypes.Course,
    fromDate: null,
    toDate: null,
    pageNumber: 1,
    pageSize: 10,
  },
  write: true,
});

const pagerCount = ref(1);

filters.packageType = Number(filters.packageType);
filters.pageNumber = Number(filters.pageNumber);
filters.pageSize = Number(filters.pageSize);

const total = computed(() => tableData.value[0]?.sumOfPrice);

const purchasedPackagesByGradeStore = usePurchasedPackagesByGradeStore();

const tableData = computed(
  () =>
    purchasedPackagesByGradeStore.purchasedPackagesByGrade as PurchasedPackageByGrade[]
);

const loadPackagesReport = () => {
  purchasedPackagesByGradeStore.loadPurchasedPackagesByGrade({
    gradeId: filters.gradeId,
    checkExpiryDate: filters.checkExpiryDate,
    fromDate: filters.fromDate || null,
    toDate: filters.toDate || null,
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    packageType: filters.packageType,
  });
};

const formatter = (key: "createdAt" | "lastUpdated" | "purchasedAt") => {
  return (record: PurchasedPackageByGrade) => formatDate(record[key]);
};

setCurrentPageBreadcrumbs(t("reports"), [t("purchasedPackagesByGrade")]);

watchDebounced(filters, () => loadPackagesReport(), { debounce: 700 });

loadPackagesReport();
watch(
  () => gradesStore.grades,
  () => (filters.gradeId = gradesStore.grades[0].id)
);
</script>
