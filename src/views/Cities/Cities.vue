<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("cities") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <!-- TODO: add the load cities button -->
        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="
            citiesStore.loadCities(
              citiesStore.selectedCountryId,
              searchCityName
            )
          "
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>
        <a
          href="#"
          class="btn btn-sm btn-primary mx-1"
          target="#"
          data-bs-toggle="modal"
          :data-bs-target="`#kt_modal_add_customer`"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("addCity") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <!-- begin::table -->

      <ErrorAlert
        v-if="citiesStore.errorLoadingData"
        :title="citiesStore.errorMessage"
      />
      <!-- <SuccessAlert
        v-else-if="citiesStore.dataIsLoading"
        title="جاري تحميل البيانات المــدن  ..."
      /> -->

      <div v-else class="row">
        <div class="col-md-5 col-lg-4 col-7">
          <el-select v-model="citiesStore.selectedCountryId" filterable>
            <el-option
              v-for="country in countriesStore.countries"
              :key="country.id"
              :value="country.id"
              :label="country.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-md-6 col-lg-4 col-7">
          <el-input
            id="input_search_package"
            v-model="searchCityName"
            type="text"
            :placeholder="t('name')"
            clearable
          />
        </div>

        <div v-loading="citiesStore.dataIsLoading" class="card-body pt-2">
          <el-table class="table-responsive" max-width :data="citiesTable">
            <el-table-column
              index="scope.$index"
              width="50px"
              :label="t('noNumber')"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              :label="$t('arabicName')"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <ClippedText :text="scope.row.name" :length="20" />
              </template>
            </el-table-column>

            <el-table-column
              prop="englishName"
              :label="$t('englishName')"
              align="center"
              header-align="center"
            >
              <template #default="scope">
                <ClippedText :text="scope.row.englishName" :length="20" />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('edit')"
              width="100px"
              align="center"
              header-align="center"
            >
              <template #default="scope: { row: City, $index: number }">
                <div class="flex">
                  <a
                    class="btn btn-icon btn-light-success btn-sm"
                    @click="selectCity(scope.row)"
                    data-bs-toggle="modal"
                    :data-bs-target="`#update_city_modal`"
                  >
                    <i class="bi bi-pencil"></i>
                  </a>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('remove')"
              width="100px"
              align="center"
              header-align="center"
            >
              <template #default="scope: { row: City, $index: number }">
                <div class="flex">
                  <a
                    class="btn btn-icon btn-light-danger btn-sm"
                    data-bs-toggle="modal"
                    :data-bs-target="`#kt_modal_delete_city`"
                    @click="citiesStore.selectCity(scope.row)"
                  >
                    <i class="bi bi-trash"></i>
                  </a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- end::table -->

      <br />
      <!-- start::pagination -->
      <el-pagination
        v-if="!citiesStore.dataIsLoading && !citiesStore.errorLoadingData"
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        v-model:pager-count="pagination.pagerCount"
        :page-sizes="[25, 100, 200, 300, 400]"
        :total="citiesStore.total"
      />
      <!-- end::pagination -->
    </div>
    <AddCityForm ref="addCityModalRef" @submit="createCity"></AddCityForm>
    <UpdateCityModal ref="updateCityModalRef" @submit="updateCity" />
    <!-- <AddCityForm @submit="cityAdded"></AddCityForm> -->
    <DeleteCity
      ref="deleteCityModalRef"
      @cityDeleted="cityDeleted"
    ></DeleteCity>
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { City, NewCityData } from "@/types/Cities";
import { useCitiesStore } from "@/store/pinia_store/modules/CitiesModule";
import { useCountriesStore } from "@/store/pinia_store/modules/CountriesModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import AddCityForm from "@/views/Cities/AddCityForm.vue";
import UpdateCityModal from "./updateCityModal.vue";
import Toaster from "@/core/services/Toaster";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import { hideModal } from "@/core/helpers/dom";
import DeleteCity from "@/views/Cities/DeleteCity.vue";
import { ElSelect, ElOption } from "element-plus";
import ClippedText from "@/components/ClippedText.vue";
import { useUrlSearchParams, watchDebounced } from "@vueuse/core";

const { t } = useI18n();
const citiesStore = useCitiesStore();
const countriesStore = useCountriesStore();

const searchCityName = ref<string>("");
const addCityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const updateCityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const deleteCityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const citiesTable = computed(() => citiesStore.cities);

const pagination = useUrlSearchParams<{
  currentPage: number;
  pageSize: number;
  pagerCount: number;
}>("history", {
  initialValue: {
    currentPage: 1,
    pageSize: 25,
    pagerCount: 1,
  },
});

pagination.currentPage = Number(pagination.currentPage ?? 1);
pagination.pageSize = Number(pagination.pageSize ?? 25);
pagination.pagerCount = Number(pagination.pagerCount ?? 1);
const createCity = async (data: NewCityData) => {
  try {
    await citiesStore.createNewItem(data);
    hideModal(addCityModalRef.value!.modalRef!);

    Toaster.Success("نجاح", "تمت اضافة المدينة بنجاح");
  } catch (error) {
    console.log(error);
  }
};

const selectCity = (city: City) => {
  citiesStore.selectCity(city);
};

const updateCity = async (data: NewCityData) => {
  try {
    await citiesStore.updateItem(data);

    hideModal(updateCityModalRef.value!.modalRef!);

    citiesStore.unselectCity();
  } catch (error) {
    console.log(error);
  }
};

setCurrentPageBreadcrumbs(t("cities"), [t("cities")]);

const cityDeleted = async (city: City) => {
  try {
    await citiesStore.deleteItem(city);
    hideModal(deleteCityModalRef.value!.modalRef!);
  } catch (error) {
    console.log(error);
    Toaster.error("Error", (error as Error).message);
  }
};

setCurrentPageBreadcrumbs(t("cities"), [t("cities")]);

countriesStore.loadCountries();

watch(
  () => citiesStore.selectedCountryId,
  (id) => {
    if (id) {
      citiesStore.loadCities(id, searchCityName.value);
    }
  }
);
watchDebounced(
  () =>
    [searchCityName.value, pagination.currentPage, pagination.pageSize] as [
      string,
      number,
      number
    ],
  ([name]) => {
    if (name) {
      citiesStore.loadCities(citiesStore.selectedCountryId, name);
    }
  },
  { debounce: 500 }
);
</script>
