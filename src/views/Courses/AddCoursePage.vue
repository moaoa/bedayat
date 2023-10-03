<template>
  <div class="card">
    <h5 class="card-title">asdf</h5>
    <div class="card-body">
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
                  {{ $t("gradeSubjectId") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="gradeSubjectId">
                  <el-input
                    v-model="formData.gradeSubjectId"
                    type="text"
                    :placeholder="$t('gradeSubjectId')"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
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
import { reactive, ref, onMounted, computed } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { useI18n } from "vue-i18n";
import { NewGradeData } from "@/types/Grades";
import Toaster from "@/core/services/Toaster";

const { t } = useI18n();

const gradesStore = useGradesStore();
const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => gradesStore.isCreatingNewItem);
const formData = reactive<NewGradeData>({
  englishName: "",
  gradeType: 1,
  name: "",
  note: "",
  priority: 1,
});

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

  formRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    try {
      await gradesStore.createNewItem(formData);
      hideModal(modalRef.value);
      Toaster.Success(t("success"), t("createdNewItem"));
    } catch (error) {
      console.log(error);
    }
  });
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
