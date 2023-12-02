<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("addCourse") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <div class="card-body">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <div class="modal-body py-10 px-lg-17">
          <div class="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll">
            <div class="row">
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("title") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="title">
                  <el-input
                    v-model="formData.title"
                    type="text"
                    :placeholder="$t('title')"
                    clearable
                  />
                </el-form-item>

                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishTitle") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishTitle">
                  <el-input
                    v-model="formData.englishTitle"
                    type="text"
                    :placeholder="$t('englishTitle')"
                    clearable
                  />
                </el-form-item>

                <!--end::Input-->
              </div>

              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("name") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.name"
                    type="text"
                    :placeholder="$t('name')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishName") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishName">
                  <el-input
                    v-model="formData.englishName"
                    type="text"
                    :placeholder="$t('englishName')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("description") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="description">
                  <el-input
                    v-model="formData.description"
                    type="text"
                    :placeholder="$t('description')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishDescription") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="englishDescription">
                  <el-input
                    v-model="formData.englishDescription"
                    type="text"
                    :placeholder="$t('englishDescription')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("grade") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="gradeId">
                  <el-select
                    v-model="gradesSubjectsStore.selectedGradeId"
                    v-loading="gradesSubjectsStore.dataIsLoading"
                    type="text"
                    :placeholder="$t('gradeId')"
                    filterable
                    clearable
                  >
                    <el-option
                      v-for="grade in gradesStore.grades"
                      :key="grade.id"
                      :value="grade.id"
                      :label="grade.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>

              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("gradeSubject") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="gradeSubjectId">
                  <el-select
                    v-model="formData.gradeSubjectId"
                    v-loading="gradesSubjectsStore.dataIsLoading"
                    type="text"
                    :placeholder="$t('gradeSubjectId')"
                  >
                    <el-option
                      v-for="gradeSubject in gradesSubjectsStore.gradeSubjects"
                      :key="gradeSubject.id"
                      :value="gradeSubject.id"
                      :label="gradeSubject.subject.name"
                    />
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  {{ $t("author") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="author">
                  <el-input
                    v-model="formData.author"
                    type="text"
                    :placeholder="$t('author')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("logo") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="logo">
                  <!-- <label for="formFile" class="form-label">
                    {{ $t("logo") }}
                  </label> -->
                  <div class="d-flex gap-4">
                    <button
                      class="btn btn-primary"
                      @click="() => open()"
                      type="button"
                    >
                      {{ $t("chooseFile") }}
                    </button>
                    <div v-if="files">{{ files[0]?.name }}</div>
                    <span v-else class="mr-2"> {{ $t("noFiles") }}</span>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import { useI18n } from "vue-i18n";
import { NewCourseData } from "@/types/Courses";
import Toaster from "@/core/services/Toaster";
import { useGradeSubjectsStore } from "@/store/pinia_store/modules/GradeSubjectsModule";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { useFileDialog } from "@vueuse/core";

const { t } = useI18n();

const { onChange, open, files } = useFileDialog();

onChange((files) => {
  if (files === null) {
    formData.logo = null;
    return;
  }
  formData.logo = files[0];
});

const gradesSubjectsStore = useGradeSubjectsStore();
const gradesStore = useGradesStore();

const coursesStore = useCoursesStore();
const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => coursesStore.isCreatingNewItem);

const formData = reactive<NewCourseData>({
  englishName: coursesStore.selectedCourse.englishName ?? "",
  name: coursesStore.selectedCourse.name ?? "",
  author: coursesStore.selectedCourse.author ?? "",
  description: coursesStore.selectedCourse.description ?? "",
  englishDescription: coursesStore.selectedCourse.englishDescription ?? "",
  englishTitle: coursesStore.selectedCourse.englishTitle ?? "",
  title: coursesStore.selectedCourse.title ?? "",
  gradeSubjectId: coursesStore.selectedCourse.gradeSubject?.id ?? "",
  logo: null,
});

const rules = ref<Record<keyof NewCourseData, object[]>>({
  name: [{ required: true, message: t("required"), trigger: "blur" }],
  englishName: [
    {
      required: true,
      message: t("englishName"),
      trigger: "blur",
    },
  ],
  description: [{ required: true, message: t("required"), trigger: "blur" }],
  author: [{ required: false, message: t("required"), trigger: "blur" }],
  englishDescription: [
    { required: true, message: t("required"), trigger: "blur" },
  ],
  englishTitle: [{ required: true, message: t("required"), trigger: "blur" }],
  gradeSubjectId: [{ required: true, message: t("required"), trigger: "blur" }],
  logo: [{ required: true, message: t("required"), trigger: "blur" }],
  title: [{ required: true, message: t("required"), trigger: "blur" }],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    try {
      await coursesStore.updateItem(formData);
      hideModal(modalRef.value);
      Toaster.Success(t("success"), t("createdNewItem"));
    } catch (error) {
      console.log(error);
    }
  });
};

gradesSubjectsStore.selectedGradeId =
  coursesStore.selectedCourse.gradeSubject!.gradeId;

gradesStore.loadGrades();

watch(
  () => gradesSubjectsStore.selectedGradeId,
  (gradeId) => {
    if (!gradeId) {
      gradesSubjectsStore.clearGradeSubjects();
      return;
    }
    gradesSubjectsStore.loadGradeSubjects();
  },
  {
    immediate: true,
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
