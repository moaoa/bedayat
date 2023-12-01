<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("addPackage") }}</h3>
      <div class="card-toolbar d-flex flex-row"></div>
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
            <div class="col-6">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("grades") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="selectedGrade">
                <el-select v-model="formData.gradeId" clearable filterable>
                  <el-option
                    v-for="country in gradesStore.grades"
                    :key="country.id"
                    :value="country.id"
                    :label="country.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!--end::Input-->
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("title") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="title">
                <el-input v-model="formData.title" type="text" placeholder="" />
              </el-form-item>
              <!--end::Input-->
            </div>

            <div class="col-6">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("englishTitle") }}</label
              >
              <!--end::Label-->

              <!--begin::Input-->
              <el-form-item prop="englishTitle">
                <el-input
                  v-model="formData.englishTitle"
                  type="text"
                  placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>
          </div>

          <div class="row">
            <div class="col-6 mb-7">
              <!--begin::Label-->
              <label class="required fs-6 fw-bold mb-2">
                {{ $t("description") }}</label
              >
              <!--end::Label-->
              <!--begin::Input-->
              <el-form-item prop="description">
                <el-input
                  v-model="formData.description"
                  type="textarea"
                  placeholder=""
                />
              </el-form-item>
              <!--end::Input-->
            </div>
            <div class="col-6 mb-7">
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
            <!--           start  -->
            <div class="col-6">
              <div class="col-8 mb-7 offset-3">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("uploadLogo") }}</label
                >
                <!--end::Label-->

                <!--begin::Input-->

                <el-form-item prop="logo">
                  <div>
                    <FileInput
                      v-if="!logoPath"
                      @change="handleLogoUpload"
                      :accept="'image'"
                    >
                      <template #default="scope">
                        <div class="d-flex align-items-center gap-4">
                          <AttachmentIcon
                            class="cursor-pointer"
                            @click.stop="scope.open()"
                          />
                          <input
                            :value="scope.fileName"
                            readonly
                            type="text"
                            class="form-control"
                            :placeholder="$t('logo')"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            @click.stop="scope.open()"
                            style="width: 200px"
                          />
                          <div
                            v-if="scope.fileName"
                            class="d-flex align-items-center gap-2"
                          >
                            <a
                              class="btn btn-icon btn-light-danger btn-sm"
                              @click="scope.reset"
                            >
                              <i class="bi bi-trash"></i>
                            </a>
                          </div>
                        </div>
                      </template>
                    </FileInput>
                    <div v-else class="row">
                      <span
                        :href="logoPath"
                        class="col-2 mx-10 my-2 justify-content-center align-content-center"
                      >
                        <a
                          :href="logoPath"
                          target="_blank"
                          class="justify-content-center align-content-center"
                        >
                          <img
                            style="width: 50px"
                            src="/public/media/icons/duotune/files/fil016.svg"
                          />
                          <p class="">{{ logoPath.slice(-10) ?? "" }}</p>
                        </a>
                      </span>
                      <span
                        class="btn btn-danger col-2 mx-10 my-2"
                        style="width: min-content; height: min-content"
                        @click="
                          () => {
                            logoPath = null;
                            formData.logo = null;
                          }
                        "
                      >
                        {{ $t("delete") }}
                      </span>
                    </div>
                  </div>
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>

            <!--           end  -->

            <div class="col-6">
              <div class="col-8 mb-7 offset-2">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("selectCourses") }}</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <!--                <el-form-item prop="selectCourses">-->
                <button
                  class="btn btn-sm btn-light-primary mx-1 p-3 w-100"
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
            <div class="">
              <el-table
                :data="coursesStore.selectedCoursesForPackage"
                class="my-4 mx-4"
                max-width
              >
                <el-table-column
                  index="scope.$index"
                  :label="t('noNumber')"
                  width="55"
                  align="center"
                  header-align="center"
                >
                  <template
                    #default="scope: { row: SelectCoursesDto, $index: number }"
                  >
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>

                <el-table-column :label="t('logo')" width="100" align="center">
                  <template #default="scope">
                    <img
                      style="width: 50px; height: 50px"
                      :src="
                        scope.row.logoPath != null
                          ? scope.row.logoPath
                          : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1697042627~exp=1697043227~hmac=28c67bb898b511e9cc46c0a306217868065d8b33c354c0dfdeb945ee64e62e1d'
                      "
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  property="name"
                  :label="t('name')"
                  header-align="center"
                  align="center"
                />
                <el-table-column
                  property="englishName"
                  :label="t('englishName')"
                  align="center"
                />

                <el-table-column
                  :label="t('remove')"
                  width="100"
                  align="center"
                >
                  <template #default="scope">
                    <a
                      class="btn btn-icon btn-light-success btn-sm"
                      @click="unSelectCourse(scope.row)"
                    >
                      <i class="bi bi-trash"></i>
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
                  <inline-svg src="icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span
                v-if="coursesStore.dataIsLoading"
                class="indicator-progress"
              >
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

        <SelectCoursesModal ref="multipleTableRef" />
      </div>
      <br />
    </div>
  </div>
  <!--end:List Widget 3-->
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { useI18n } from "vue-i18n";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { PackageAddData, SelectCoursesDto } from "@/types/Packages/Packages";
import SelectCoursesModal from "@/views/Packages/SelectCoursesModal.vue";
import { ElTable } from "element-plus";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";
const { t } = useI18n();

const gradesStore = useGradesStore();
const coursesStore = useCoursesStore();
const formRef = ref<null | HTMLFormElement>(null);
const multipleTableRef = ref(null);
const modalRef = ref<null | HTMLElement>(null);
const formData = reactive<PackageAddData>({
  gradeId: "",
  courseIds: [],
  description: "",
  englishDescription: "",
  englishTitle: "",
  title: "",
  logo: null,
});

let logoName = ref<string>(t("uploadLogo"));

const logoPath = ref<string>("");
const unSelectCourse = async (course: SelectCoursesDto) => {
  (multipleTableRef.value! as any).toggleSelection([course]);
  coursesStore.unselectCourseForPackage(course.id);
};

const handleLogoUpload = async (file: File | null) => {
  if (!file) return;
  logoName.value =
    file.name.length > 15 ? file.name.substring(0, 15) + "..." : file.name;
  formData.logo = file;
};

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid) => {
    if (valid) {
      formData.courseIds = coursesStore.selectedCoursesForPackage.map(
        (c) => c.id
      );
      console.log("in the validatieon ");
      await coursesStore.createPackage(formData);
    }
  });
};

onMounted(() => {
  coursesStore.selectedPackage = {};
  coursesStore.selectedCoursesForPackage = [];
  gradesStore.loadGrades();
  modalRef.value?.addEventListener("hidden.bs.modal", (e) => {
    if (formRef.value) console.log("");
  });
});

///// watchers

watch(
  () => gradesStore.grades,
  (val) => {
    if (val.length > 0) formData.gradeId = val[0].id;
  }
);
watch(
  () => formData.gradeId,
  (val) => (coursesStore.selectedGradeId = val)
);
watch(
  () => coursesStore.selectedGradeId,
  (val) => coursesStore.loadCoursesToAddToPackage("")
);
////////////////////validators

const rules = ref({
  gradeId: [{ required: true, message: t("required"), trigger: "blur" }],
  title: [
    { required: true, message: t("required"), trigger: "blur" },
    {
      required: true,
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  englishTitle: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    },
  ],

  description: [
    {
      required: true,
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  englishDescription: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    },
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
