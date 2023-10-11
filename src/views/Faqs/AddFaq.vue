<template>
  <div
      id="kt_modal_add_faq"
      class="modal fade"
      tabindex="-1"
      ref="modalRef"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div id="kt_modal_add_faq" class="modal-header">
          <h2 class="fw-bolder">{{ $t("addNewFaq") }}</h2>
          <div
              id="kt_modal_add_customer_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg"/>
            </span>
          </div>
          <!--end::Close-->
        </div>
        <el-form
            ref="formRef"
            :rules="rules"
            :model="formData"
            @submit.prevent="submit()"
        >
          <!--          {{formRef.value}}-->
          <!--          {{formRef.value.validate}}-->
          <div class="modal-body py-10 px-lg-17">
            <div
                id="kt_modal_add_customer_scroll"
                class="scroll-y me-n7 pe-7"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_modal_add_customer_header"
                data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
                data-kt-scroll-offset="300px"
            >


              <div class="d-flex flex-column mb-7 fv-row">
                <label class="fs-6 fw-bold mb-2">
                  <span class="required"> {{ $t("choseCategory") }}</span>

                  <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                     title="Country of origination"
                  ></i>
                </label>
                <el-form-item prop="faqCategory">

                  <el-select v-model.number="formData.faqCategory">
                    <el-option :label="$t('choseCategory')" :value="-1" disabled>{{ $t("choseCategory") }}...
                    </el-option>
                    <el-option :label="$t('general')" :value="0">{{ $t("general") }}</el-option>
                    <el-option :label="$t('login')" :value="1">{{ $t("login") }}</el-option>
                    <el-option :label="$t('courses')" :value="2">{{ $t("courses") }}</el-option>
                    <el-option :label="$t('subscription')" :value="3">{{ $t("subscription") }}</el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("question") }}
                </label>

                <!--begin::Input-->
                <el-form-item prop="question">
                  <el-input
                      v-model="formData.question"
                      type="text"
                      placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("answer") }}</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="answer">
                  <el-input
                      v-model="formData.answer"
                      type="textarea"
                      placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishQuestion") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishQuestion">
                  <el-input
                      v-model="formData.englishQuestion"
                      type="text"
                      placeholder=""
                  />
                </el-form-item>

                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishAnswer") }}</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishAnswer">
                  <el-input
                      v-model="formData.englishAnswer"
                      type="textarea"
                      placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
              </div>

            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">

            <!--begin::Button-->
            <button
                id="kt_modal_add_faq"
                type="reset"
                class="btn btn-light me-3 btn-sm"
                style="width: 100px"
                @click="resetForm(formRef)"
                data-bs-dismiss="modal"

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
                  <inline-svg src="icons/duotune/arrows/arr064.svg"/>
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
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {computed, onMounted, reactive, ref, watch} from "vue";

import {useI18n} from "vue-i18n";
import {Faq, NewFaqData} from "@/types/Faq";
import {useFaqsStore} from "@/store/pinia_store/modules/FaqsModule";
import Toaster from "@/core/services/Toaster";
import {hideModal} from "@/core/helpers/dom";
import {FormInstance} from "element-plus";

const {t} = useI18n();

const faqsStore = useFaqsStore();
const loading = computed(() => faqsStore.isCreatingNewItem);
const formRef = ref<FormInstance>();
const modalRef = ref<null | HTMLElement>(null);

const formData = reactive<NewFaqData>({
  faqCategory: -1,
  question: "",
  answer: "",
  englishQuestion: "",
  englishAnswer: ""
});

// eslint-disable-next-line no-undef
const emit = defineEmits<{
  (event: "submit", data: NewFaqData)
}>();
// eslint-disable-next-line no-undef
defineExpose({
  modalRef
});

const isValidCategory = (rule: any, value: any, callback: any) => {
  if (value === -1) {
    callback(new Error(t("required")))
  } else {
    callback()
  }
}
const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate((valid) => {
    if (valid) {
      emit("submit", formData);
      formRef.value.resetFields();
      hideModal(modalRef.value)
    } else {
      Toaster.error("حدث خطأ", t("someFieldsNotFill"));
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formRef.value.resetFields();
};
onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", (e) => {
    formRef.value.resetFields();
  })
})


const rules = reactive<FormRules<Faq>>({
  faqCategory: [
    {
      required: true,
      message: t("theFieldIsRequired", {field: t("faqCategory")}),
      trigger: "change",
      validator: isValidCategory
    }
  ],
  question: [
    {
      message: t("nameMustBeArabic", {field: t("question")}),
      required: true,
      pattern: /^[ء-ي\s]+$/,
      trigger: ["blur", "change"],
    }
  ], answer: [
    {
      message: t("nameMustBeArabic", {field: t("answer")}),
      required: true,
      pattern: /^[ء-ي\s]+$/,
      trigger: ["blur", "change"],
    }
  ], englishQuestion: [
    {
      message: t("nameMustBeEnglish", {field: t("englishQuestion")}),
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      trigger: ["blur", "change"],
    }
  ], englishAnswer: [
    {
      message: t("nameMustBeEnglish", {field: t("englishAnswer")}),
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      trigger: ["blur", "change"],
    }
  ]
});



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
