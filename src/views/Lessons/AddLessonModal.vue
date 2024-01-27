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
          <h2 class="fw-bolder">{{ $t("addNewLesson") }}</h2>
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
              <div class="fv-row mb-7">
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
              <div class="fv-row mb-7">
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
                    clearable
                  />
                </el-form-item>

                <!--end::Input-->
              </div>

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("thumbnail") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="thumbnail">
                  <FileInput
                    @change="handleFileChange"
                    :accept="'all'"
                    ref="fileInput"
                  >
                    <template #default="scope">
                      <div class="d-flex align-items-center gap-4">
                        <el-input
                          @click.stop="scope.open()"
                          :value="scope.fileName"
                          readonly
                          type="text"
                          :placeholder="$t('file')"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          style="width: 100%"
                        >
                          <template #suffix>
                            <AttachmentIcon class="cursor-pointer" />
                          </template>
                        </el-input>
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

                          <span v-if="loading" class="indicator-progress">
                            {{ $t("pleaseWait") }}...

                            <span
                              class="spinner-border spinner-border-sm align-middle ms-2"
                            ></span>
                          </span>
                        </div>
                      </div>
                    </template>
                  </FileInput>
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("forPreview") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="lessonType">
                  <el-switch
                    v-model="formData.lessonType"
                    :active-value="AppConstants.LESSON_TYPES.Preview"
                    :inactive-value="AppConstants.LESSON_TYPES.Lesson"
                    :placeholder="$t('lessonType')"
                  />
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
import { reactive, ref, onMounted, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { useLessonsStore } from "@/store/pinia_store/modules/LessonsModule";
import { useI18n } from "vue-i18n";
import { NewLessonData } from "@/types/Lessons";
import Toaster from "@/core/services/Toaster";
import router from "@/router";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";

const { t } = useI18n();

const lessonsStore = useLessonsStore();
const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => lessonsStore.isCreatingNewItem);
const formData = reactive<NewLessonData>({
  description: "",
  lessonType: AppConstants.LESSON_TYPES.Lesson,
  title: "",
  thumbnail: null,
});

const rules = ref<Record<keyof NewLessonData, object[]>>({
  description: [{ required: true, message: t("required"), trigger: "blur" }],
  title: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  lessonType: [{ required: true, message: t("required"), trigger: "blur" }],
  thumbnail: [{ required: true, message: t("required"), trigger: "blur" }],
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
      const courseId = router.currentRoute.value.params.id as string;
      await lessonsStore.createNewItem(courseId, formData);
      hideModal(modalRef.value);
      Toaster.Success(t("success"), t("createdNewItem"));
    } catch (error) {
      console.log(error);
    }
  });
};

const handleFileChange = (file: File | null) => {
  formData.thumbnail = file;
};

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    formRef.value?.resetFields();
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
