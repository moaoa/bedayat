<template>
  <div
    class="modal fade"
    id="kt_modal_attachments_item"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("attachments") }}</h2>
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
                <!-- begin: preview image -->
                <div
                  class="fv-row mb-7 col-md-4"
                  style="border-inline-end: 1px solid #ccc"
                >
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    {{ $t("previewImage") }}
                  </label>
                  <!--end::Label-->

                  <div
                    class="d-flex align-items-center justify-content-center gap-1"
                    style="border: 1px solid blue"
                    v-if="lessonsStore.getImageAttachmentForSelectedLesson"
                  >
                    <span
                      class="cursor-pointer"
                      @click="
                        lessonsStore.getAttachmentLinkById(
                          lessonsStore.getImageAttachmentForSelectedLesson.id!
                        )
                      "
                    >
                      {{
                        lessonsStore.getImageAttachmentForSelectedLesson.name
                      }}
                      <DownloadFileIcon />
                    </span>
                    <span
                      @click="
                        lessonsStore.removeAttachmentFromLesson(
                          lessonsStore.getImageAttachmentForSelectedLesson.id
                        )
                      "
                    >
                      <a class="btn btn-icon btn-light-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </a>
                    </span>
                  </div>
                  <p v-else>
                    {{ $t("noFileToShow") }}
                  </p>
                  <!-- end: preview image -->
                </div>
                <!-- end: preview image -->

                <!-- start: lesson content preview -->
                <div
                  class="fv-row mb-7 col-md-4"
                  style="border-inline-end: 1px solid #ccc"
                >
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    {{ $t("lessonContent") }}
                  </label>
                  <!--end::Label-->

                  <div
                    class="d-flex align-items-center justify-content-center gap-1"
                    v-if="lessonsStore.getLessonContentForSelectedLesson"
                  >
                    <span
                      class="cursor-pointer"
                      @click="
                        lessonsStore.getAttachmentLinkById(
                          lessonsStore.getLessonContentForSelectedLesson.id!
                        )
                      "
                    >
                      {{ lessonsStore.getLessonContentForSelectedLesson.name }}
                      <DownloadFileIcon />
                    </span>
                    <span
                      @click="
                        lessonsStore.removeAttachmentFromLesson(
                          lessonsStore.getLessonContentForSelectedLesson.id
                        )
                      "
                    >
                      <a class="btn btn-icon btn-light-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </a>
                    </span>
                  </div>
                  <p v-else>
                    {{ $t("noFileToShow") }}
                  </p>
                  <!-- end: preview image -->
                </div>
                <!-- end: lesson content preview -->

                <!-- start: additional content preview -->
                <div class="fv-row mb-7 col-md-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    {{ $t("additionalContent") }}
                  </label>
                  <!--end::Label-->

                  <div
                    v-if="
                      lessonsStore.getAdditionalContentAttachmentForSelectedLesson
                    "
                    class="d-flex align-items-center justify-content-center gap-1"
                  >
                    <span
                      @click="
                        lessonsStore.getAttachmentLinkById(
                          lessonsStore
                            .getAdditionalContentAttachmentForSelectedLesson.id!
                        )
                      "
                    >
                      {{
                        lessonsStore
                          .getAdditionalContentAttachmentForSelectedLesson.name
                      }}
                      <DownloadFileIcon />
                    </span>
                    <span
                      @click="
                        lessonsStore.removeAttachmentFromLesson(
                          lessonsStore
                            .getAdditionalContentAttachmentForSelectedLesson.id
                        )
                      "
                    >
                      <a class="btn btn-icon btn-light-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </a>
                    </span>
                  </div>
                  <p v-else>
                    {{ $t("noFileToShow") }}
                  </p>
                  <!-- end: preview image -->
                </div>
                <!-- end: additional content preview -->
              </div>
              <div class="row">
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("title") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-input-item prop="titleOfUploadedContent">
                    <input
                      v-model="formData.titleOfUploadedContent"
                      type="text"
                      class="form-control"
                      :placeholder="$t('title')"
                      style="width: 150px"
                    />
                  </el-input-item>
                  <!--end::Input-->
                </div>
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("description") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-input-item prop="description">
                    <input
                      v-model="formData.description"
                      type="text"
                      class="form-control"
                      :placeholder="$t('description')"
                      style="width: 150px"
                    />
                  </el-input-item>
                  <!--end::Input-->
                </div>
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("attachmentFor") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-input-item prop="selectedTypeOfAttachment">
                    <el-select
                      v-model="formData.selectedTypeOfAttachment"
                      type="text"
                      :placeholder="$t('previewImageTitle')"
                      style="width: 150px; display: block"
                    >
                      <el-option
                        :label="$t('previewImage')"
                        :value="AppConstants.ATTATCHMENT_TYPES.PreviewImage"
                      />
                      <el-option
                        :label="$t('lessonContent')"
                        :value="AppConstants.ATTATCHMENT_TYPES.LessonContent"
                      />
                      <el-option
                        :label="$t('additinoalContent')"
                        :value="
                          AppConstants.ATTATCHMENT_TYPES.AdditionalContent
                        "
                      />
                    </el-select>
                  </el-input-item>
                  <!--end::Input-->
                </div>
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("resolution") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-input-item prop="resolution">
                    <el-select
                      v-if="
                        formData.fileMimeType ===
                        AppConstants.FILE_MIME_TYPES.Video"
                      v-model="formData.resolution"
                      type="text"
                      :placeholder="$t('previewImageTitle')"
                      style="width: 150px; display: block"
                    >
                      <el-option :label="'480'" :value="'480'" />
                      <el-option :label="'720'" :value="'720'" />
                      <el-option :label="'1028'" :value="'1028'" />
                    </el-select>
                  </el-input-item>
                  <!--end::Input-->
                </div>
                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("fileType") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-input-item prop="fileMimeType">
                    <el-select
                      v-model="formData.fileMimeType"
                      type="text"
                      :placeholder="$t('fileType')"
                      style="width: 150px; display: block"
                    >
                      <el-option
                        :label="t('pdf')"
                        :value="AppConstants.FILE_MIME_TYPES.Pdf"
                      />
                      <el-option
                        :label="t('sound')"
                        :value="AppConstants.FILE_MIME_TYPES.Sound"
                      />
                      <el-option
                        :label="t('video')"
                        :value="AppConstants.FILE_MIME_TYPES.Video"
                      />
                      <el-option
                        :label="t('word')"
                        :value="AppConstants.FILE_MIME_TYPES.Word"
                      />
                      <el-option
                        :label="$t('other')"
                        :value="AppConstants.FILE_MIME_TYPES.Other"
                      />
                    </el-select>
                  </el-input-item>
                  <!--end::Input-->
                </div>

                <div class="fv-row mb-7 col-md-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("file") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-input-item prop="fileMimeType">
                    <FileInput
                      @change="handleImageChange"
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
                            style="width: 150px"
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
                  </el-input-item>

                  <!--end::Input-->
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
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
import { ref, onMounted, computed, reactive } from "vue";
import { useLessonsStore } from "@/store/pinia_store/modules/LessonsModule";
import { useI18n } from "vue-i18n";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";
import DownloadFileIcon from "@/components/icons/DownloadFileIcon.vue";
import { hideModal } from "@/core/helpers/dom";

const { t } = useI18n();

const lessonsStore = useLessonsStore();
const modalRef = ref<null | HTMLElement>(null);
const fileInput = ref<null | HTMLInputElement>(null);
const loading = computed(() => lessonsStore.isAddingAttachment);

interface AttachmentsForm {
  selectedTypeOfAttachment: number;
  fileMimeType: number;
  fileInput: File | null;
  titleOfUploadedContent: string;
  resolution: string;
  description: string;
}

const formData: AttachmentsForm = reactive<AttachmentsForm>({
  selectedTypeOfAttachment: AppConstants.ATTATCHMENT_TYPES.PreviewImage,
  fileMimeType: AppConstants.FILE_MIME_TYPES.Pdf,
  fileInput: null,
  titleOfUploadedContent: "",
  resolution: "480",
  description: "",
});

const handleImageChange = (file: File | null) => {
  formData.fileInput = file;
};

const handleUploadFile = async () => {
  if (formData.fileInput === null) {
    return;
  }
  await lessonsStore.addAttachmentToLesson({
    attachmentName: formData.fileInput.name,
    attachmentType: formData.selectedTypeOfAttachment,
    file: formData.fileInput,
    mimeType: formData.fileMimeType.toString(),
    resolution: formData.resolution,
    size: formData.fileInput.size,
    title: formData.titleOfUploadedContent,
    description: formData.description,
  });
};

const formRef = ref<null | HTMLFormElement>(null);

const rules = ref<Record<keyof AttachmentsForm, object[]>>({
  description: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  fileInput: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  fileMimeType: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  resolution: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  selectedTypeOfAttachment: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  titleOfUploadedContent: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    await handleUploadFile();
    hideModal(modalRef.value);
  });
};

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    if (
      fileInput.value &&
      "reset" in fileInput.value &&
      typeof fileInput.value.reset === "function"
    ) {
      fileInput.value?.reset();
    }
    formData.description = "";
    formData.titleOfUploadedContent = "";
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
