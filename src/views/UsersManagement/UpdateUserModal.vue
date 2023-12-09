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
          <h2 class="fw-bolder">{{ $t("updateUserData") }}</h2>
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
                    {{ $t("firstName") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="firstName">
                    <el-input
                      v-model="formData.firstName"
                      type="text"
                      :placeholder="$t('firstName')"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("fatherName") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="fatherName">
                    <el-input
                      v-model="formData.fatherName"
                      type="text"
                      :placeholder="$t('fatherName')"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("surName") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="surName">
                    <el-input
                      v-model="formData.surName"
                      type="text"
                      :placeholder="$t('surName')"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="fs-6 fw-bold mb-2">
                    <span class="required"> {{ $t("gender") }}</span>

                    <!--                  <i-->
                    <!--                    class="fas fa-exclamation-circle ms-1 fs-7"-->
                    <!--                    data-bs-toggle="tooltip"-->
                    <!--                    title="Country of origination"-->
                    <!--                  ></i>-->
                  </label>
                  <el-select v-model="formData.gender">
                    <el-option
                      :value="AppConstants.USER_GENDER.Male"
                      :label="$t('male')"
                    >
                    </el-option>
                    <el-option
                      :value="AppConstants.USER_GENDER.Female"
                      :label="$t('female')"
                    >
                    </el-option>
                  </el-select>
                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("phone") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="phoneNumber">
                    <el-input
                      v-model="formData.phone"
                      type="text"
                      :placeholder="$t('phone')"
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("otherPhone") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="otherPhone">
                    <el-input
                      v-model="formData.otherPhone"
                      type="text"
                      :placeholder="$t('otherPhone')"
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>

                <div class="col-md-6 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("permissions") }}
                  </label>
                  <el-select
                    v-model="formData.permissions"
                    filterable
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    :max-collapse-tags="3"
                    placeholder="Select"
                  >
                    <el-option
                      v-for="PermissionKey in Object.keys(permissions)"
                      :key="PermissionKey"
                      :label="PermissionKey"
                      :value="permissions[PermissionKey]"
                    />
                  </el-select>
                  <!--end::Label-->
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
import { NewUserData } from "@/types/User";
import { useUsersStore } from "@/store/pinia_store/modules/UsersManagementModule";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

const { t } = useI18n();

const usersStore = useUsersStore();

const permissions = AppConstants.PERMISSIONS;

const loading = computed(() => usersStore.isCreatingNewItem);

const formRef = ref<null | HTMLFormElement>(null);

const modalRef = ref<null | HTMLElement>(null);

const formData = reactive<Omit<NewUserData, "email" | "password">>({
  fatherName: "",
  surName: "",
  firstName: "",
  phone: "",
  otherPhone: "",
  gender: AppConstants.USER_GENDER.Male,
  permissions: [],
});

const emit = defineEmits<{
  (event: "submit", data: Omit<NewUserData, "email" | "password">);
}>();

defineExpose({
  modalRef,
});

const rules = ref({
  fatherName: [{ required: false, message: t("required"), trigger: "blur" }],
  firstName: [{ required: true, message: t("required"), trigger: "blur" }],
  surName: [{ required: true, message: t("required"), trigger: "blur" }],
  gender: [{ required: true, message: t("required"), trigger: "blur" }],
  phoneNumber: [
    { required: false, message: t("required"), trigger: "blur" },
    // {
    //   min: 10,
    //   max: 16,
    //   message: t("phoneMustBe10Digits"),
    //   trigger: ["blur", "change"],
    // },
  ],
  otherPhone: [{ required: false, message: t("required"), trigger: "blur" }],
  permissions: [{ required: false, message: t("required"), trigger: "blur" }],
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

watch(
  () => usersStore.selectedUser,
  (user) => {
    if (!user) {
      return;
    }

    formData.fatherName = user.fatherName;
    formData.firstName = user.firstName;
    formData.surName = user.surName;
    formData.gender = user.gender;
    formData.phone = user.phoneNumber;
    formData.otherPhone = user.otherPhone;
    formData.permissions = user.permissions;
  }
);

onMounted(() => {
  modalRef.value?.addEventListener("hidden.bs.modal", () => {
    usersStore.unselectUser()
  });
});
</script>
