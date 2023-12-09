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
          <h2 class="fw-bolder">{{ $t("updateLesson") }}</h2>
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
            @click="$emit('close')"
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
                  {{ $t("englishTitle") }}
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
                  {{ $t("forPreview") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="gradeTypeIndex">
                  <el-switch
                    v-model="formData.lessonType"
                    :active-value="AppConstants.LESSON_TYPES_AS_STRING.Preview"
                    :inactive-value="AppConstants.LESSON_TYPES_AS_STRING.Lesson"
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
import { reactive, ref, watch, computed, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { useI18n } from "vue-i18n";
import { NewLessonData } from "@/types/Lessons";
import { useLessonsStore } from "@/store/pinia_store/modules/LessonsModule";
import Toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

const { t } = useI18n();

const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => lessonsStore.isUpdatingItem);

const lessonsStore = useLessonsStore();

const formData = reactive<NewLessonData>({
  lessonType: AppConstants.LESSON_TYPES_AS_STRING.Lesson,
  description: "",
  title: "",
});

const emit = defineEmits(["close"]);

const rules = ref<Record<keyof NewLessonData, object[]>>({
  description: [{ required: true, message: t("required"), trigger: "blur" }],
  lessonType: [
    {
      required: true,
      message: t("englishName"),
      trigger: "blur",
    },
  ],
  title: [{ required: true, message: t("required"), trigger: "blur" }],
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
      await lessonsStore.updateItem(formData);
      hideModal(modalRef.value);
      Toaster.Success(t("success"), t("createdNewItem"));
    } catch (error) {
      console.log(error);
    }
  });
};

watch(
  () => lessonsStore.selectedLesson,
  (value) => {
    formData.description = value?.description ?? "";
    formData.title = value?.title ?? "";
    formData.lessonType =
      value?.lessonType ?? AppConstants.LESSON_TYPES_AS_STRING.Lesson;
  }
);

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    lessonsStore.unselectLesson();
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
