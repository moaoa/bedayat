<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("prepaidCards") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="prepaidCardsStore.loadInvoices(filters)"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="prepaidCardsStore.dataIsLoading" class="card-body pt-2">
      <!-- begin: filters -->
      <div class="row align-items-center">
        <label for="thirdParty" class="col-md-4 mt-4">
          {{ $t("thirdParty") }}
          <el-input
            name="thirdParty"
            v-model="filters.thirdParty"
            :placeholder="$t('thirdParty')"
            style="width: 300px"
            @keyup.enter="prepaidCardsStore.loadInvoices(filters)"
          />
        </label>

        <div
          @click="prepaidCardsStore.loadInvoices(filters)"
          class="col-md-4 mt-9"
        >
          <a class="btn btn-sm btn-primary mx-1">
            {{ $t("search") }}
          </a>
        </div>
      </div>
      <!-- end: filters -->

      <!-- begin::table -->
      <el-table
        :data="invoicesTable"
        style="width: 100%"
        class="mt-8"
        height="250"
      >
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Invoice, $index: number }">
            <div
              class="d-flex align-items-center gap-3 justify-content-between"
            >
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="number"
          :label="$t('number')"
          width="170"
          align="center"
        />
        <el-table-column
          prop="serialNumber"
          :label="$t('serialNumber')"
          width="170"
          align="center"
        />
        <el-table-column
          prop="coinsAmount"
          :label="$t('coinsAmount')"
          width="170"
          align="center"
        />
        <el-table-column
          prop="sellingPrice"
          :label="$t('sellingPrice')"
          width="170"
          align="center"
        />
        <el-table-column
          prop="consumedType"
          :label="$t('consumedType')"
          width="170"
          align="center"
        />
        <el-table-column
          prop="createdAt"
          :label="$t('createdAt')"
          width="150"
          :formatter="formatter('createdAt')"
        />
        <el-table-column
          prop="lastUpdated"
          :label="$t('lastUpdated')"
          width="150"
          :formatter="formatter('lastUpdated')"
        />

        <el-table-column
          :label="$t('remove')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Invoice, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_item`"
                @click="selectInvoice(scope.row)"
              >
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('export')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Invoice, $index: number }">
            <div class="flex">
              <a
                class="btn btn-sm btn-success mx-1"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_export`"
                @click="selectInvoice(scope.row)"
              >
                <ReportIcon />
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
        v-if="
          !prepaidCardsStore.dataIsLoading && prepaidCardsStore.prepaidCards
        "
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="prepaidCardsStore.prepaidCards.length"
      />
      <!-- end::pagination -->
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <ExportInvoiceModal />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <!-- <DeleteInvoice></DeleteInvoice> -->
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { Invoice, NewInvoice, InvoiceFilters } from "@/types/Invoices";
// import DeleteInvoice from "@/views/Invoices/DeleteInvoiceModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import ExportInvoiceModal from "@/views/Invoices/ExportInvoiceModal.vue";
import { usePrepaidCardsStore } from "@/store/pinia_store/modules/PrepaidCardsModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import ReportIcon from "@/components/icons/ReportIcon.vue";
import Toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

const { t } = useI18n();
const prepaidCardsStore = usePrepaidCardsStore();

const invoicesTable = computed(() => prepaidCardsStore.invoices);

const filters = reactive<InvoiceFilters>({
  thirdParty: "",
});

prepaidCardsStore.loadInvoices(filters);

const selectInvoice = (prepaidCard: Invoice) => {
  prepaidCardsStore.selectInvoice(prepaidCard);
};

const unselectInvoice = () => {
  prepaidCardsStore.unselectInvoice();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (prepaidCard: Invoice) => formatDate(prepaidCard[key]);
};

setCurrentPageBreadcrumbs(t("prepaidCards"), [t("prepaidCards")]);
</script>
