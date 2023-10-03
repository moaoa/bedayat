<template>
  <div
      id="update_item_modal"
      ref="modalRef"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">


        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("updateGradeSubject") }}</h2>
          <div
              id="kt_modal_add_customer_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>




        <el-form
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
        >
          <div class="modal-body py-10 px-lg-17">
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
              <div class="row">
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("chooseGrade") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="name">
                    <el-select v-model="formData.gradeId" clearable filterable>
                      <el-option v-for="grade in gradesStore.grades" :key="grade.id" :value="grade.id"
                                 :label="grade.name">
                      </el-option>
                    </el-select>

                  </el-form-item>

                  <!--end::Input-->
                </div>

                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("chooseSubject") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="name">
                    <el-select v-model="formData.subjectId" clearable filterable>
                      <el-option v-for="subject in subjectStore.subjects" :key="subject.id" :value="subject.id"
                                 :label="subject.name">
                      </el-option>
                    </el-select>

                  </el-form-item>

                  <!--end::Input-->
                </div>
                <!--end::Input-->

                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("book") }}
                  </label>
                  <!--end::Label-->


                  <!--                    <div>-->
                  <!--                      <button>-->
                  <!--                      <label for="logo_file_upload" class="image-button">Upload Image</label>-->
                  <!--                      </button>-->
                  <!--                      <input-->

                  <!--                          id="logo_file_upload"-->
                  <!--                          name="file"-->
                  <!--                          type="file"-->
                  <!--                          accept="image/*"-->
                  <!--                          class="hidden"-->
                  <!--                          @change="handleUploadLogo"-->
                  <!--                      />-->
                  <!--                    </div>-->




                  <!--begin::Input-->
                  <el-form-item prop="book">
                    <input
                        id=""
                        accept="application/pdf"
                        type="file"
                        :placeholder="t('book')"
                        class="custom-file-input"
                        @change="handleUploadBook"
                    />

                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"

                  >
                    {{ $t("logo") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="logo">


                    <input
                        accept="image/*"
                        type="file"
                        :placeholder="t('logo')"
                        class="custom-file-input"
                        @change="handleUploadLogo"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>



              </div>



            </div>
          </div>
          <!--end::Scroll-->

          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
                type="reset"
                id="update_grade_modal_close"
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
                  <inline-svg src="icons/duotune/arrows/arr064.svg"/>
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
          <!--end::Modal footer-->\

        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, watch, computed, onMounted} from "vue";
import {hideModal} from "@/core/helpers/dom";
import {useI18n} from "vue-i18n";
import {NewGradeData} from "@/types/Grades";
import {useGradesStore} from "@/store/pinia_store/modules/GradesModule";
import Toaster from "@/core/services/Toaster";
import {NewGradeSubjectData} from "@/types/GradeSubjects";
import {useSubjectsStore} from "@/store/pinia_store/modules/SubjectModule";
import {useGradeSubjectsStore} from "@/store/pinia_store/modules/GradeSubjectsModule";
import gradeSubjectsService from "@/core/repositories/GradeSubjectsService";

const {t} = useI18n();

const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => gradesStore.isUpdatingItem);

const gradesStore = useGradesStore();
const subjectStore = useSubjectsStore();
const gradeSubjectStore = useGradeSubjectsStore();
const formData = reactive<NewGradeSubjectData>({
  subjectId: "",
  logo: null,
  book: null,
  gradeId: ""
});

const emit = defineEmits(["close"]);

const rules = ref({
  grade: [{required: true, message: t("required"), trigger: "blur"}],
  subject: [{required: true, message: t("required"), trigger: "blur"}],
  book: [{required: false, message: t("required"), trigger: "blur"}],
  logo: [{required: false, message: t("required"), trigger: "blur"}],
  chaptersCount: [{required: true, message: t("required"), trigger: "blur"}],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      return;
    }
    try {
      await gradeSubjectStore.updateItem(formData);
      hideModal(modalRef.value);
      Toaster.Success(t("success"), t("createdNewItem"));
    } catch (error) {
      console.log(error);
    }
  });
};

const handleUploadBook = async (event: Event) => {
  if ((event.target as HTMLInputElement).files) {
    const files = (event.target as HTMLInputElement).files as FileList;
    const file = files.length > 0 ? files[0] : null;


    // if (event.target.value) {
    //   event.target.setAttribute("data-title", this.value.replace(/^.*[\\\/]/, ''));
    // } else {
    //   this.setAttribute("data-title", "No file chosen");
    // }
    if (!file) return;

    console.log(file);
    formData.book = file;
  }
};


const handleUploadLogo = async (event: Event) => {

  if ((event.target as HTMLInputElement).files) {
    const files = (event.target as HTMLInputElement).files as FileList;
    const file = files.length > 0 ? files[0] : null;

    if (!file) return;

    console.log(file);
    formData.logo = file;
  }
};
watch(
    () => gradeSubjectStore.selectedGradeSubject,
    (value) => {
      // how to pass in the old file value ?

      formData.subjectId = value?.subjectId ?? "";
      formData.gradeId = value?.gradeId ?? "";

       // document.getElementById("input_upload_update_book")?.textContent = "lol"
       // document.getElementById("input_upload_update_logo")?.textContent = "lolsf"

      // book.textContent = "lol";
      // logo.textContent = "lol";


    }
);

onMounted(() => {
  formData.gradeId = gradeSubjectStore.selectedGradeId;
  // might cause a problem
  // formData.subjectId = gradeSubjectStore.selectedGradeSubject!.id;
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    gradesStore.unselectGrade();
  });
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
