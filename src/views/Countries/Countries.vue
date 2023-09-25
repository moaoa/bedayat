<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">البلدان</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="countriesStore.loadCountries()"
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
          {{ $t("addNewCountry") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="countriesStore.dataIsLoading"  class="card-body pt-2">
      <!-- begin::table -->


      <el-table :data="countriesTable" style="width: 100%" height="250">
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope:{ row: Country, $index: number }">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('arabicName')" width="120" />
        <el-table-column
          prop="englishName"
          :label="$t('englishName')"
          width="120"
        />
        <el-table-column
          prop="createdAt"
          :label="$t('createdAt')"
          width="200"
          :formatter="formatter('createdAt')"
        />
        <el-table-column
          prop="lastUpdated"
          :label="$t('lastUpdated')"
          width="200"
          :formatter="formatter('lastUpdated')"
        />
        <el-table-column :label="$t('edit')" width="120" align="center">
          <template #default="scope">
            <a
              class="btn btn-icon btn-light-success btn-sm"
              data-bs-toggle="modal"
              :data-bs-target="`#update_country_modal`"
              @click="selectCountry(scope.row)"
            >
              <i class="bi bi-pencil"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('remove')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Country, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_country`"
                @click="selectCountry(scope.row)"
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
      <el-pagination
        v-if="!countriesStore.dataIsLoading && countriesStore.countries"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="countriesStore.countries.length"

      />      <!-- end::pagination -->
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <CreateCountryForm ref="addCountryModalRef" @submit="createCountry" />
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <UpdateCountryForm ref="updateCountryModalRef"  @submit="countryUpdated" @close="unselectCountry" />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteCountry
      ref="deleteCountryModalRef"
      @countryDeleted="countryDeleted"
    ></DeleteCountry>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Country } from "@/types/Countries";
import CreateCountryForm from "@/views/Countries/AddCountryModal.vue";
import UpdateCountryForm from "@/views/Countries/UpdateCountryModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useCountriesStore } from "@/store/pinia_store/modules/CountriesModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Toaster from "@/core/services/Toaster";
import DeleteCountry from "./DeleteCountry.vue";
import { hideModal } from "@/core/helpers/dom";

const { t } = useI18n();
const countriesStore = useCountriesStore();

const countriesTable = computed(() => countriesStore.countries);

const updateCountryModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const deleteCountryModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const addCountryModalRef = ref<{ modalRef: HTMLElement } | null>(null);

countriesStore.loadCountries();

const selectCountry = (country: Country) => {
  countriesStore.selectCountry(country);
};

const unselectCountry = () => {
  countriesStore.unselectCountry();
};

const createCountry = async (countryData: Country) => {
  try {
    Toaster.Success("Success", "sucess");
    hideModal(addCountryModalRef.value!.modalRef);
  } catch (error) {
    console.log(error);
    Toaster.error("Error", "sucess");
  }
};

const countryUpdated = async () => {
  hideModal(updateCountryModalRef.value!.modalRef);
  Toaster.Success("Success!", "Country Updated Successfully");
};

const countryDeleted = async () => {
  hideModal(deleteCountryModalRef.value!.modalRef!);
  Toaster.Success("Success!", "Country Deleted Successfully");
};

const formatter = (key: keyof Country) => {
  return (country: Country) => formatDate(country[key]);
};
setCurrentPageBreadcrumbs(t("countries"), [t("countries")]);
</script>
