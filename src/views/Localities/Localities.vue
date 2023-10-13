<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">

        <h3 class="card-title fw-bolder text-dark">{{ t("localities") }}</h3>
      <div class="card-toolbar d-flex flex-row">




        <a class="btn btn-icon btn-light-primary btn-sm me-3"
           @click="localitiesStore.loadLocalities(localitiesStore.selectedCityId)">
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a href="#" class="btn btn-sm btn-primary mx-1" target="#" data-bs-toggle="modal"
           :data-bs-target="`#kt_modal_add_customer`">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg"/>
          </span>
          {{ $t("addLocality") }}
        </a>


      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
              <div class="row">
                <div class="col-md-3 col-lg-2 col-7">

                  <el-select v-model="citiesStore.selectedCountryId" clearable filterable>
                    <el-option v-for="country in countriesStore.countries" :key="country.id" :value="country.id"
                               :label="country.name">
                    </el-option>
                  </el-select>
                </div>

                <div class="col-md-3 col-lg-2 col-7">

                  <el-select v-model="localitiesStore.selectedCityId" clearable filterable>
                    <el-option v-for="city in citiesStore.cities" :key="city.id" :value="city.id"
                               :label="city.name">
                    </el-option>
                  </el-select>
                </div>
              </div>
      <!--      <ErrorAlert v-if="localitiesStore.errorLoadingData" :title="localitiesStore.errorMessage" />-->
      <!-- <SuccessAlert
        v-else-if="LocalitiesStore.dataIsLoading"
        title="جاري تحميل البيانات المــدن  ..."
      /> -->

      <!-- <el-table class="table-responsive" max-width :data="countriesTable"  -->

      <div v-loading="localitiesStore.dataIsLoading">

        <el-table class="table-responsive" max-width :data="localitiesTable">
          >
          <el-table-column index="scope.$index" :label="t('noNumber')" align="center" header-align="center">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column prop="name" :label="$t('arabicName')" align="center" header-align="center">
            <template #default="scope">
              <b> {{ scope.row.name }}</b>
            </template>
          </el-table-column>
          <el-table-column prop="englishName" :label="$t('englishName')" align="center" header-align="center">
            <template #default="scope">
              <b> {{ scope.row.englishName }}</b>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" :label="$t('createdAt')" :formatter="formatter('createdAt')" align="center"
                           header-align="center"/>
          <el-table-column prop="lastUpdated" :label="$t('lastUpdated')" :formatter="formatter('lastUpdated')"
                           align="center" header-align="center"/>
          <el-table-column :label="$t('edit')" align="center" header-align="center">
            <template #default="scope">
              <a class="btn btn-icon btn-light-success btn-sm" @click="openUpdateLocalityDialog(scope.row)"
                 data-bs-toggle="modal" :data-bs-target="`#update_locality_modal`">
                <i class="bi bi-pencil"></i>
              </a>
            </template>
          </el-table-column>

          <el-table-column :label="$t('remove')" width="90" align="center" header-align="center">
            <template #default="scope: { row: Locality, $index: number }">
              <div class="flex">
                <a class="btn btn-icon btn-light-danger btn-sm" data-bs-toggle="modal"
                   :data-bs-target="`#kt_modal_delete_locality`" @click="localitiesStore.selectLocality(scope.row)">
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- end::table -->

      </div>
      <br/>
      <!-- start::pagination -->
      <el-pagination v-if="!localitiesStore.dataIsLoading && !localitiesStore.errorLoadingData
        " background layout="total, sizes, prev, pager, next, jumper" :total="localitiesStore.total"
                     current-page="{{currentPage}}" page-size="{{currentSize}}" pager-count="{{pageCount}}"
                     :page-sizes="[25, 100, 200, 300, 400]"/>
      <!-- end::pagination -->
    </div>

    <AddLocalityForm @submit="createLocality" ref="addLocalityModalRef"></AddLocalityForm>

    <UpdateLocalityModal @submit="updateLocality" ref="updateLocalityModalRef"/>
    <!-- <AddLocalityForm @submit="localityAdded"></AddLocalityForm> -->
    <DeleteLocality @localityDeleted="localityDeleted" ref="deleteLocalityModalRef"></DeleteLocality>
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {Locality, NewLocalityData} from "@/types/Localities";
import {formatDate} from "@/core/helpers/formatDate";
import {useLocalitiesStore} from "@/store/pinia_store/modules/LocalitiesModule";
import {useI18n} from "vue-i18n";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import AddLocalityForm from "@/views/Localities/AddLocalityModal.vue";
import UpdateLocalityModal from "@/views/Localities/UpdateLocalityModal.vue";
import DeleteLocality from "@/views/Localities/DeleteLocality.vue";
import Toaster from "@/core/services/Toaster";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import {hideModal} from "@/core/helpers/dom";
import {useCountriesStore} from "@/store/pinia_store/modules/CountriesModule";
import {useCitiesStore} from "@/store/pinia_store/modules/CitiesModule";

const {t} = useI18n();
const localitiesStore = useLocalitiesStore();
const countriesStore = useCountriesStore();
const citiesStore = useCitiesStore();

const addLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const updateLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const deleteLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);

const localitiesTable = computed(() => localitiesStore.localities);

const createLocality = async (data: NewLocalityData) => {
  try {
    await localitiesStore.createNewItem(data);

    hideModal(addLocalityModalRef.value?.modalRef!);

    localitiesStore.unselectLocality();
  } catch (error) {
    console.log(error);
  }
};

const openUpdateLocalityDialog = (locality: Locality) => {
  localitiesStore.selectLocality(locality);
};

const updateLocality = async (data: NewLocalityData) => {
  try {
    await localitiesStore.updateItem(data);

    hideModal(updateLocalityModalRef.value?.modalRef!);

    localitiesStore.unselectLocality();
  }catch (error) {
    console.log(error);
  }
};
const formatter = (key: keyof Locality) => {
  return (locality: Locality) => formatDate(locality[key]);
};

// setCurrentPageBreadcrumbs(t("localities"), [t("localities")]);

const localityDeleted = (locality: Locality) => {
  hideModal(deleteLocalityModalRef.value?.modalRef!);
  localitiesStore.deleteItem(locality);
};

setCurrentPageBreadcrumbs(t("localities"), [t("localities")]);


onMounted(() => {
  countriesStore.loadCountries();


});

watch(
    () => countriesStore.countries,
    (id) => {
      citiesStore.selectedCountryId = countriesStore.countries[0].id
    }
);
watch(
    () => citiesStore.selectedCountryId,
    (id) => {
      console.log(id);
      if (id) {
        citiesStore.loadCities({countryId: id});
      }
    }
);
watch(
    () => citiesStore.cities,
    (id) => {
      localitiesStore.selectedCityId = citiesStore.cities[0].id;
    }
);

watch(
    () => localitiesStore.selectedCityId,
    (id) => {
      if (id) {
        localitiesStore.loadLocalities(id);
      }
    }
);


</script>
