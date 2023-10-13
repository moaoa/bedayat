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
          @click="prepaidCardsStore.loadPrepaidCards(filters)"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <button
          data-bs-toggle="modal"
          :data-bs-target="`#kt_modal_add_item`"
          class="btn btn-sm btn-primary mx-1"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("addPrepaidCard") }}
        </button>
        <RouterLink :to="{ name: 'ExportPrepaidCards' }">
          <button class="btn btn-sm btn-success mx-1">
            <span class="svg-icon svg-icon-3">
              <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
            </span>
            {{ $t("exportPrepaidCards") }}
          </button>
        </RouterLink>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="prepaidCardsStore.dataIsLoading" class="card-body pt-2">
      <!-- begin: filters -->
      <div class="row align-items-center">
        <label for="number" class="col-sm-4 mt-4">
          {{ $t("number") }}
          <el-input
            name="number"
            v-model="filters.number"
            :placeholder="$t('number')"
            style="width: 300px"
            @keyup.enter="prepaidCardsStore.loadPrepaidCards(filters)"
          />
        </label>
        <label for="serialNumber" class="col-sm-4 mt-4">
          {{ $t("serialNumber") }}
          <el-input
            name="serialNumber"
            v-model="filters.serialNumber"
            :placeholder="$t('serialNumber')"
            style="width: 300px"
            @keyup.enter="prepaidCardsStore.loadPrepaidCards(filters)"
          />
        </label>

        <label for="state" class="col-sm-4 mt-4">
          {{ $t("state") }}
          <el-select
            name="state"
            v-model="filters.state"
            :placeholder="$t('state')"
            style="width: 300px"
          >
            <el-option
              :label="$t('active')"
              :value="AppConstants.PREPAID_CARD_STATUS.Active"
            />
            <el-option
              :label="$t('inactive')"
              :value="AppConstants.PREPAID_CARD_STATUS.DisActive"
            />
            <el-option
              :label="$t('consumed')"
              :value="AppConstants.PREPAID_CARD_STATUS.Consumed"
            />
          </el-select>
        </label>

        <div
          @click="prepaidCardsStore.loadPrepaidCards(filters)"
          class="col-sm-4 mt-9"
        >
          <a class="btn btn-sm btn-primary mx-1">
            {{ $t("search") }}
          </a>
        </div>
      </div>
      <!-- end: filters -->

      <!-- begin::table -->
      <el-table
        :data="prepaidCardsTable"
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
          <template #default="scope: { row: PrepaidCard, $index: number }">
            <div
              class="d-flex align-items-center gap-3 justify-content-between"
            >
              <span
                v-if="
                  scope.row.state === AppConstants.PREPAID_CARD_STATUS.DisActive
                "
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
          :label="$t('status')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: PrepaidCard, $index: number }">
            <div class="flex">
              <el-switch
                v-model="scope.row.state"
                :loading="prepaidCardsStore.isSwitchingPrepaidCardStatus"
                :active-action-icon="CheckIcon"
                :inactive-action-icon="CrossIcon"
                :active-value="AppConstants.PREPAID_CARD_STATUS.Active"
                :inactive-value="AppConstants.PREPAID_CARD_STATUS.DisActive"
                :before-change="() => handleToggleUser(scope.row)"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('export')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: PrepaidCard, $index: number }">
            <div class="flex">
              <a
                class="btn btn-sm btn-success mx-1"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_export`"
                @click="selectPrepaidCard(scope.row)"
              >
                <ReportIcon />
              </a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('remove')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: PrepaidCard, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_item`"
                @click="selectPrepaidCard(scope.row)"
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
    <AddPrepaidCardModal />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeletePrepaidCard></DeletePrepaidCard>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import {
  PrepaidCard,
  NewPrepaidCard,
  PrepaidCardFilters,
} from "@/types/PrepaidCards";
import DeletePrepaidCard from "@/views/PrepaidCards/DeletePrepaidCardsModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import AddPrepaidCardModal from "@/views/PrepaidCards/AddPrepaidCardModal.vue";
import { usePrepaidCardsStore } from "@/store/pinia_store/modules/PrepaidCardsModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ClippedText from "@/components/ClippedText.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import ReportIcon from "@/components/icons/ReportIcon.vue";
import Toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

const { t } = useI18n();
const prepaidCardsStore = usePrepaidCardsStore();

const prepaidCardsTable = computed(() => prepaidCardsStore.prepaidCards);

const filters = reactive<PrepaidCardFilters>({
  number: "",
  serialNumber: "",
  state: AppConstants.PREPAID_CARD_STATUS.Active,
});

prepaidCardsStore.loadPrepaidCards(filters);

const selectPrepaidCard = (prepaidCard: PrepaidCard) => {
  prepaidCardsStore.selectPrepaidCard(prepaidCard);
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (prepaidCard: PrepaidCard) => formatDate(prepaidCard[key]);
};

const handleToggleUser = async (prepaidCard: PrepaidCard) => {
  try {
    await prepaidCardsStore.togglePrepaidCardStatus(prepaidCard);
    Toaster.Success("Success", "sucess");
    return true;
  } catch (error) {
    return false;
  }
};

setCurrentPageBreadcrumbs(t("prepaidCards"), [t("prepaidCards")]);
</script>
