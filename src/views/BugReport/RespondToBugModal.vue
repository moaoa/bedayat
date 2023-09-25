<template>
  <!--begin::Form-->
  <el-form :model="formData" :rules="rules" ref="formRef">
    <!--begin::Modal body-->
    <div class="modal-body py-10 px-lg-17">
      <!--begin::Scroll-->
      <div
        class="scroll-y me-n7 pe-7"
        id="kt_modal_add_customer_scroll"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-max-height="auto"
        data-kt-scroll-dependencies="#kt_modal_add_customer_header"
        data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
        data-kt-scroll-offset="300px"
      >
        <!--begin::Input group-->
        <div class="fv-row mb-7">
          <!--begin::Label-->
          <label class="required fs-6 fw-bold mb-2">
            {{ $t("response") }}
          </label>

          <!--begin::Input-->
          <el-form-item prop="response">
            <el-input v-model="formData.response" type="text" placeholder="" />
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Input group-->
      </div>
      <!--end::Scroll-->
    </div>
    <!--end::Modal body-->

    <!--begin::Modal footer-->
    <div class="modal-footer flex-center">
      <!--begin::Button-->
      <button
        id="kt_modal_add_customer_cancel"
        class="btn btn-light me-3"
        @click.prevent="onClose"
      >
        Discard
      </button>
      <!--end::Button-->

      <!--begin::Button-->

      <!-- :data-kt-indicator="loading ? 'on' : null" -->
      <button
        class="btn btn-lg btn-primary"
        type="submit"
        @click.prevent="submitForm(formRef)"
      >
        <span class="indicator-label">
          Submit
          <span class="svg-icon svg-icon-3 ms-2 me-0">
            <inline-svg src="icons/duotune/arrows/arr064.svg" />
          </span>
        </span>
        <!-- <span v-if="loading" class="indicator-progress">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span> -->
      </button>
      <!--end::Button-->
    </div>
    <!--end::Modal footer-->
  </el-form>
  <!--end::Form-->
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { NewCountryData } from "@/types/Countries";
import type { FormInstance, FormRules } from "element-plus";
import { useBugReportsStore } from "@/store/pinia_store/modules/BugReportModule";

const bugReportStore = useBugReportsStore();

defineProps({ isOpen: Boolean });

const formRef = ref<FormInstance>();
const rules = reactive<FormRules<NewCountryData>>({
  response: [{ required: false }],
});

const emit = defineEmits(["close", "submit"]);

const formData = reactive({
  response: "",
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean, fields: string) => {
    if (valid) {
      emit("submit", formData);
    } else {
      console.log(fields);
    }
  });
};
const onClose = () => {
  emit("close");
};
</script>
