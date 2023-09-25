<template>
  <!--begin::Modal - New Card-->
  <div id="kt_modal_delete_subscription_settings" ref="modalRef" class="modal fade" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>Delete General Subscription period</h2>
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
                <span class="required">Are you Sure you Want to Delete this subscitption Setting? </span>
                <i class="fas  ms-2 fs-7" data-bs-toggle="tooltip"
                  title="Type in 'delete' to confirm "></i>
              </label>
              <!--end::Label-->
              <Field 
              id="confirmDeleteText"
              ref="confirmDeleteText"
              name="typeDelete" 
              :validate-on-blur="true"
              :validate-on-change="true" 
              type="text" 
              class="form-select form-select-solid" 
              data-hide-search="true"  
              place-holder="Enter 'delete' to Confirm"
              :rules="mustBeValidNumber">               
              </Field>
 
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="typeDelete" />
                </div>
              </div>
            </div>
            <!--end::Input group-->


            <!--begin::Actions-->
            <div class="text-center pt-15">

              <button id="kt_modal_new_card_cancel" type="reset" data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_subscription_settings`" class="btn btn-white me-3">
                {{ $t("discard") }}
              </button>
              <button id="kt_modal_new_card_submit" 

              ref="submitButtonRef" 
              type="submit" 
              class="btn btn-primary">
                <span class="indicator-label">  {{$t("submit")}} </span>
                <span class="indicator-progress">
                  {{$t("pleaseWait")}}
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
import { onMounted, ref, defineEmits, defineExpose } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { Modal } from "bootstrap";
import { useSubscriptionSettingsStore } from "@/store/pinia_store/modules/SubscriptionSettings";
import { formatDate } from "@/core/helpers/formatDate";

const store = useSubscriptionSettingsStore();

const submitButtonRef = ref<null | HTMLButtonElement>(null);

const modalRef = ref<null | HTMLElement>(null);
const confirmDeleteText = ref<null | HTMLElement>(null);
const cardData = ref<number>(0);

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", (e) => {

    const input = document.getElementById('confirmDeleteText')
    console.log(input);
    
    if (input?.innerText) 
    {  
      input!.innerText = ''
      input.textContent = '';
      input.innerHTML = ''
    } 

    if (confirmDeleteText.value) 
      confirmDeleteText.value.textContent = "";
  });
});


const emit = defineEmits<{ (event: "submit", isSuccess: boolean) }>();
defineExpose({ modalRef });



const submit = async () => {
  // here run the validation
  
  console.log(" am in the submit");
  console.log(submitButtonRef.value);
  
  if (!submitButtonRef.value)
    return;


    submitButtonRef.value.click();

  submitButtonRef.value.setAttribute("data-kt-indicator", "on");
  submitButtonRef.value.disabled = true;

  const added = await store.deleteSubscriptionSettings();


  if (submitButtonRef.value) {
    submitButtonRef.value.disabled = false;

    submitButtonRef.value?.removeAttribute("data-kt-indicator");
  }

  if (added) {
    hideModal(modalRef.value);
  }
}

const mustBeValidNumber = yup.string()
    .oneOf(['delete'], 'Field must equal "delete"')
    .required('Field is required');


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
