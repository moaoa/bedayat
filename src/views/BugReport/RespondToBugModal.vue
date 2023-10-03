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
          data-kt-scroll-offset="400px"
      >

        <div  class="row">
          <label class="required col-3">
            {{ $t("attachedBugImages") }}
          </label>
          <div v-if="bugReportStore.selectedBugToRespond?.attachments?.length" class=" col-6">
            <el-image
                style="width: 200px; height: 100px"
                :src="bugReportStore.selectedBugToRespond.attachments[0]"
                :zoom-rate="1.2"
                loading="eager"
                :preview-src-list="bugReportStore.selectedBugToRespond.attachments"
                :initial-index="2"
                fit="cover"
            />
          </div>
            <div v-else >
              <p>no attachemnts</p>
            </div>
        </div>

        <div class="fv-row mb-7">
          <!--begin::Label-->
          <label class="required fs-6 fw-bold mb-2">
            {{ $t("response") }}
          </label>
          <div>


          </div>
          <!--begin::Input-->
          <el-form-item prop="response">
            <el-input v-model="formData.response" type="textarea" placeholder=""/>
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
            <inline-svg src="icons/duotune/arrows/arr064.svg"/>
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
import {reactive, ref} from "vue";
import {NewCountryData} from "@/types/Countries";
import type {FormInstance, FormRules} from "element-plus";
import {useBugReportsStore} from "@/store/pinia_store/modules/BugReportModule";

const bugReportStore = useBugReportsStore();
const url =
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
defineProps({isOpen: Boolean});

const formRef = ref<FormInstance>();
const rules = reactive<FormRules<NewCountryData>>({
  response: [{required: false}],
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
  bugReportStore.selectedBugToRespond = null;
  emit("close");
};
</script>
<style scoped>
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