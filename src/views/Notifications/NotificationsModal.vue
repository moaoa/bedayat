<template>
  <div
    class="modal fade"
    id="kt_modal_notifications"
    tabindex="-1"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("notifyUser") }}</h2>
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
                <div class="col-md-6 fv-row mb-7">
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
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
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
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
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
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
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
                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("notificationFor") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="notificationFor">
                    <el-select
                      v-model="formData.notificationFor"
                      :placeholder="$t('notificationFor')"
                    >
                      <el-option
                        :label="$t('none')"
                        :value="AppConstants.NotificationFor.None"
                      />
                      <el-option
                        :label="$t('courses')"
                        :value="AppConstants.NotificationFor.Courses"
                      />
                      <el-option
                        :label="$t('account')"
                        :value="AppConstants.NotificationFor.Account"
                      />
                      <el-option
                        :label="$t('wallet')"
                        :value="AppConstants.NotificationFor.Wallet"
                      />
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("notificationType") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="notificationType">
                    <el-select
                      v-model="formData.notificationType"
                      :placeholder="$t('notificationType')"
                    >
                      <el-option
                        :label="$t('critical')"
                        :value="AppConstants.NOTIFICATION_TYPES.Critical"
                      />
                      <el-option
                        :label="$t('default')"
                        :value="AppConstants.NOTIFICATION_TYPES.Default"
                      />
                      <el-option
                        :label="$t('error')"
                        :value="AppConstants.NOTIFICATION_TYPES.Error"
                      />
                      <el-option
                        :label="$t('none')"
                        :value="AppConstants.NOTIFICATION_TYPES.None"
                      />
                      <el-option
                        :label="$t('promotional')"
                        :value="AppConstants.NOTIFICATION_TYPES.Promotional"
                      />
                      <el-option
                        :label="$t('userGuide')"
                        :value="AppConstants.NOTIFICATION_TYPES.UserGuide"
                      />
                      <el-option
                        :label="$t('warning')"
                        :value="AppConstants.NOTIFICATION_TYPES.Warning"
                      />
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("level") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="level">
                    <el-select
                      v-model="formData.level"
                      type="text"
                      :placeholder="$t('level')"
                    >
                      <el-option
                        :label="$t('all')"
                        :value="AppConstants.NotificationMulticastLevel.All"
                      />
                      <el-option
                        :label="$t('allParents')"
                        :value="
                          AppConstants.NotificationMulticastLevel.AllParents
                        "
                      />
                      <el-option
                        :label="$t('allChildren')"
                        :value="
                          AppConstants.NotificationMulticastLevel.AllChildren
                        "
                      />
                      <el-option
                        :label="$t('parents')"
                        :value="AppConstants.NotificationMulticastLevel.Parents"
                      />
                      <el-option
                        :label="$t('children')"
                        :value="
                          AppConstants.NotificationMulticastLevel.Children
                        "
                      />
                      <el-option
                        :label="$t('teachers')"
                        :value="
                          AppConstants.NotificationMulticastLevel.Teachers
                        "
                      />
                      <el-option
                        :label="$t('countries')"
                        :value="
                          AppConstants.NotificationMulticastLevel.Countries
                        "
                      />
                      <el-option
                        :label="$t('cities')"
                        :value="AppConstants.NotificationMulticastLevel.Cities"
                      />
                      <el-option
                        :label="$t('localities')"
                        :value="
                          AppConstants.NotificationMulticastLevel.Localities
                        "
                      />
                      <el-option
                        :label="$t('courses')"
                        :value="AppConstants.NotificationMulticastLevel.Courses"
                      />
                      <el-option
                        :label="$t('family')"
                        :value="AppConstants.NotificationMulticastLevel.Family"
                      />
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("image") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="image">
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

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { NotificationForm } from "@/types/Notifications";
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";
import { useNotificationsStore } from "@/store/pinia_store/modules/NotificationsModule";

const { t } = useI18n();

const notificationStore = useNotificationsStore();

const loading = computed(() => notificationStore.isCreatingNewItem);

const formRef = ref<null | HTMLFormElement>(null);

const modalRef = ref<null | HTMLElement>(null);

const fileInput = ref<null | HTMLFormElement>(null);

const formData = reactive<NotificationForm>({
  description: "",
  englishDescription: "",
  englishTitle: "",
  image: null,
  level: AppConstants.NotificationMulticastLevel.All,
  notificationFor: AppConstants.NotificationFor.None,
  notificationType: AppConstants.NOTIFICATION_TYPES.None,
  title: "",
});

const emit = defineEmits<{
  (event: "submit", data: NotificationForm);
}>();

defineExpose({
  modalRef,
});

const rules = ref<Record<keyof NotificationForm, object[]>>({
  title: [
    {
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      required: true,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  description: [
    {
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      required: true,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  englishDescription: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: "blur",
    },
  ],
  englishTitle: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: "blur",
    },
  ],
  image: [{ required: false, message: t("required"), trigger: "blur" }],
  level: [{ required: true, message: t("required"), trigger: "blur" }],
  notificationFor: [
    { required: true, message: t("required"), trigger: "blur" },
  ],
  notificationType: [
    { required: true, message: t("required"), trigger: "blur" },
  ],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate((valid) => {
    if (valid) {
      emit("submit", formData);
    }
  });
};

const handleImageChange = (file: File | null) => {
  formData.image = file;
};

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    formData.description = "";
    formData.englishDescription = "";
    formData.englishTitle = "";

    if (
      fileInput.value &&
      "reset" in fileInput.value &&
      typeof fileInput.value.reset === "function"
    ) {
      fileInput.value?.reset();
    }
    formData.level = AppConstants.NotificationMulticastLevel.All;
    formData.notificationFor = AppConstants.NotificationFor.None;
    formData.notificationType = AppConstants.NOTIFICATION_TYPES.None;
    formData.title = "";
  });
});
</script>
