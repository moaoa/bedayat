<template>
  <div
    class="modal fade"
    id="kt_modal_delete_faq"
    ref="deleteFaqModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-550px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("deleteFaq") }}</h2>
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
          <h3>
            {{t('confirmDelete',{field:t('faq')})}}?
          </h3>
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
            :data-kt-indicator="deleting ? 'on' : null"
            class="btn btn-sm btn-danger"
            @click="deleteFaq"
            style="width: 200px"
          >
            <span v-if="!deleting" class="indicator-label">
              {{ $t("ok") }}
              <span class="svg-icon svg-icon-3 ms-2 me-0">
                <inline-svg src="icons/duotune/arrows/arr064.svg" />
              </span>
            </span>
            <span v-if="deleting" class="indicator-progress">
              {{ $t("pleaseWait") }}...

              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Button-->
        </div>
        <!--end::Modal footer-->
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
import { ref } from "vue";
// import { hideModal } from "@/core/helpers/dom";
import { useI18n } from "vue-i18n";
import { useFaqsStore } from "@/store/pinia_store/modules/FaqsModule";
import { Faq } from "@/types/Faq";
import { hideModal } from "@/core/helpers/dom";

const { t } = useI18n();
const deleting = ref<boolean>(false);

const emit = defineEmits<{
  (event: "faqDeleted", data: Faq);
  (event: "close", data: any);
}>();

const faqStore = useFaqsStore();

const deleteFaqModalRef = ref<HTMLElement | null>(null);

// eslint-disable-next-line no-undef
defineExpose({ modalRef: deleteFaqModalRef });

const deleteFaq = () => {
  faqStore.deleteFaq();
  emit("faqDeleted", faqStore.selectedFaq!);
  hideModal(deleteFaqModalRef.value)
};
</script>
