<template>
  <div
    class="modal fade"
    id="kt_modal_delete_locality"
    ref="deleteLocalityModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-550px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("deleteLocality") }}</h2>
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

        <div class="modal-body  py-10 px-lg-17 px-20">
          <h3 class="fs-1">{{ t("areYouSure") }}</h3>
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
            @click="deleteLocality"
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
import { useLocalitiesStore } from "@/store/pinia_store/modules/LocalitiesModule";
import { Locality } from "@/types/Localities";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const deleting = ref<boolean>(false);

const emit = defineEmits<{
  (event: "localityDeleted", data: Locality);
  (event: "close", data: any);
}>();

const localitiesStore = useLocalitiesStore();

const deleteLocalityModalRef = ref<HTMLElement | null>(null);

defineExpose({ modalRef: deleteLocalityModalRef });

const deleteLocality = () => {
  deleting.value = !deleting.value;

  setTimeout(() => {
    deleting.value = !deleting.value;
    emit("localityDeleted", localitiesStore.selectedLocality!);
  }, 3000);
};
</script>
