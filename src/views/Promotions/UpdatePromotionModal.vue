<template>
  <div
    class="modal fade"
    id="update_promotion_modal"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("updatePromotion") }}</h2>
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
                  {{ $t("information") }}
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.information"
                    type="text"
                    placeholder=""
                  />
                </el-form-item>

                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-bold mb-2">
                  {{ $t("englishName") }}</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="image">
                  <div >

                    <FileInput
                        v-if="!imagePath"
                        @change="handleImageUpload"
                        :accept="'image'"
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
                              :placeholder="$t('image')"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              @click.stop="scope.open()"
                              style="width: 200px"
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
                          </div>
                        </div>
                      </template>
                    </FileInput>
                    <div v-else class="row">
                  <span
                      :href="imagePath"
                      class="col-2 mx-10 my-2  justify-content-center align-content-center"
                  >
                <a :href="imagePath" target="_blank"
                   class=" justify-content-center align-content-center">
                  <img style="width: 50px;" src="/public/media/icons/duotune/files/fil016.svg" >
                  <p class="">{{ imagePath.slice(-15) ?? '' }}</p>
                </a>
                  </span>
                      <span
                          class="btn btn-danger col-2 mx-10 my-2"
                          style="width: min-content; height: min-content"
                          @click="()=> {
                          imagePath = '';
                          formData.image = null;
                        }"
                      >
                    {{ $t("delete") }}
                  </span>
                    </div>
                  </div>
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
            id="update_locality_modal_close"
              type="reset"
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
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {AddUpdatePromotionDto} from "@/types/Promotions";
import {usePromotionsStore} from "@/store/pinia_store/modules/PromotionsModule";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";
import FileInput from "@/components/FileInput.vue";
const { t } = useI18n();

const promotionStore = usePromotionsStore();

const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);

const imagePath = ref<string>(promotionStore.selectedPromotion?.image ??  '')

const loading = computed(() => {
  return promotionStore.isUpdatingItem;
});

const formData = reactive<AddUpdatePromotionDto>({
  information: "",
  image: "",
});



const handleImageUpload = async (file: File | null) => {

  if (!file) return;

  imagePath.value = file.name.length > 15 ? file.name.substring(0, 15) + "..." : file.name;

  formData.image = file;

}



const emit = defineEmits<{
  (event: "submit", data: AddUpdatePromotionDto);
}>();

defineExpose({
  modalRef,
});

const rules = ref({
  information: [
    { required: true, message: t("required"), trigger: "blur" },
  ],
});

const submit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate((valid: boolean) => {
    if (!valid) {
      return;
    }

    emit("submit", formData);
  });
};

watch(
  () => promotionStore.selectedPromotion,
  (value) => {
    formData.information = value?.information ?? "";
    formData.image = value?.image ?? "";
  }
);
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