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
            <div class="">
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("previewImage") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <FileInput
                  v-if="!lessonsStore.getImageAttachmentForSelectedLesson"
                  @change="handleImageChange"
                  :accept="'all'"
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
                        :placeholder="$t('previewImage')"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
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
                        <button
                          v-if="!loading"
                          class="btn btn-success"
                          @click="handleUploadImage"
                        >
                          {{ $t("save") }}
                          <span class="indicator-label">
                            <span class="svg-icon svg-icon-3 ms-2 me-0">
                              <inline-svg
                                src="icons/duotune/arrows/arr064.svg"
                              />
                            </span>
                          </span>
                        </button>

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
                <div v-else>
                  <span
                    @click="
                      lessonsStore.getAttachmentLinkById(
                        lessonsStore.getImageAttachmentForSelectedLesson.id
                      )
                    "
                  >
                    {{ lessonsStore.getImageAttachmentForSelectedLesson?.name }}
                  </span>
                  <span
                    class="btn btn-danger"
                    @click="
                      lessonsStore.removeAttachmentFromLesson(
                        lessonsStore.getImageAttachmentForSelectedLesson.id
                      )
                    "
                  >
                    {{ $t("delete") }}
                  </span>
                </div>

                <!--end::Input-->
              </div>
              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("lessonVideo") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <FileInput
                  v-if="!lessonsStore.getVideoAttachmentForSelectedLesson"
                  @change="handleCotentFileChange"
                  :accept="'video'"
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
                        :placeholder="$t('lessonVideo')"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
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
                        <button
                          v-if="!loading"
                          class="btn btn-success"
                          @click="handleUploadContent"
                        >
                          {{ $t("save") }}
                          <span class="indicator-label">
                            <span class="svg-icon svg-icon-3 ms-2 me-0">
                              <inline-svg
                                src="icons/duotune/arrows/arr064.svg"
                              />
                            </span>
                          </span>
                        </button>

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
                <div v-else>
                  <span
                    class="mr-2"
                    @click="
                      lessonsStore.getAttachmentLinkById(
                        lessonsStore.getVideoAttachmentForSelectedLesson!.id
                      )
                    "
                  >
                    {{ lessonsStore.getVideoAttachmentForSelectedLesson?.name }}
                  </span>
                  <span
                    class="btn btn-danger"
                    @click="
                      lessonsStore.removeAttachmentFromLesson(
                        lessonsStore.getVideoAttachmentForSelectedLesson.id
                      )
                    "
                  >
                    {{ $t("delete") }}
                  </span>
                </div>

                <!--end::Input-->
              </div>

              <div class="fv-row mb-7 col-md-6">
                <!--begin::Label-->
                <label class="fs-6 fw-bold mb-2">
                  {{ $t("additionalContent") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <FileInput
                  @change="handleAdditionalContentChange"
                  :accept="'pdf'"
                  v-if="!lessonsStore.getFileAttachmentForSelectedLesson"
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
                        :placeholder="$t('additionalContent')"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style="width: 150px"
                      />

                      <a
                        v-if="scope.fileName"
                        class="btn btn-icon btn-light-danger btn-sm"
                        @click="scope.reset"
                      >
                        <i class="bi bi-trash"></i>
                      </a>
                      <button
                        v-if="scope.fileName"
                        class="btn btn-success"
                        @click="handleUploadAdditionalContent"
                      >
                        Save
                      </button>
                    </div>
                  </template>
                </FileInput>
                <div v-else>
                  <span
                    @click="
                      lessonsStore.getAttachmentLinkById(
                        lessonsStore.getFileAttachmentForSelectedLesson!.id
                      )
                    "
                  >
                    {{ lessonsStore.getFileAttachmentForSelectedLesson!.name }}
                  </span>
                  <span
                    class="btn btn-danger"
                    @click="
                      lessonsStore.removeAttachmentFromLesson(
                        lessonsStore.getFileAttachmentForSelectedLesson.id
                      )
                    "
                  >
                    {{ $t("delete") }}
                  </span>
                </div>

                <!--end::Input-->
              </div>
            </div>
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer flex-center">
          <!--end::Button-->
        </div>
        <!--end::Modal footer-->
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useLessonsStore } from "@/store/pinia_store/modules/LessonsModule";
import { useI18n } from "vue-i18n";
import { AttachmentForm } from "@/types/Lessons";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";

const { t } = useI18n();

const lessonsStore = useLessonsStore();
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => lessonsStore.isAddingAttachment);
const formData = reactive<AttachmentForm>({
  additionalContent: null,
  content: null,
  image: null,
});

const handleImageChange = (file: File | null) => {
  formData.image = file;
};

const handleCotentFileChange = (file: File | null) => {
  formData.content = file;
};

const handleAdditionalContentChange = (file: File | null) => {
  formData.additionalContent = file;
};

const handleUploadContent = async () => {
  if (formData.content === null) {
    return;
  }
  lessonsStore.addAttachmentToLesson(
    formData.content,
    AppConstants.ATTATCHMENT_TYPES.VideoLesson,
    formData.content.name,
    formData.content.size
  );
};

const handleUploadImage = () => {
  if (formData.image === null) {
    return;
  }
  lessonsStore.addAttachmentToLesson(
    formData.image,
    AppConstants.ATTATCHMENT_TYPES.PreviewImage,
    formData.image.name,
    formData.image.size
  );
};

const handleUploadAdditionalContent = () => {
  if (formData.additionalContent === null) {
    return;
  }
  lessonsStore.addAttachmentToLesson(
    formData.additionalContent,
    AppConstants.ATTATCHMENT_TYPES.File,
    formData.additionalContent.name,
    formData.additionalContent.size
  );
};

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    formData.image = null;
    formData.content = null;
    formData.additionalContent = null;
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
