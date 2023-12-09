<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("Packages") }}</h3>
      <div class="card-toolbar d-flex flex-row">
        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="coursesStore.loadPackages(searchFilter)"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>
        <a class="btn btn-sm btn-primary mx-1" target="#" @click="addPackage">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("addPackage") }}
        </a>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <!--    {{packagesTable}}-->
    <div class="card-body pt-2">
      <div class="row">
        <div class="col-md-3 col-lg-2 col-7">
          <label class="fs-6 fw-bold mb-2">
            {{ $t("grades") }}
          </label>
          <el-select v-model="searchFilter.gradeId" filterable>
            <el-option
              v-for="grade in gradesStore.grades"
              :key="grade.id"
              :value="grade.id"
              :label="grade.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-md-3 col-lg-2 col-7">
          <label class="fs-6 fw-bold mb-2">
            {{ $t("packageType") }}
          </label>
          <el-select v-model="searchFilter.packageType" clearable filterable>
            <el-option
              v-for="status in [
                'all',
                ...Object.values(PackageType).slice(
                  0,
                  Object.values(PackageType).length / 2
                ),
              ]"
              :key="status"
              :value="status == 'all' ? null : PackageType[status]"
              :label="t(`${status.toLowerCase()}`)"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-md-4 col-lg-3 col-7">
          <label class="fs-6 fw-bold mb-2">
            {{ $t("packageStatus") }}
          </label>
          <el-select v-model="searchFilter.packageStatus" clearable filterable>
            <el-option
              v-for="packageStatus in [
                'all',
                ...Object.values(PackageStatus).slice(
                  0,
                  Object.values(PackageStatus).length / 2
                ),
              ]"
              :key="packageStatus"
              :value="
                packageStatus == 'all' ? null : PackageStatus[packageStatus]
              "
              :label="t(packageStatus.toLowerCase())"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-md-6 col-lg-4 col-7">
          <label class="fs-6 fw-bold mb-2">
            {{ $t("name") }}
          </label>
          <el-input
            id="input_search_package"
            v-model="searchFilter.name"
            type="text"
            placeholder=""
            clearable
          />
        </div>
      </div>
      <div class="row">
        <div v-loading="coursesStore.dataIsLoading">
          <el-table class="table-responsive" width="100%" :data="packagesTable">
            >
            <el-table-column
              width="50"
              index="scope.$index"
              :label="t('noNumber')"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <div
                  class="d-flex align-items-center gap-3 justify-content-between"
                >
                  <span
                    v-if="scope.row.packageStatus === PackageStatus.Inactive"
                    class="bullet bullet-vertical h-40px bg-danger"
                  ></span>
                  <span
                    v-else
                    class="bullet bullet-vertical h-40px bg-success"
                  ></span>

                  {{ scope.$index + 1 }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              :label="$t('arabicName')"
              width="150"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <ClippedText :text="scope.row.title" :length="20" />
              </template>
            </el-table-column>
            <el-table-column
              prop="englishName"
              :label="$t('englishName')"
              width="150"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <ClippedText :text="scope.row.englishTitle" :length="20" />
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              :label="$t('coursesCount')"
              width="150"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <b> {{ scope.row.coursesCount }}</b>
              </template>
            </el-table-column>

            <el-table-column
              prop="createdAt"
              :label="$t('createdAt')"
              width="120"
              :formatter="formatter('createdAt')"
              align="center"
              header-align="center"
            />

            <el-table-column
              prop="name"
              :label="$t('packageStatus')"
              width="100"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <label
                  class="form-check form-switch form-check-custom form-check-solid align-content-center justify-content-center"
                >
                  <!--begin::Input-->
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="scope.row.packageStatus == PackageStatus.Active"
                    @change="changePackageState(scope.row.id)"
                  />

                  <!--end::Input-->
                </label>
                <!--                <b> {{ scope.row.packageStatus }}</b>-->
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('purchases')"
              width="100"
              align="center"
              header-align="center"
            >
              <template
                v-slot="scope: { row: GetPackagesResponseDto, $index: number }"
              >
                <RouterLink
                  :to="{
                    name: 'PurchasedPackagesByPackage',
                    params: {
                      id: scope.row.id,
                      packageType: scope.row.packageType,
                    },
                  }"
                >
                  <a class="btn btn-icon btn-light-info btn-sm">
                    <i class="bi bi-book-half"></i>
                  </a>
                </RouterLink>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('subscriptions')"
              width="110"
              align="center"
              header-align="center"
            >
              <template
                v-slot="scope: { row: GetPackagesResponseDto, $index: number }"
              >
                <RouterLink
                  @click="
                    () => {
                      coursesStore.selectPackage(scope.row);
                      coursesStore.selectedGradeId = searchFilter.gradeId;
                    }
                  "
                  :to="{
                    name: 'Subscriptions',
                    params: { id: scope.row.id },
                  }"
                >
                  <a class="btn btn-icon btn-light-success btn-sm">
                    <i class="bi bi-currency-dollar"></i>
                  </a>
                </RouterLink>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('edit')"
              width="110"
              align="center"
              header-align="center"
            >
              <template
                v-slot="scope: { row: GetPackagesResponseDto, $index: number }"
              >
                <RouterLink
                  @click="
                    () => {
                      coursesStore.selectPackage(scope.row);
                      coursesStore.selectedGradeId = searchFilter.gradeId;
                    }
                  "
                  :to="{
                    name: 'UpdatePackages',
                    params: { id: scope.row.id },
                  }"
                >
                  <a class="btn btn-icon btn-light-warning btn-sm">
                    <i class="bi bi-pencil"></i>
                  </a>
                </RouterLink>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('remove')"
              width="110"
              align="center"
              header-align="center"
            >
              <template
                #default="scope: {
                  row: GetPackagesResponseDto,
                  $index: number,
                }"
              >
                <div class="flex">
                  <a
                    class="btn btn-icon btn-light-danger btn-sm"
                    data-bs-toggle="modal"
                    :data-bs-target="`#kt_modal_delete_package`"
                    @click="coursesStore.selectPackage(scope.row)"
                  >
                    <i class="bi bi-trash"></i>
                  </a>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- end::table -->
        </div>
        <br />
        <!-- start::pagination -->
        <!--      <el-pagination v-if="!localitiesStore.dataIsLoading && !localitiesStore.errorLoadingData-->
        <!--        " background layout="total, sizes, prev, pager, next, jumper" :total="localitiesStore.total"-->
        <!--                     current-page="{{currentPage}}" page-size="{{currentSize}}" pager-count="{{pageCount}}"-->
        <!--                     :page-sizes="[25, 100, 200, 300, 400]"/>-->
        <!-- end::pagination -->
      </div>
    </div>
  </div>

  <DeletePackage
    ref="deletePackageModalRef"
    @packageDeleted="packageDeleted"
  ></DeletePackage>

  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import {
  GetPackagesResponseDto,
  PackageFilter,
  PackageStatus,
  PackageType,
} from "@/types/Packages/Packages";
import { useRouter } from "vue-router";
import { Locality } from "@/types/Localities";
import toaster from "@/core/services/Toaster";
import { hideModal } from "@/core/helpers/dom";
import Toaster from "@/core/services/Toaster";
import DeleteCountry from "@/views/Countries/DeleteCountry.vue";
import DeletePackage from "@/views/Packages/DeletePackage.vue";
import { ErrorMessage, Field } from "vee-validate";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { FaqCategory } from "@/types/Faq";
import ClippedText from "@/components/ClippedText.vue";

////////// Declarations///////////////////
const { t } = useI18n();
const coursesStore = useCoursesStore();
const gradesStore = useGradesStore();
const packagesTable = ref<GetPackagesResponseDto[]>(
  coursesStore.packages.results
);

const router = useRouter();

const deletePackageModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const formatter = (key: keyof Locality) => {
  return (locality: Locality) => formatDate(locality[key]);
};
const searchFilter = reactive<PackageFilter>({
  name: "",
  gradeId: "",
  packageType: null,
  packageStatus: null,
});
// status: PackageStatus.Active,
const changePackageState = async (packageId: string) => {
  await coursesStore.changePackageActiveState(packageId);
  await coursesStore.loadPackages(searchFilter);
};

/////////////Functions///////////////////////

const addPackage = () => {
  router.push({ name: "AddPackages" });
};

const packageDeleted = async () => {
  hideModal(deletePackageModalRef.value!.modalRef!);
  Toaster.Success("Success!", "Package Deleted Successfully");
};
setCurrentPageBreadcrumbs(t("Packages"), [t("Packages")]);

onMounted(() => {
  gradesStore.loadGrades();

  document
    .getElementById("input_search_package")
    ?.addEventListener("keydown", async (event) => {
      if (event.keyCode === 13 || event.key === "Enter") {
        console.log("entered");
        if (searchFilter.gradeId) await coursesStore.loadPackages(searchFilter);
        else toaster.error("please Select Grade");
      }
      // countriesStore.loadCountries();
    });
});
watch(
  () => {
    return coursesStore.packages;
  },
  (value) => {
    packagesTable.value = value.results; //?.filter(x=> x.packageStatus == searchFilter.status)
  }
);
watch(
  () => gradesStore.grades,
  async () => {
    if (gradesStore.grades.length > 0)
      searchFilter.gradeId = gradesStore.grades[0].id;
  }
);
watch(
  () => searchFilter.gradeId,
  async () => await coursesStore.loadPackages(searchFilter)
);
watch(
  () => searchFilter.packageType,
  async () => await coursesStore.loadPackages(searchFilter)
);
watch(
  () => searchFilter.packageStatus,
  async () => await coursesStore.loadPackages(searchFilter)
);
</script>
