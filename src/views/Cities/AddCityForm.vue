<template>
  <div class="modal fade" id="kt_modal_add_customer" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("addNewCity") }}</h2>
          <div id="kt_modal_add_customer_close" data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary">
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <el-form ref="formRef" :model="formData" :rules="rules" @submit.prevent="submit()">
          <div class="modal-body py-10 px-lg-17">
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2" for="countryId">
                  <span class="required"> {{ $t("pickUpCountry") }}</span>

                  <!--                  <i-->
                  <!--                    class="fas fa-exclamation-circle ms-1 fs-7"-->
                  <!--                    data-bs-toggle="tooltip"-->
                  <!--                    title="Country of origination"-->
                  <!--                  ></i>-->
                </label>
                <el-select id="countryId" name="countryId" v-model="formData.countryId">
                  <el-option v-for="country in countriesStore.countries" :key="country.id" :value="country.id"
                    :label="country.name">
                  </el-option>
                </el-select>
                <!--end::Input-->
              </div>

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("arabicName") }}
                </label>
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input v-model="formData.name" type="text" placeholder="" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishName") }}</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishName">
                  <el-input v-model="formData.englishName" type="text" placeholder="" />
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
            <button type="reset" id="kt_modal_add_customer_cancel" class="btn btn-light me-3 btn-sm" style="width: 100px">
              {{ $t("cancel") }}
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-sm btn-primary" type="submit"
              style="width: 200px">
              <span v-if="!loading" class="indicator-label">
                {{ $t("save") }}
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="loading" class="indicator-progress">
                {{ $t("pleaseWait") }}...

                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
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
import {ref, computed, reactive, watch, onMounted, onUnmounted} from "vue";

import { useI18n } from "vue-i18n";
import { NewCityData } from "@/types/Cities";
import { useCitiesStore } from "@/store/pinia_store/modules/CitiesModule";
import { useCountriesStore } from "@/store/pinia_store/modules/CountriesModule";
import toaster from "@/core/services/Toaster";

const { t } = useI18n();

const citiesStore = useCitiesStore();
const countriesStore = useCountriesStore();

const loading = computed(() => citiesStore.isCreatingNewItem);

const formRef = ref<null | HTMLFormElement>(null);

const modalRef = ref<null | HTMLElement>(null);

const formData = reactive<NewCityData>({
  name: "",
  englishName: "",
  countryId: countriesStore?.countries[0]?.id?? "",
});

const emit = defineEmits<{
  (event: "submit", data: NewCityData);
}>();

defineExpose({
  modalRef,
});
onMounted(()=> {
  countriesStore.loadCountries();
})

onUnmounted(()=> {
  formData.name  =""
  formData.englishName  =""
})
const rules = ref({
  countryId:[
    { required: true, message: t("required"), trigger: "blur" },
  ],
  name: [
    { required: true, message: t("required"), trigger: "blur" },
    {
      required: true,
      pattern:  /^[ء-ي\s]+$/,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    }
  ],
  englishName: [
    {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    }
  ],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate((valid) => {

    if (!valid || !formData.countryId) {
      toaster.error("invalid data ")
    }else
      emit("submit", formData);
  });
};

watch(()=> countriesStore.countries, (val)=> {
if (val) {
  formData.countryId = val[0]?.id
  citiesStore.selectedCountryId = val[0]?.id
}})
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
