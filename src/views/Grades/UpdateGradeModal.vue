<!-- eslint-disable no-undef -->
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
          <h2 class="fw-bolder">{{ $t("updateGrade") }}</h2>
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
              <div class="row">
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("arabicName") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.name"
                      type="text"
                      :placeholder="$t('arabicName')"
                      clearable
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
                      clearable
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>

                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("priority") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="priority">
                    <el-input
                      v-model="formData.priority"
                      type="text"
                      :placeholder="$t('priority')"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("gradeType") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="gradeType">
                    <el-input
                      v-model="formData.gradeType"
                      type="text"
                      :placeholder="$t('gradeType')"
                    />
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

import { useI18n } from "vue-i18n";
import { Grade, NewGradeData } from "@/types/Grades";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import Toaster from "@/core/services/Toaster";

const { t } = useI18n();

const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => gradesStore.isUpdatingItem);

// eslint-disable-next-line no-undef
defineExpose({ modalRef });

const gradesStore = useGradesStore();

const formData = reactive<NewGradeData>({
  name: "",
  englishName: "",
  gradeType: 1,
  note: "",
  priority: 1,
});
// eslint-disable-next-line no-undef
const emit = defineEmits(["close", "submit"]);

const rules = ref({
  name: [{ required: true, message: t("required"), trigger: "blur" }],
  englishName: [
    {
      required: true,
      message: t("englishName"),
      trigger: "blur",
    },
  ],
  note: [{ required: true, message: t("required"), trigger: "blur" }],
  gradeType: [{ required: true, message: t("required"), trigger: "blur" }],
  priority: [{ required: true, message: t("required"), trigger: "blur" }],
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
      await gradesStore.updateItem(formData);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Toaster.error(t("error"), error.message);
      }
    }

    //TODO:
    // hideModal();
    // emit("submit", formData);
  });
};

watch(
  () => gradesStore.selectedGrade,
  (value) => {
    formData.englishName = value?.englishName ?? "";
    formData.name = value?.name ?? "";
    formData.gradeType = value?.gradeType ?? 1;
    formData.priority = value?.priority ?? 1;
    formData.note = value?.note ?? "";
  }
);

onMounted(() => {
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
