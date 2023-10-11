<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">

    <!--begin::Header-->
    <div class="card-header card-header-stretch">
      <ul class="nav nav-stretch nav-line-tabs fw-bold border-0 " role="tablist" id="kt_layout_builder_tabs"
        ref="kt_layout_builder_tabs">


        <li class="nav-item">
          <a class="nav-link px-3" :class="{ active: tabIndex === 0 }" data-bs-toggle="tab" :data-tab-index=0
            @click="setActiveTab($event)" href="#kt_builder_main" role="tab">
            {{ t("generalSettings") }}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-3" :class="{ active: tabIndex === 1 }" data-bs-toggle="tab" :data-tab-index=1
            @click="setActiveTab($event)" href="#kt_builder_main" role="tab">
            {{ t("subscriptionSettings") }}
          </a>
        </li>

      </ul>
    </div>

    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">إعدادات النظام</h3>

      <div class="card-toolbar">
        <button v-if="tabIndex == 1" type="button" class="btn btn-primary er fs-6 px-4 py-3" data-bs-toggle="modal"
          :data-bs-target="`#kt_modal_new_subscription_settings`">
          {{ t("addSubscriptionSettings") }}
        </button>
        <a @click="refreshCard()" class="btn btn-icon btn-light-primary btn-sm me-3">
          <i class="bi bi-arrow-repeat"></i>
        </a>
      </div>
    </div>
    <!--end::Header-->



    <div class="card mb-10">
      <form class="form" id="kt_layout_builder_form" @submsubmitit="($event)">
        <!--begin::Body-->
        <div class="card-body" v-loading="SystemSettingsStore.dataLoading">
          <div class="tab-content pt-3" id="kt_tabs">
            <div class="tab-pane" :class="{ active: tabIndex === 0 }" id="kt_builder_header">

              <!-- coin price  -->
              <div class="row mb-10">
                <label class="col-lg-2 col-form-label text-lg-end">{{ t("coinPrice") }}</label>
                <div class="col-lg-4 col-xl-3 col-6 mx-5">
                  <input class="form-control form-control-solid" :disabled="SystemSettingsStore.errorOccured"
                    type="number" v-model="SystemSettingsStore.systemSettings.coinPrice" />
                </div>
                <div class="col-lg-4 col-xl-4 col ">
                  <button :data-kt-indicator="SystemSettingsStore.coindDataSubmitting ? 'on' : null"
                    class="btn btn-sm btn-primary col-lg-4 col-xl-5 col-sm-4 col-7 " type="submit"
                    @click.prevent="handleUpdate(SystemSettingType.CoinPrice, $event)">
                    <span v-if="!SystemSettingsStore.coindDataSubmitting" class="indicator-label">
                      {{ $t("save") }}
                      <span class="svg-icon svg-icon-3 ms-2 me-0">
                        <!-- <inline-svg src="icons/duotune/arrows/arr064.svg" /> -->
                      </span>
                    </span>
                    <span v-if="SystemSettingsStore.coindDataSubmitting" class="indicator-progress">
                      {{ $t("pleaseWait") }}...
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </div>


              <!-- start of year -->
              <div class="row mb-10 ">
                <label class="col-lg-2 col-form-label text-lg-end">{{ t("startOfYearDate") }}:</label>
                <div class="col-sm-6 col-lg-4 col-xl-3  col-3 mx-5">
                  <el-form-item prop="name" :disabled="SystemSettingsStore.errorOccured">

                    <el-date-picker v-model="SystemSettingsStore.systemSettings.startOfYear"
                    style="width: 100%"
                      :disabled="SystemSettingsStore.errorOccured" type="month">
                    </el-date-picker>

                  </el-form-item>
                </div>

                <div class="col-lg-4 col-xl-4 col">

                  <button :data-kt-indicator="SystemSettingsStore.startOfYearDataSubmitting ? 'on' : null"
                    class="btn btn-sm btn-primary col-lg-4 col-xl-5 col-sm-4 col-7 " type="submit"
                    @click.prevent="handleUpdate(SystemSettingType.StartDateOfSchool, $event)">
                    <span v-if="!SystemSettingsStore.startOfYearDataSubmitting" class="indicator-label">
                      {{ $t("save") }}
                      <span class="svg-icon svg-icon-3 ms-2 me-0">
                        <!-- <inline-svg src="icons/duotune/arrows/arr064.svg" /> -->
                      </span>
                    </span>
                    <span v-if="SystemSettingsStore.startOfYearDataSubmitting" class="indicator-progress btn-sm">
                      {{ $t("pleaseWait") }}...
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>

              </div>


              <!-- end of year -->
              <div class="row mb-10">
                <label class="col-lg-2 col-form-label text-lg-end">{{ t("endOfYearDate") }}:</label>
                <div class="col-sm-6 col-lg-4 col-xl-3  col-3 mx-5">

                  <el-form-item prop="name">
                    <el-date-picker v-model="SystemSettingsStore.systemSettings.endOfYear"
                    style="width: 100%"
                      :disabled="SystemSettingsStore.errorOccured" type="month">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="col-lg-4 col-xl-4 col">

                  <button :data-kt-indicator="SystemSettingsStore.endOfYearDataSubmitting ? 'on' : null"
                    class="btn btn-sm btn-primary col-lg-4 col-xl-5 col-sm-4 col-7 " type="submit"
                    @click.prevent="handleUpdate(SystemSettingType.EndDateOfSchool, $event)">
                    <span v-if="!SystemSettingsStore.endOfYearDataSubmitting" class="indicator-label">
                      {{ $t("save") }}
                      <span class="svg-icon svg-icon-3 ms-2 me-0">
                      </span>
                    </span>
                    <span v-if="SystemSettingsStore.endOfYearDataSubmitting" class="indicator-progress">
                      {{ $t("pleaseWait") }}...
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>


                </div>
              </div>
            </div>

            <div class="tab-pane" :class="{ active: tabIndex === 1 }" id="kt_builder_header">



              <div class="card-body pt-2">
                <!-- begin::table -->
                <el-table :data="SubscriptionSettingsStore.subscriptionSettings" style="width: 100%" height="500">
                  <el-table-column prop="period" :label="$t('period')" width="100" align="center" header-align="center" />
                  <el-table-column prop="createdAt" :formatter="formatter('createdAt')" :label="$t('createdDate')"
                    width="150" align="center" header-align="center" />
                  <el-table-column prop="lastUpdated" :formatter="formatter('lastUpdated')" :label="$t('updatedDate')"
                    width="150" align="center" header-align="center" />
                  <el-table-column :label="$t('edit')" width="150" align="center" header-align="center">
                    <template #default="scope">
                        <a
                            class="btn btn-icon btn-light-success btn-sm"
                            data-bs-toggle="modal"
                            :data-bs-target="`#kt_modal_update_subscription_settings`"
                            @click="handleEdit(scope.$index, scope.row)"
                        >
                          <i class="bi bi-pencil"></i>
                        </a>



                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('delete')" width="150" align="center" header-align="center">
                    <template #default="scope">

                      <a
                          class="btn btn-icon btn-light-danger btn-sm"
                          data-bs-toggle="modal"
                          :data-bs-target="`#kt_modal_delete_subscription_settings`"
                          @click="handleDelete(scope.$index, scope.row)">
                        <i class="bi bi-trash"></i>
                      </a>



                    </template>
                  </el-table-column>
                </el-table>
                <!-- end::table -->

                <!-- start::pagination -->
                <!-- <el-pagination layout="prev, pager, next" :total="1000" /> -->
                <!-- end::pagination -->
              </div>
              <UpdateSubscriptionSettingModal ref="updateSubscriptionSettingsModalRef">
              </UpdateSubscriptionSettingModal>
              <DeleteSubscriptionSettingModal />
              <AddSubscriptionSettingModal />
            </div>
          </div>
        </div>
        <!--end::Body-->
      </form>
      <!--end::Form-->
    </div>
  </div>
  <!--end:List Widget 3-->
</template>
  
<script setup lang="ts">
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { useSystemSettingsStore } from '@/store/pinia_store/modules/SystemSettingsModule';
import { useI18n } from "vue-i18n";
import { onMounted, ref } from 'vue';
import { SystemSettingType } from '@/types/SystemSettings';
import Toaster from '@/core/services/Toaster';
import { useSubscriptionSettingsStore } from '@/store/pinia_store/modules/SubscriptionSettings';
import { hideModal, openModal } from "@/core/helpers/dom";
import DeleteSubscriptionSettingModal from "@/views/SystemSettings/modals/DeleteSubscriptionSettingsModal.vue";
import UpdateSubscriptionSettingModal from "@/views/SystemSettings/modals/UpdateSubscriptionSettingsModal.vue";
import AddSubscriptionSettingModal from "@/views/SystemSettings/modals/AddSubscriptionSettingsModal.vue";
import { SubscriptionSettings } from '@/types/SubscriptionSettings';
import { formatDate } from '@/core/helpers/formatDate';
const { t } = useI18n();

const tabIndex = ref(0);
const SystemSettingsStore = useSystemSettingsStore();
const SubscriptionSettingsStore = useSubscriptionSettingsStore();

const updateSubscriptionSettingsModalRef = ref<{ modalRef: HTMLElement } | null>(null);

const refreshCard = async () => {
  console.log("refreshing card");

  if (tabIndex.value == 0)
    await SystemSettingsStore.getSettings();

  if (tabIndex.value == 1)
    await SubscriptionSettingsStore.getSubscriptionSettings();
}
const formatter = (key: "createdAt" | "lastUpdated") => {
  return (user: SubscriptionSettings) => formatDate(user[key]);
};

const handleEdit = (index: number, row: SubscriptionSettings) => {

  // @ts-ignore
  SubscriptionSettingsStore.subsctiptionSettingToUpdate = structuredClone({ ...row });
  console.log(index, row)
}
const handleDelete = (index: number, row: SubscriptionSettings) => {

  // @ts-ignore
  SubscriptionSettingsStore.subsctiptionSettingToDelete = structuredClone({ ...row });
  console.log(index, row)
}


onMounted(() => {
  refreshCard();
  // SystemSettingsStore.getSettings();
  // SubscriptionSettingsStore.getSubscriptionSettings();
  // set the tab from previous
  tabIndex.value = parseInt(localStorage.getItem("builderTab") || "0");
  setCurrentPageBreadcrumbs(t("systemSettings"), [t("systemSettings")]);
});


// update system settings
const handleUpdate = async (enumType: SystemSettingType, event: Event) => {

  try {
    await SystemSettingsStore.updateSettings(enumType, event);

  } catch (error) {

    Toaster.error((error as Error).message);
  }
}

/**
 * Reset config
 * @param event
 */
const reset = (event) => {
  event.preventDefault();
  // remove existing saved config
  localStorage.removeItem("config");
  window.location.reload();
};

/**
 * Set active tab when the tab get clicked
 * @param event
 */
const setActiveTab = (event) => {
  tabIndex.value = parseInt(event.target.getAttribute("data-tab-index"));
  // keep active tab
  localStorage.setItem("builderTab", tabIndex.value.toString());
  refreshCard();
};

/**
 * Submit form
 * @param event
 */
const submit = (event) => {
  event.preventDefault();
  // save new config to localStorage
  // localStorage.setItem("config", JSON.stringify(config.value));



  window.location.reload();
};



//  setCurrentPageBreadcrumbs("systemSettings", ["systemSettings"]);
</script>
  
<style>
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
  