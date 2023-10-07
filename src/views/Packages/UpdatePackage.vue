<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">

      <h3 class="card-title fw-bolder text-dark">{{ t("Packages") }}</h3>
      <div class="card-toolbar d-flex flex-row">




      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">


      <div v-loading="gradesStore.dataIsLoading">

        <el-form
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
        >


          <div class="row">
            <div class="col-4">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("title") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="title">
                <el-input
                    v-model="formData.title"
                    type="text"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>


            <div class="col-4">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("description") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="description">
                <el-input
                    v-model="formData.description"
                    type="text"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>

          </div>


          <div class="row">

            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("englishTitle") }}</label
              >
              <!--end::Label-->
              <!--begin::Input-->
              <el-form-item prop="englishTitle">
                <el-input
                    v-model="formData.englishTitle"
                    type="textarea"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="col-4 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("englishDescription") }}</label
              >
              <!--end::Label-->
              <!--begin::Input-->
              <el-form-item prop="englishDescription">
                <el-input
                    v-model="formData.englishDescription"
                    type="textarea"
                    placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="col-6 mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("uploadLogo") }}</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <el-form-item prop="englishName">
                  <button class="btn btn-sm btn-light-primary mx-1 p-3 " style="width: 350px"
                          type="button"
                          onclick="document.getElementById('fileElem').click()">
                    <input type="file" id="fileElem" hidden="hidden" @change="handleLogoUpload"
                           accept="image/*">
                    <span class="bi bi-image">
                    </span>
                    <span class="mx-5"> {{ ta }}</span>

                  </button>
                </el-form-item>
                <!--end::Input-->
              </div>

            </div>
            <div class="col-4">

              <div class="col-6 mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("selectCourses") }}</label
                >
                <!--end::Label-->

                <!--begin::Input-->

                <!-- <el-form-item prop="selectCourses">-->
                <button class="btn btn-sm btn-light-primary mx-1 p-3 " style="width: 350px"
                        type="button"
                        data-bs-toggle="modal"
                        :data-bs-target="`#kt_modal_select_courses_update`"
                >
                  <span class="mx-5"> {{ ("selectCourses") }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-8">
              <el-table
                  :data="coursesStore.selectedCoursesForPackage"
                  class="my-4 mx-4 "
                  max-width
              >
                <el-table-column
                    index="scope.$index"
                    :label="t('noNumber')"
                    width="55"
                    align="center"
                    header-align="center"
                >
                  <template #default="scope:{ row: SelectCoursesDto, $index: number }">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>

                <el-table-column :label="t('logo')"
                                 width="100"
                                 align="center">
                  <template #default="scope">
                    <img :src="scope.row.logoPath">
                  </template>
                </el-table-column>
                <el-table-column property="name" :label="t('name')"
                                 header-align="center"
                                 align="center"
                />
                <el-table-column property="englishName" :label="t('englishName')"
                                 align="center"/>

                <el-table-column :label="t('remove')"
                                 width="100"
                                 align="center">
                  <template #default="scope">

                    <a class="btn btn-icon btn-light-success btn-sm" @click="unSelectCourse(scope.row)">
                      <i class="bi bi-bing"></i>
                    </a>
                  </template>
                </el-table-column>
              </el-table>
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
                :data-kt-indicator="coursesStore.dataIsLoading ? 'on' : null"
                class="btn btn-sm btn-primary"
                type="submit"
                style="width: 200px"
            >
              <span v-if="!coursesStore.dataIsLoading" class="indicator-label">
                {{ $t("save") }}
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="icons/duotune/arrows/arr064.svg"/>
                </span>
              </span>
              <span v-if="coursesStore.dataIsLoading" class="indicator-progress">
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

        <SelectCoursesToUpdateModal  ref="multipleTableRef" />
      </div>
      <br/>

    </div>

  </div>
  <!--end:List Widget 3-->
</template>

<script lang="ts" setup>
import {ref,  reactive, onMounted} from "vue";

import {hideModal} from "@/core/helpers/dom";
import {useI18n} from "vue-i18n";
import {useGradesStore} from "@/store/pinia_store/modules/GradesModule";
import {
  PackageUpdateData,
  SelectCoursesDto
} from "@/types/Packages/Packages";
import {ElTable} from "element-plus";
import {useCoursesStore} from "@/store/pinia_store/modules/CoursesModule";
import {useRoute} from "vue-router";
import SelectCoursesToUpdateModal from "@/views/Packages/SelectCoursesToUpdateModal.vue";
const route = useRoute()
const {t} = useI18n();

const gradesStore = useGradesStore();
const coursesStore = useCoursesStore();

const formRef = ref<null | HTMLFormElement>(null);

const multipleTableRef = ref(null);
const modalRef = ref<null | HTMLElement>(null);


const formData = reactive<PackageUpdateData>({
  packageId: coursesStore.selectedPackage!.id,
  description: coursesStore.selectedPackage!.description,
  englishDescription: coursesStore.selectedPackage!.englishDescription,
  englishTitle: coursesStore.selectedPackage!.englishTitle,
  title: coursesStore.selectedPackage!.title,
  logo: null
});
let ta = ref<string>(t('uploadLogo'))


const deletePackageModalRef = ref<{ modalRef: HTMLElement } | null>(null);


const unSelectCourse = async (course: SelectCoursesDto) => {

  coursesStore.removeCourseFromPackage(course)
  (multipleTableRef.value! as any).toggleSelection([course])
  coursesStore.unselectCourseForPackage(course.id)
}



const handleLogoUpload = async (event: Event) => {
  if ((event.target as HTMLInputElement).files) {
    const files = (event.target as HTMLInputElement).files as FileList;
    const file = files.length > 0 ? files[0] : null;

    if (!file) return;
    ta.value = file.name.length > 15 ? file.name.substring(0, 15) + "..." : file.name;

     formData.logo = file;
  }
};

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid) => {
    if (valid) {

      await coursesStore.updatePackage(formData)

    }
  });
};

onMounted(() => {
  gradesStore.loadGrades();
  coursesStore.getCoursesByPackageId(coursesStore.selectedPackage!.pa)

  modalRef.value?.addEventListener("hidden.bs.modal", (e) => {
    if (formRef.value)
      console.log('')
  });
});



const rules = ref({
  gradeId: [
    {required: true, message: t("required"), trigger: "blur"},
  ],
  title: [
    {required: true, message: t("required"), trigger: "blur"},
    {
      required: true,
      pattern: /^[ء-ي\s]+$/,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    }
  ],
  englishTitle: [
    {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    }
  ],

  description: [
    {
      required: true,
      pattern: /^[ء-ي\s]+$/,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    }
  ],
  englishDescription: [
    {
      required: true,
      pattern: /^[A-Za-z\s]+$/,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    }
  ],

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