<template>
  <div
    class="modal fade"
    id="kt_modal_add_item"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("addNewGradeSubject") }}</h2>
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
                      <el-option v-for="grade in subjectStore.subjects" :key="grade.id" :value="grade.id"
                                 :label="grade.name">
                      </el-option>
                    </el-select>

                  </el-form-item>

                  <!--end::Input-->
                </div>





                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("book") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->

                    <el-form-item prop="book">
                      <div >

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
                                  :placeholder="$t('logo')"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  @click.stop="scope.open()"
                                  style="width: 150px"
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
                      class="col-2 mx-10 my-2  justify-content-center align-content-center"
                  >
                <a :href="bookPath" target="_blank"
                   class=" justify-content-center align-content-center">
                  <img style="width: 50px;" src="/public/media/icons/duotune/files/fil016.svg" >
                  <p class="">{{ bookPath.slice(-10) ?? '' }}</p>
                </a>
                  </span>
                          <span
                              class="btn btn-danger col-2 mx-10 my-2"
                              style="width: min-content; height: min-content"
                              @click="()=> {
                          bookPath = '';
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

                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2"

                  >
                    {{ $t("logo") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->

                  <el-form-item prop="logo">
                    <div >

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
                                style="width: 150px"
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
                      class="col-2 mx-10 my-2  justify-content-center align-content-center"
                  >
                <a :href="bookPath" target="_blank"
                   class=" justify-content-center align-content-center">
                  <img style="width: 50px;" src="/public/media/icons/duotune/files/fil016.svg" >
                  <p class="">{{ bookPath.slice(-10) ?? '' }}</p>
                </a>
                  </span>
                        <span
                            class="btn btn-danger col-2 mx-10 my-2"
                            style="width: min-content; height: min-content"
                            @click="()=> {
                          bookPath = '';
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
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, onMounted, computed, watch} from "vue";
import { hideModal } from "@/core/helpers/dom";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { useI18n } from "vue-i18n";
import {NewGradeSubjectData} from "@/types/GradeSubjects";
import {useSubjectsStore} from "@/store/pinia_store/modules/SubjectModule";
import {useGradeSubjectsStore} from "@/store/pinia_store/modules/GradeSubjectsModule";
import {SubjectType} from "@/types/Subjects";
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";

const { t } = useI18n();
const gradesStore = useGradesStore();
const subjectStore = useSubjectsStore();
const gradeSubjectStore = useGradeSubjectsStore();
const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => gradesStore.isCreatingNewItem);
const formData = reactive<NewGradeSubjectData>({
  subjectId: "",
  logo: null,
  book: null,
  gradeId: ""
});

const bookPath = ref<string>("")
const logoPath = ref<string>("")
const rules = ref({
  grade: [{ required: true, message: t("required"), trigger: "blur" }],
  subject: [{ required: true, message: t("required"), trigger: "blur" }],
  book: [{ required: false, message: t("required"), trigger: "blur" }],
  logo: [{ required: false, message: t("required"), trigger: "blur" }],
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

      await gradeSubjectStore.createNewItem(formData);

      hideModal(modalRef.value);

      await gradeSubjectStore.loadGradeSubjects(false);

    } catch (error) {
      console.log(error);
    }
  });
};
const handleUploadBook = async (file: File| null) => {
    if (!file) return;
    formData.book = file;
};


const handleUploadLogo = async (file: File| null) => {

    if (!file) return;
    formData.logo = file;
};


onMounted(() => {
  subjectStore.selectedSubjectType = SubjectType.None;
  subjectStore.loadSubjects(true);
  formData.gradeId = gradeSubjectStore.selectedGradeId;
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    formRef.value?.resetFields();
  });
});
watch(()=>gradeSubjectStore.selectedGradeId,
    (value)=> formData.gradeId = value );
</script>

<style lang="scss">
.el-select {
  width: 100%;
}
.custom-file-input input[type="file"] {
  border: none; /* Remove the default border */
   /* Add any other styling you want here */
}
.custom-file-input .el-input__inner {
  padding: 8px 12px; /* Adjust the padding to make the button smaller */

}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.hidden {
  display: none;
}

.image-button {
  background-color: azure;
  padding: 12px 24px;
  text-align: center;
  color: cadetblue;
  font-weight: bold;
  font-size: 24px;
  border-radius: 8px;
}


</style>



