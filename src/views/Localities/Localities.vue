<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("Localities") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="LocalitiesStore.loadLocalities()"
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
          {{ $t("addLocality") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <!-- begin::table -->

      <ErrorAlert
        v-if="LocalitiesStore.errorLoadingData"
        :title="LocalitiesStore.errorMessage"
      />
      <SuccessAlert
        v-else-if="LocalitiesStore.dataIsLoading"
        title="جاري تحميل البيانات المــدن  ..."
      />

      <el-table v-else :data="localitiesTable" height="400">
        >
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
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
          width="200"
          align="center"
          header-align="center"
        >
          <template #default="scope">
            <b> {{ scope.row.name }}</b>
          </template>
        </el-table-column>
        <el-table-column
          prop="englishName"
          :label="$t('englishName')"
          width="200"
          align="center"
          header-align="center"
        >
          <template #default="scope">
            <b> {{ scope.row.englishName }}</b>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          :label="$t('createdAt')"
          width="100"
          :formatter="formatter('createdAt')"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="lastUpdated"
          :label="$t('lastUpdated')"
          width="120"
          :formatter="formatter('lastUpdated')"
          align="center"
          header-align="center"
        />
        <el-table-column
          :label="$t('edit')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope">
            <a
              class="btn btn-icon btn-light-success btn-sm"
              @click="openUpdateLocalityDialog(scope.row)"
              data-bs-toggle="modal"
              :data-bs-target="`#update_locality_modal`"
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
          <template #default="scope: { row: Locality, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_locality`"
                @click="LocalitiesStore.selectLocality(scope.row)"
              >
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- end::table -->

      <br />
      <!-- start::pagination -->
      <el-pagination
        v-if="
          !LocalitiesStore.dataIsLoading && !LocalitiesStore.errorLoadingData
        "
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="LocalitiesStore.total"
        current-page="{{currentPage}}"
        page-size="{{currentSize}}"
        pager-count="{{pageCount}}"
        :page-sizes="[25, 100, 200, 300, 400]"
      />
      <!-- end::pagination -->
    </div>

    <AddLocalityForm
      @submit="createLocality"
      ref="addLocalityModalRef"
    ></AddLocalityForm>

    <UpdateLocalityModal
      @submit="updateLocality"
      ref="updateLocalityModalRef"
    />
    <!-- <AddLocalityForm @submit="localityAdded"></AddLocalityForm> -->
    <DeleteLocality
      @localityDeleted="localityDeleted"
      ref="deleteLocalityModalRef"
    ></DeleteLocality>
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Locality, NewLocalityData } from "@/types/Localities";
import { formatDate } from "@/core/helpers/formatDate";
import { useLocalitiesStore } from "@/store/pinia_store/modules/LocalitiesModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import AddLocalityForm from "@/views/Localities/AddLocalityModal.vue";
import UpdateLocalityModal from "@/views/Localities/UpdateLocalityModal.vue";
import DeleteLocality from "@/views/Localities/DeleteLocality.vue";
import Toaster from "@/core/services/Toaster";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";
import { hideModal } from "@/core/helpers/dom";

const { t } = useI18n();
const LocalitiesStore = useLocalitiesStore();

const addLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const updateLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const deleteLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);

const localitiesTable = computed(() => LocalitiesStore.localities);

const createLocality = async (data: NewLocalityData) => {
  try {
    await LocalitiesStore.createNewItem(data);

    hideModal(addLocalityModalRef.value?.modalRef!);

    Toaster.Success("Success", "sucess");
  } catch (error) {
    console.log(error);
  }
};

const openUpdateLocalityDialog = (locality: Locality) => {
  LocalitiesStore.selectLocality(locality);
};

const updateLocality = async (data: NewLocalityData) => {
  try {
    await LocalitiesStore.updateItem(data);

    hideModal(updateLocalityModalRef.value?.modalRef!);

    LocalitiesStore.unselectLocality();

    Toaster.Success("asdf", "asdfa");
  } catch (error) {
    console.log(error);
  }
};
const formatter = (key: keyof Locality) => {
  return (locality: Locality) => formatDate(locality[key]);
};

setCurrentPageBreadcrumbs(t("Localities"), [t("Localities")]);

const localityDeleted = (locality: Locality) => {
  hideModal(deleteLocalityModalRef.value?.modalRef!);
  LocalitiesStore.deleteItem(locality);
  Toaster.Success("success", "asasdsds");
};

setCurrentPageBreadcrumbs(t("Localities"), [t("Localities")]);

LocalitiesStore.loadLocalities();
</script>
