<template>
  <!--begin::Modal - New Card-->
  <div
    id="kt_modal_update_subscription_settings"
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>{{ $t("updateGeneralSubscriptionPeriod") }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <!--begin::Form-->
          <el-form
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
          >
            <div class="row">
              <div class="col-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("period") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="period">
                  <el-input
                    v-model="formData.period"
                    type="number"
                    placeholder=""
                    :min="0"
                    :max="365"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

              <div class="col-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("arabicName") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="arabicName">
                  <el-input
                    v-model="formData.arabicName"
                    type="text"
                    :placeholder="$t('arabicName')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <div class="row">
              <div class="col-6 mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishName") }}
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="description">
                  <el-input
                    v-model="formData.englishName"
                    :placeholder="$t('englishName')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

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
                :data-kt-indicator="store.dataLoading ? 'on' : null"
                class="btn btn-sm btn-primary"
                type="submit"
                style="width: 200px"
              >
                <span v-if="!store.dataLoading" class="indicator-label">
                  {{ $t("save") }}
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span v-if="store.dataLoading" class="indicator-progress">
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
          <!--end::Form-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - New Card-->
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineExpose, reactive, watch } from "vue";
import { Modal } from "bootstrap";
import { useSubscriptionSettingsStore } from "@/store/pinia_store/modules/SubscriptionSettings";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import i18n from "@/core/plugins/i18n";
const t = i18n.global.t;

const store = useSubscriptionSettingsStore();

const modalRef = ref<null | HTMLElement>(null);
const formRef = ref<HTMLFormElement | null>(null);

const emit = defineEmits<{ (event: "submit", isSuccess: boolean) }>();
defineExpose({ modalRef });

const submit = async () => {
  formRef.value!.validate((valid) => {
    if (!valid) {
      return;
    }
  });
  const success = await store.updateSubscriptionSettings({
    arabicName: formData.arabicName!,
    englishName: formData.englishName!,
    period: formData.period!,
  });

  if (success) {
    hideModal(modalRef.value);
  }
};

const formData = reactive({
  period: 0,
  arabicName: "",
  englishName: "",
});

const rules = ref<Record<keyof typeof formData, object[]>>({
  period: [{ required: true, message: t("required"), trigger: "blur" }],
  arabicName: [
    { required: true, message: t("required"), trigger: "blur" },
    {
      required: true,
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  englishName: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    },
  ],
});

/////////////////////// helpers
const hideModal = (modalEl): void => {
  console.log(modalEl);

  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal.hide();
};

watch(
  () => store.subsctiptionSettingToUpdate,
  (item) => {
    if (item) {
      formData.period = store.subsctiptionSettingToUpdate.period;
      formData.arabicName = store.subsctiptionSettingToUpdate.periodArabicName;
      formData.englishName =
        store.subsctiptionSettingToUpdate.periodEnglishName;
    }
  }
);
</script>
