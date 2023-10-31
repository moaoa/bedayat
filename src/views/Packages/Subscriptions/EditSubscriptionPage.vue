<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("editSubscription") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <div class="card-body">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <div class="modal-body py-10 px-lg-17">
          <div class="scroll-y me-n7 pe-7">
            <div class="row">
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("title") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="title">
                  <el-input
                    v-model="formData.title"
                    type="text"
                    :placeholder="$t('title')"
                    clearable
                  />
                </el-form-item>

                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishTitle") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishTitle">
                  <el-input
                    v-model="formData.englishTitle"
                    type="text"
                    :placeholder="$t('englishTitle')"
                    clearable
                  />
                </el-form-item>

                <!--end::Input-->
              </div>

              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("details") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="details">
                  <el-input
                    v-model="formData.details"
                    type="text"
                    :placeholder="$t('details')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishDetails") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishDetails">
                  <el-input
                    v-model="formData.englishDetails"
                    type="text"
                    :placeholder="$t('englishDetails')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("subTitle") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="subTitle">
                  <el-input
                      v-model="formData.subTitle"
                      type="text"
                      :placeholder="$t('subTitle')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>



              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishSubTitle") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishSubTitle">
                  <el-input
                      v-model="formData.englishSubTitle"
                      type="text"
                      :placeholder="$t('englishSubTitle')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>


              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("price") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="price">
                  <el-input
                    v-model="formData.price"
                    type="number"
                    :placeholder="$t('price')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("discount") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="discount">
                  <el-input
                      v-model="formData.discount"
                      type="number"
                      :placeholder="$t('discount')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("fakePrice") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="fakePrice">
                  <el-input
                      v-model="formData.fakePrice"
                      type="number"
                      :placeholder="$t('fakePrice')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>


              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("periods") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="subscriptionSetting">
                  <el-select
                    v-model="formData.subscriptionSettingId"
                    type="text"
                    :placeholder="$t('period')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="subscription in subscriptionSettingsStore.subscriptionSettings"
                      :key="subscription.id"
                      :value="subscription.id"
                      :label="subscription.period"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>

            </div>
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <button
            type="reset"
            id="kt_modal_add_customer_cancel"
            class="btn btn-light me-3 btn-sm"
            style="width: 100px"
          >
            {{ $t("cancel") }}
          </button>
          <!--end::Button-->

          <!--begin::Button-->
          <button
            :data-kt-indicator="loading ? 'on' : null"
            class="btn btn-sm btn-primary"
            type="submit"
            style="width: 200px"
          >
            <span v-if="!loading" class="indicator-label">
              {{ $t("save") }}
              <span class="svg-icon svg-icon-3 ms-2 me-0">
                <inline-svg src="icons/duotune/arrows/arr064.svg" />
              </span>
            </span>
            <span v-if="loading" class="indicator-progress">
              {{ $t("pleaseWait") }}...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal footer-->
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { useI18n } from "vue-i18n";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { useFileDialog } from "@vueuse/core";
import {useSubscriptionSettingsStore} from "@/store/pinia_store/modules/SubscriptionSettings";
import {useSubscriptionStore} from "@/store/pinia_store/modules/SubscriptionModule";
import {NewSubscriptionData} from "@/types/Subscription";
import router from "@/router";

const { t } = useI18n();

const {  open, files } = useFileDialog();



const gradesStore = useGradesStore();

const subscriptionSettingsStore = useSubscriptionSettingsStore();
subscriptionSettingsStore.getSubscriptionSettings()

const subscriptionsStore = useSubscriptionStore();
const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => subscriptionsStore.isCreatingNewItem);
const formData = reactive<NewSubscriptionData>({
  englishTitle: subscriptionsStore.selectedSubscription.englishTitle,
  title: subscriptionsStore.selectedSubscription.title,
  details: subscriptionsStore.selectedSubscription.details,
  discount: subscriptionsStore.selectedSubscription.discount,
  englishDetails: subscriptionsStore.selectedSubscription.englishDetails,
  englishSubTitle: subscriptionsStore.selectedSubscription.englishSubTitle,
  fakePrice: subscriptionsStore.selectedSubscription.fakePrice,
  packageId: router.currentRoute.value.params.id as string,
  price: subscriptionsStore.selectedSubscription.price,
  subTitle: subscriptionsStore.selectedSubscription.subTitle,
  subscriptionSettingId: subscriptionsStore.selectedSubscription.subscriptionSettingId
});

const rules = ref<Record<keyof NewSubscriptionData, object[]>>({
  details: [{ required: true, message: t("required"), trigger: "blur" }],
  discount: [],
  englishDetails: [],
  englishSubTitle: [],
  fakePrice: [],
  packageId: [], price: [], subTitle: [],
  subscriptionSettingId: [],
  englishTitle: [{ required: true, message: t("required"), trigger: "blur" }],
  title: [{ required: true, message: t("required"), trigger: "blur" }]
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    try {
      await subscriptionsStore.updateItem(formData);

    } catch (error) {
      console.log(error);
    }
  });
};

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    formRef.value?.resetFields();
  });
});

gradesStore.loadGrades();


</script>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
