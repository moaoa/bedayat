<template>
  <!--begin::Form-->
  <el-form :model="formData" :rules="rules" ref="formRef">
    <!--begin::Modal body-->
    <div class="modal-body px-lg-17">
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

        <div class="fv-row mb-7 ">
          <!--begin::Label-->
          <label class=" fs-6 fw-bold mb-2">
            {{ $t("title") }}
          </label>
          <div>

          </div>
          <!--begin::Input-->
          <el-form-item prop="response">
            <p>{{bugReportStore.selectedBugToRespond.title}}</p>
          </el-form-item>
          <!--end::Input-->
        </div>

        <div class="fv-row mb-7 mt-10">
          <!--begin::Label-->
          <label class=" fs-6 fw-bold mb-2">
            {{ $t("description") }}
          </label>
          <div>

          </div>
          <!--begin::Input-->
          <el-form-item prop="response">
            <p>{{bugReportStore.selectedBugToRespond.description}}</p>
          </el-form-item>
          <!--end::Input-->
        </div>

        <div  class="row">

          <div v-if="bugReportStore.selectedBugToRespond?.attachmentPaths?.length" class=" col-12">
            <swiper
                :slides-per-view="1"
                :space-between="30"
                allow-slide-next
                allow-slide-prev
                :loop="true"
                :navigation="true"
                :modules="[Navigation, Pagination]"
            >
              <swiper-slide v-for="path in bugReportStore.selectedBugToRespond?.attachmentPaths"

              >

                <img style=" width: 100%"

                     height="300"
                     class="object-fit-contain justify-content-center"
                     :src="path"
                     loading="eager"
                     alt=""
                />
              </swiper-slide>
            </swiper>
          </div>
          <div class="d-flex justify-content-center fs-4" v-else>
            <p>{{ $t("noAttachment") }}</p>
          </div>
        </div>


        <div class="fv-row mb-7 mt-10">
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
        {{ $t("discard") }}
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
          {{ $t("submit") }}
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
import {Swiper, SwiperSlide} from 'swiper/vue';

import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import {useBugReportsStore} from "@/store/pinia_store/modules/BugReportModule";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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