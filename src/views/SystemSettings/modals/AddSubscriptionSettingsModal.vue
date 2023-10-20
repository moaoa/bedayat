<template>
  <!--begin::Modal - New Card-->
  <div class="modal fade" ref="addSubscriptionSettingsModalRef" id="kt_modal_new_subscription_settings" tabindex="-1"
    aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>{{ t('addnewGeneralSubscriptionDate') }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
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
          <Form id="kt_modal_new_card_form" class="form" @submit="submit">
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-7 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold form-label mb-2">
                <span class="required">{{ t('numberOfDays') }}</span>
                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Specify a card holder's name"></i>
              </label>
              <!--end::Label-->
              <Field v-model="cardData" name="numberOfDays" :validate-on-blur="true" :validate-on-change="true" type="number"
                class="form-select form-select-solid" data-control="select2" data-hide-search="true"
                data-placeholder="Month" as="select" :rules="mustBeValidNumber">
                <option></option>
                <template v-for="i in 365" :key="i">
                  <option :value="i">{{ i }}</option>
                </template>
              </Field>
              <!-- <Field type="text" class="form-control form-control-solid" placeholder="" name="nameOnCard"
                v-model="cardData.nameOnCard" /> -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="numberOfDays" />
                </div>
              </div>
            </div>
            <!--end::Input group-->


            <!--begin::Actions-->
            <div class="text-center pt-15">

              <button type="reset" id="kt_modal_new_card_cancel" data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_new_subscription_settings`" class="btn btn-white me-3">
                {{ $t("discard") }}
              </button>

              <button ref="submitButtonRef" type="submit" id="kt_modal_new_card_submit" class="btn btn-primary">
                <span class="indicator-label">  {{ $t("submit") }}</span>
                <span class="indicator-progress">
                  {{ $t("pleaseWait") }}...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </Form>
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
import { onMounted, ref, defineEmits, defineExpose, VNodeRef } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
const {t} = useI18n();
import { Modal } from "bootstrap";
import Toaster from "@/core/services/Toaster";
import { useSubscriptionSettingsStore } from "@/store/pinia_store/modules/SubscriptionSettings";
import {t} from "element-plus/es/locale";
import {useI18n} from "vue-i18n";

const store = useSubscriptionSettingsStore();

const submitButtonRef = ref<null | HTMLButtonElement>(null);

const addSubscriptionSettingsModalRef = ref<null | HTMLElement>(null);
const cardData = ref<number>(0);

onMounted(() => {
  addSubscriptionSettingsModalRef.value?.addEventListener("hidden.bs.modal", (e) => {
    cardData.value = 0;
  });
});


const emit = defineEmits<{ (event: "submit", isSuccess: boolean) }>();
defineExpose({ addSubscriptionSettingsModalRef });



const submit = async () => {

  // here run the validation
  if (!submitButtonRef.value || cardData.value == 0)
    return;

  submitButtonRef.value.setAttribute("data-kt-indicator", "on");
  submitButtonRef.value.disabled = true;

  const added = await store.addSubscriptionSettings(cardData.value);


  if (submitButtonRef.value) {
    submitButtonRef.value.disabled = false;

    submitButtonRef.value?.removeAttribute("data-kt-indicator");
  }

  if (added) {
    hideModal(addSubscriptionSettingsModalRef.value);
  }
}

const mustBeValidNumber = yup.number().required().min(1).max(365);


/////////////////////// helpers
const hideModal = (modalEl): void => {
  console.log(modalEl);

  if (!modalEl) {
    return;
  }

  const myModal = Modal.getInstance(modalEl);
  myModal.hide();
};

</script>
