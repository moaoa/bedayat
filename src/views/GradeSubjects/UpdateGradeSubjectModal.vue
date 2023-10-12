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
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg"/>
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
                    <el-select v-model="formData.gradeId" filterable>
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
                    <el-select v-model="formData.subjectId" filterable>
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

                  <!--begin::Input-->
                  <!--                    <input-->
                  <!--                        id=""-->
                  <!--                        accept="application/pdf"-->
                  <!--                        type="file"-->
                  <!--                        :placeholder="t('book')"-->
                  <!--                        class="custom-file-input"-->
                  <!--                        @change="handleUploadBook"-->
                  <!--                    />-->


                  <el-form-item prop="book">
                    <div>

                      <FileInput
                          v-if="!bookPath"
                          @change="handleUploadBook"
                          :accept="'pdf'"
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
                                :placeholder="$t('book')"
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
                      :href="bookPath"
                      class="col-4 mx-2 my-2  justify-content-center align-content-center"
                  >
                        <a :href="bookPath" target="_blank"
                           class=" justify-content-center align-content-center">
                          <img style="width: 50px;" src="/public/media/icons/duotune/files/fil016.svg">
                          <p class="">{{ bookPath.slice(-10) ?? '' }}</p>
                        </a>
                  </span>
                        <span
                            class="btn btn-danger col-2 mx-3 my-2"
                            style="width: min-content; height: min-content"
                            @click="()=> {
                          bookPath = '';
                          formData.book = null;
                        }"
                        >
                    {{ $t("delete") }}
                  </span>
                      </div>
                    </div>
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
                    <div>

                      <FileInput
                          v-if="!logoPath"
                          @change="handleUploadLogo"
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
                      class="col-4 mx-2 my-2  justify-content-center align-content-center"
                  >
                <a :href="logoPath" target="_blank"
                   class=" justify-content-center align-content-center">
                  <img style="width: 50px;" src="/public/media/icons/duotune/files/fil016.svg">
                  <p class="">{{ logoPath.slice(-10) ?? '' }}</p>
                </a>
                  </span>
                        <span
                            class="btn btn-danger col-2 mx-3 my-2"
                            style="width: min-content; height: min-content"
                            @click="()=> {
                          logoPath = '';
                          formData.logo = null;
                        }"
                        >
                    {{ $t("delete") }}
                  </span>
                      </div>
                    </div>
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
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";

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

const logoPath = ref<string>(gradeSubjectStore?.selectedGradeSubject?.logo ?? t(''))
const bookPath = ref<string>(gradeSubjectStore?.selectedGradeSubject?.bookLink ?? t(''))
const emit = defineEmits(["close"]);


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
    } catch (error) {
      console.log(error);
    }
  });
};

const handleUploadBook = async (file: File | null) => {
  if (!file) return;
  formData.book = file;
};
const handleUploadLogo = async (file: File | null) => {
  if (!file) return;
  formData.logo = file;
};
watch(
    () => gradeSubjectStore.selectedGradeSubject,
    (value) => {
      // how to pass in the old file value ?
      console.log(value)
      formData.subjectId = value?.subjectId ?? "";
      formData.gradeId = value?.gradeId ?? "";

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

const rules = ref({
  grade: [{required: true, message: t("required"), trigger: "blur"}],
  subject: [{required: true, message: t("required"), trigger: "blur"}],
  book: [{required: false, message: t("required"), trigger: "blur"}],
  logo: [{required: false, message: t("required"), trigger: "blur"}],
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
