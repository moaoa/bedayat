<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">

      <h3 class="card-title fw-bolder text-dark">{{ t("Packages") }}</h3>
      <div class="card-toolbar d-flex flex-row">

        <a class="btn btn-icon btn-light-primary btn-sm me-3"
           @click="localitiesStore.loadLocalities(localitiesStore.selectedCityId)">
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a href="#" class="btn btn-sm btn-primary mx-1" target="#" data-bs-toggle="modal"
           :data-bs-target="`#kt_modal_add_customer`">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg"/>
          </span>
          {{ $t("addLocality") }}
        </a>


      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
<!--      <div class="row">-->
<!--        <div class="col-md-3 col-lg-2 col-7">-->

<!--          <el-select v-model="citiesStore.selectedCountryId" clearable filterable>-->
<!--            <el-option v-for="country in countriesStore.countries" :key="country.id" :value="country.id"-->
<!--                       :label="country.name">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </div>-->
<!--      </div>-->

      <div v-loading="localitiesStore.dataIsLoading">

        <el-form
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
        >


          <div class="row">

            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("name") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="englishName">
                <el-input
                    v-model="formData.englishName"
                    type="text"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("englishName") }}</label
              >
              <!--end::Label-->
              <!--begin::Input-->
              <el-form-item prop="englishName">
                <el-input
                    v-model="formData.englishName"
                    type="text"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("title") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="englishName">
                <el-input
                    v-model="formData.englishName"
                    type="text"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>


            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("englishTitle") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="englishName">
                <el-input
                    v-model="formData.englishName"
                    type="text"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("englishName") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="englishName">
                <el-input
                    v-model="formData.englishName"
                    type="file"
                    placeholder=""
                    @change="handleLogoUpload"
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("englishName") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="englishName">
<!--                <el-input-->
<!--                    v-model="formData.englishName"-->
<!--                    type="text"-->
<!--                    placeholder=""-->
<!--                />-->

                          <el-select v-model="citiesStore.selectedCountryId" clearable filterable>
                            <el-option v-for="country in countriesStore.countries" :key="country.id" :value="country.id"
                                       :label="country.name">
                            </el-option>
                          </el-select>



              </el-form-item>
              <!--end::Input-->
            </div>






          </div>

<!--          <div class="modal-body py-10 px-lg-17">-->
<!--            <div-->
<!--                class="scroll-y me-n7 pe-7"-->
<!--                id="kt_modal_add_customer_scroll"-->
<!--                data-kt-scroll="true"-->
<!--                data-kt-scroll-activate="{default: false, lg: true}"-->
<!--                data-kt-scroll-max-height="auto"-->
<!--                data-kt-scroll-dependencies="#kt_modal_add_customer_header"-->
<!--                data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"-->
<!--                data-kt-scroll-offset="300px"-->
<!--            >-->

<!--              -->

<!--            </div>-->
<!--          </div>-->
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
      <br/>
      <!-- start::pagination -->
      <el-pagination v-if="!localitiesStore.dataIsLoading && !localitiesStore.errorLoadingData
        " background layout="total, sizes, prev, pager, next, jumper" :total="localitiesStore.total"
                     current-page="{{currentPage}}" page-size="{{currentSize}}" pager-count="{{pageCount}}"
                     :page-sizes="[25, 100, 200, 300, 400]"/>
      <!-- end::pagination -->
    </div>

  </div>
  <!--end:List Widget 3-->
</template>

<script lang="ts" setup>
import {ref, computed, reactive, onMounted, watch} from "vue";

import { useI18n } from "vue-i18n";
import {Locality, NewLocalityData} from "@/types/Localities";
import { useLocalitiesStore } from "@/store/pinia_store/modules/LocalitiesModule";
import {useCitiesStore} from "@/store/pinia_store/modules/CitiesModule";
import {useCountriesStore} from "@/store/pinia_store/modules/CountriesModule";
import AddLocalityForm from "@/views/Localities/AddLocalityModal.vue";
import DeleteLocality from "@/views/Localities/DeleteLocality.vue";
import UpdateLocalityModal from "@/views/Localities/UpdateLocalityModal.vue";

const { t } = useI18n();

const localitiesStore = useLocalitiesStore();
const citiesStore = useCitiesStore();
const countriesStore = useCountriesStore();

const loading = computed(() => localitiesStore.isCreatingNewItem);

const formRef = ref<null | HTMLFormElement>(null);

const modalRef = ref<null | HTMLElement>(null);

const formData = reactive<NewLocalityData>({
  name: "",
  englishName: "",
  cityId: "",
});

const emit = defineEmits<{
  (event: "submit", data: NewLocalityData);
}>();

defineExpose({
  modalRef,
});



const handleFileBook = async (event: Event) => {
  if ((event.target as HTMLInputElement).files) {
    const files = (event.target as HTMLInputElement).files as FileList;
    const file = files.length > 0 ? files[0] : null;

    if (!file) return;

    console.log(file);
    formData.book = file;
  }
};


const rules = ref({
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
  countryId: [{ required: true, message: t("required"), trigger: "blur" }],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate((valid) => {
    if (valid) {
      emit("submit", formData);
    }
  });
};

onMounted(() => {


  modalRef.value?.addEventListener("hidden.bs.modal", (e) => {
    if (formRef.value)
      localitiesStore.unselectLocality();

    countriesStore.loadCountries();
  });
});



watch(
    () => citiesStore.selectedCountryId,
    (id) => {
      console.log(id);
      if (id) {
        citiesStore.loadCities({ countryId: id });
      }
    }
);

watch(
    () => localitiesStore.selectedCityId,
    (id) => {
      if (id) {
        localitiesStore.loadLocalities(id);
      }
    }
);


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