<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">
        {{ $t("exportPrepaidCards") }}
      </h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <div class="card-body">
      <el-form
        @submit.prevent="submit()"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <div class="modal-body py-10 px-lg-17">
          <div class="me-n7 pe-7">
            <div class="row">
              <div class="col-md-6 fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("exportAs") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="exportAs">
                  <el-select
                    v-model="formData.exportAs"
                    type="text"
                    :placeholder="$t('exportAs')"
                    clearable
                  >
                    <!-- TODO: CHECK THE VALUES -->
                    <el-option :label="$t('excel')" :value="1" />
                    <el-option :label="$t('json')" :value="0" />
                  </el-select>
                </el-form-item>

                <!--end::Input-->
              </div>
              <div class="col-md-6 fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("thirdParty") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="thirdParty">
                  <el-input
                    v-model="formData.thirdPartyName"
                    type="text"
                    :placeholder="$t('thirdParty')"
                    clearable
                  />
                </el-form-item>

                <!--end::Input-->
              </div>
              <div class="col-md-12 fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("details") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="details">
                  <el-input
                    v-model="formData.details"
                    type="textarea"
                    :placeholder="$t('details')"
                    clearable
                  />
                </el-form-item>

                <!--end::Input-->
              </div>
              <div class="row">
                <div class="col-md-5 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("count") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="count">
                    <el-input-number
                      v-model="categoriesForm.count"
                      type="text"
                      :placeholder="$t('count')"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>

                <div class="col-md-5 fv-row mb-7">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-bold mb-2">
                    {{ $t("coinAmount") }}
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="coinAmount">
                    <el-input-number
                      v-model="categoriesForm.coinAmount"
                      type="text"
                      :placeholder="$t('coinAmount')"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>
                <div class="col-md-2 mt-8">
                  <button
                    class="btn btn-success"
                    type="button"
                    :disabled="!categoryValuesAreValid"
                    :title="!categoryValuesAreValid ? $t('fillAllFields') : ''"
                    @click.="addRecordToCardCategories()"
                  >
                    +
                  </button>
                </div>
              </div>

              <el-table :data="formData.prepaidCardsCategories">
                <el-table-column
                  prop="count"
                  :label="$t('count')"
                  width="150"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.count"
                      :placeholder="$t('count')"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="coinAmount"
                  :label="$t('coinAmount')"
                  width="150"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.coinAmount"
                      :placeholder="$t('coinAmount')"
                    />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('delete')" width="150">
                  <template v-slot="scope">
                    <div class="flex">
                      <a
                        class="btn btn-icon btn-light-danger btn-sm"
                        data-bs-toggle="modal"
                        :data-bs-target="`#kt_modal_delete_item`"
                        @click="removeRecordFromCategoriesOfCards(scope.row)"
                      >
                        <i class="bi bi-trash"></i>
                      </a>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
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
import { usePrepaidCardsStore } from "@/store/pinia_store/modules/PrepaidCardsModule";
import { useI18n } from "vue-i18n";
import { NewPrepaidCard } from "@/types/PrepaidCards";
import Toaster from "@/core/services/Toaster";
import router from "@/router";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { PrepaidCardsExportParams } from "@/types/PrepaidCards";

const { t } = useI18n();

const prepaidCardsStore = usePrepaidCardsStore();
const formRef = ref<null | HTMLFormElement>(null);
const categoriesFormRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);
const loading = computed(() => prepaidCardsStore.isCreatingNewItem);
const formData = reactive<PrepaidCardsExportParams>({
  exportAs: 0, //TODO
  details: "",
  prepaidCardsCategories: [],
  thirdPartyName: "",
});

const categoriesForm = reactive<{ count: number; coinAmount: number }>({
  count: 0,
  coinAmount: 0,
});

const categoryValuesAreValid = computed(() => {
  return categoriesForm.count > 0 && categoriesForm.coinAmount > 0;
});

const rules = ref<Record<keyof PrepaidCardsExportParams, object[]>>({
  thirdPartyName: [{ required: false, trigger: "blur" }],
  details: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  exportAs: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
  prepaidCardsCategories: [
    {
      required: true,
      message: t("required"),
      trigger: "blur",
    },
  ],
});

const categoryRules = ref<
  Record<keyof { count: number; coinAmount: number }, object[]>
>({
  count: [
    {
      required: true,
      min: 1,
      message: t("required"),
      trigger: "blur",
    },
  ],
  coinAmount: [
    {
      required: true,
      min: 1,
      message: t("required"),
      trigger: "blur",
    },
  ],
});

const addRecordToCardCategories = () => {
  formData.prepaidCardsCategories.push({
    count: categoriesForm.count,
    coinAmount: categoriesForm.coinAmount,
  });
  categoriesForm.coinAmount = 0;
  categoriesForm.count = 0;
};
const removeRecordFromCategoriesOfCards = (index: number) => {
  formData.prepaidCardsCategories.splice(index, 1);
};
const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    try {
      await prepaidCardsStore.exportPrepaidCards(formData);
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
