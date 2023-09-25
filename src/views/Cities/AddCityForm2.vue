<template>
  <!--begin::Form-->
  <el-form :model="newCityDataForm" :rules="rules" ref="formRef">
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
            {{ $t("arabicName") }}
          </label>

          <!--begin::Input-->
          <el-form-item prop="arabicName">
            <el-input
              v-model="newCityDataForm.arabicName"
              type="text"
              placeholder=""
            />
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="fv-row mb-7">
          <!--begin::Label-->
          <label class="fs-6 fw-bold mb-2">
            <span class="required">
              {{ $t("englishName") }}
            </span>
          </label>
          <!--end::Label-->

          <!--begin::Input-->
          <el-form-item prop="englishName">
            <el-input v-model="newCityDataForm.englishName" />
          </el-form-item>
          <!--end::Input-->
        </div>
        <!--end::Input group-->

        <!--begin::Billing form-->
        <div id="kt_modal_add_customer_billing_info" class="collapse show">
          <!--begin::Input group-->
          <div class="d-flex flex-column mb-7 fv-row">
            <!--begin::Label-->
            <label class="fs-6 fw-bold mb-2">
              <span class="required">{{ $t("country") }}</span>
            </label>
            <!--end::Label-->

            <!--begin::Input-->
            <el-form-item prop="countryId">
              <el-select
                v-model="newCityDataForm.countryId"
                clearable
                filterable
                style="width: 100%"
              >
                <el-option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.id"
                  :label="country.name"
                >
                  {{ country.name }}
                </el-option>
              </el-select>
            </el-form-item>
            <!--end::Input-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Billing form-->
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
        class="btn btn-light me-3"
        @click="onClose"
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
import { reactive, computed, ref } from "vue";
import { NewCityData } from "@/types/Cities";
import { useCountriesStore } from "@/store/pinia_store/modules/CountriesModule";
import { useI18n } from "vue-i18n";
import type { FormInstance, FormRules } from "element-plus";

const { t } = useI18n();

defineProps({ isOpen: Boolean });

const formRef = ref<FormInstance>();
const rules = reactive<FormRules<NewCityData>>({
  arabicName: [
    { required: true, message: t("required"), trigger: "blur" },
    {
      max: 10,
      min: 3,
      message: t("stringLength", { min: 3, max: 10 }),
      trigger: "blur",
    },
  ],
  englishName: [
    { required: true, message: t("required"), trigger: "blur" },
    {
      max: 10,
      min: 3,
      message: t("stringLength", { min: 3, max: 10 }),
      trigger: "blur",
    },
  ],
  countryId: [
    { required: true, message: t("required"), trigger: "blur" },
    {
      min: 1,
      message: t("stringLength", { min: 3, max: 10 }),
      change: "blur",
    },
  ],
});
const emit = defineEmits(["close", "submit"]);
const countriesStore = useCountriesStore();
const newCityDataForm = reactive<NewCityData>({
  arabicName: "",
  englishName: "",
  countryId: "",
});
const countries = computed(() => countriesStore.countries);

const submitForm = async (formEl: FormInstance | undefined) => {
  emit("submit", newCityDataForm);

  if (!formEl) return;
  await formEl.validate((valid: boolean, fields: string) => {
    if (valid) {
      emit("submit", newCityDataForm);
    } else {
      console.log(fields);
    }
  });
};
const onClose = () => {
  emit("close");
};
</script>
