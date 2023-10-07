<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">

      <h3 class="card-title fw-bolder text-dark">{{ t("addPackage") }}</h3>
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

            <div class=" col-4 ">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("grades") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="selectedGrade">
                <el-select v-model="formData.gradeId" clearable filterable>
                  <el-option v-for="country in gradesStore.grades" :key="country.id" :value="country.id"
                             :label="country.name">
                  </el-option>
                </el-select>


              </el-form-item>
              <!--end::Input-->
            </div>
          </div>

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


              <div class="col-10 mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("uploadLogo") }}</label
                >
                <!--end::Label-->


                <!--begin::Input-->

                <el-form-item prop="englishName">
                  <button class="btn btn-sm btn-light-primary mx-1 p-3 w-100 "
                          type="button"
                          onclick="document.getElementById('fileElem').click()">
                    <input type="file" id="fileElem" hidden="hidden" @change="handleLogoUpload" accept="image/*">
                    <span class="bi bi-image">
                    </span>
                    <span class="mx-5"> {{ logoName }}</span>
                  </button>
                </el-form-item>
                <!--end::Input-->
              </div>

            </div>
            <div class="col-4">


              <div class="col-10 mb-7 offset-3">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2  ">
                  {{ $t("selectCourses") }}</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <!--                <el-form-item prop="selectCourses">-->
                <button class="btn btn-sm btn-light-primary mx-1 p-3 w-100 "
                        type="button"

                        data-bs-toggle="modal"
                        :data-bs-target="`#kt_modal_select_courses`"
                >

                  <span class="mx-5"> {{ t("selectCourses") }}</span>
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

        <SelectCoursesModal  ref="multipleTableRef"/>
      </div>
      <br/>
    </div>

  </div>
  <!--end:List Widget 3-->
</template>

<script lang="ts" setup>
import {ref, computed, reactive, onMounted, watch} from "vue";

import {useI18n} from "vue-i18n";
import {useGradesStore} from "@/store/pinia_store/modules/GradesModule";
import {PackageAddData, SelectCoursesDto} from "@/types/Packages/Packages";
import SelectCoursesModal from "@/views/Packages/SelectCoursesModal.vue";
import {ElTable} from "element-plus";
import {useCoursesStore} from "@/store/pinia_store/modules/CoursesModule";
import {watchThrottled} from "@vueuse/core";
const { t} = useI18n();

const gradesStore = useGradesStore();
const coursesStore = useCoursesStore();

const formRef = ref<null | HTMLFormElement>(null);

const multipleTableRef = ref(null);
// const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const modalRef = ref<null | HTMLElement>(null);

const formData = reactive<PackageAddData>({
  gradeId: "",
  courseIds: [],
  description: "",
  englishDescription: "",
  englishTitle: "",
  title: "",
  logo: null
});

let logoName = ref<string>(t('uploadLogo'))

const unSelectCourse = async (course: SelectCoursesDto) => {

  (multipleTableRef.value! as any).toggleSelection([course])
  coursesStore.unselectCourseForPackage(course.id)
}



const handleLogoUpload = async (event: Event) => {
  if ((event.target as HTMLInputElement).files) {
    const files = (event.target as HTMLInputElement).files as FileList;
    const file = files.length > 0 ? files[0] : null;

    if (!file) return;
    logoName.value = file.name.length > 15 ? file.name.substring(0, 15) + "..." : file.name;

     formData.logo = file;
  }
};

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

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid) => {
    if (valid) {
      formData.courseIds = coursesStore.selectedCoursesForPackage.map(c => c.id);
      console.log("in the validatieon ");
      await coursesStore.createPackage(formData)

    }
  });
};

onMounted(() => {

  gradesStore.loadGrades();
  modalRef.value?.addEventListener("hidden.bs.modal", (e) => {
    if (formRef.value)
      console.log('')
  });
});

///// watchers

watch(()=> gradesStore.grades, (val)=> {
  if (val.length > 0) formData.gradeId = val[0].id
})
watch(()=> formData.gradeId, (val)=> coursesStore.selectedGradeId  = val)


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