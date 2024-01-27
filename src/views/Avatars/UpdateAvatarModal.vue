<template>
  <div
    class="modal fade"
    id="update_user_modal"
    tabindex="-1"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("updateAvatarData") }}</h2>
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
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required"> {{ $t("userRole") }}</span>
                  </label>
                  <el-form-item prop="roleType">
                    <el-select v-model="formData.roleType">
                      <el-option
                        :value="AppConstants.USER_ROLES.Admin"
                        :label="$t('admin')"
                      />
                      <el-option
                        :value="AppConstants.USER_ROLES.Child"
                        :label="$t('child')"
                      />
                      <el-option
                        :value="AppConstants.USER_ROLES.Parent"
                        :label="$t('parent')"
                      />
                      <el-option
                        :value="AppConstants.USER_ROLES.SchoolManager"
                        :label="$t('schoolManager')"
                      />
                      <el-option
                        :value="AppConstants.USER_ROLES.Teacher"
                        :label="$t('teacher')"
                      />
                      <!-- <el-option
                      :value="AppConstants.USER_GENDER.Female"
                      :label="$t('female')"
                    >
                    </el-option> -->
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("avatar") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="avatarPath">
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
import { ref, computed, reactive, watch, onMounted } from "vue";

import { useI18n } from "vue-i18n";
import { NewAvatarData } from "@/types/Avatar";
import { useAvatarsStore } from "@/store/pinia_store/modules/AvatarsManagementModule";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import FileInput from "@/components/FileInput.vue";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";
// import { formatDate } from "@vueuse/core";

const { t } = useI18n();

const avatarsStore = useAvatarsStore();

const permissions = AppConstants.PERMISSIONS;

const loading = computed(() => avatarsStore.isCreatingNewItem);

const formRef = ref<null | HTMLFormElement>(null);

const modalRef = ref<null | HTMLElement>(null);

type FormData = { roleType: number; avatarPath: Blob | null };

const formData = reactive<FormData>({
  avatarPath: null,
  roleType: AppConstants.USER_ROLES.None,
});

const emit = defineEmits<{
  (event: "submit", data: NewAvatarData);
}>();

defineExpose({
  modalRef,
});

const rules = ref<Record<keyof typeof formData, object[]>>({
  avatarPath: [{ required: true, message: t("required"), trigger: "blur" }],
  roleType: [{ required: true, message: t("required"), trigger: "blur" }],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate((valid) => {
    if (valid) {
      emit("submit", {
        avatarPath: formData.avatarPath!,
        roleType: formData.roleType,
      });
    }
  });
};

const handleFileChange = (file: File | null) => {
  formData.avatarPath = file;
};

watch(
  () => avatarsStore.selectedAvatar,
  (selectedAvatar) => {
    if (!selectedAvatar) {
      return;
    }

    formData.roleType = selectedAvatar.roleType;
    formData.avatarPath = null;
  }
);

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    avatarsStore.unselectItem();
  });
});
</script>
