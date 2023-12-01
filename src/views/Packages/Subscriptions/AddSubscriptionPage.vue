<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">
        {{ $t("addSubscription") }}
      </h3>

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
                  {{ $t("details") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="detailss">
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
                      v-for="periods in subscriptionSettingsStore.subscriptionSettings"
                      :key="periods.id"
                      :value="periods.id"
                      :label="periods.period"
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
import { reactive, ref, onMounted, computed } from "vue";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { useI18n } from "vue-i18n";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { useSubscriptionSettingsStore } from "@/store/pinia_store/modules/SubscriptionSettings";
import { useSubscriptionStore } from "@/store/pinia_store/modules/SubscriptionModule";
import { NewSubscriptionData } from "@/types/Subscription";
import router from "@/router";

const { t } = useI18n();

const gradesStore = useGradesStore();

const subscriptionSettingsStore = useSubscriptionSettingsStore();
subscriptionSettingsStore.getSubscriptionSettings();

const subscriptionsStore = useSubscriptionStore();
const formRef = ref<null | HTMLFormElement>(null);
const loading = computed(() => subscriptionsStore.isCreatingNewItem);
const formData = reactive<NewSubscriptionData>({
  englishTitle: "",
  title: "",
  details: "",
  discount: 0,
  englishDetails: "",
  englishSubTitle: "",
  fakePrice: 0,
  packageId: router.currentRoute.value.params.id as string,
  price: 0,
  subTitle: "",
  subscriptionSettingId: "",
});

const rules = ref<Record<keyof NewSubscriptionData, object[]>>({
  title: [
    {
      required: true,
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  details: [
    {
      required: true,
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  subTitle: [
    {
      required: true,
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],

  englishDetails: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    },
  ],
  englishSubTitle: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    },
  ],
  englishTitle: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    },
  ],

  packageId: [{ required: true, message: t("required"), trigger: "blur" }],
  fakePrice: [{ required: true, message: t("required"), trigger: "blur" }],
  subscriptionSettingId: [
    { required: true, message: t("required"), trigger: "blur" },
  ],
  price: [{ required: true, message: t("required"), trigger: "blur" }],
  discount: [{ required: true, message: t("required"), trigger: "blur" }],
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
      await subscriptionsStore.createNewItem(formData);
    } catch (error) {
      console.log(error);
    }
  });
};

onMounted(() => {});
subscriptionSettingsStore.getSubscriptionSettings();

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
