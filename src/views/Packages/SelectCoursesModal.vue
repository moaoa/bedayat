<template>
  <div
    class="modal fade"
    id="kt_modal_select_courses"
    tabindex="-1"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_customer_header">
          <h2 class="fw-bolder">{{ $t("selectCourses") }}</h2>
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
        <div>
          <div class="row">
            <div class="col-8 mt-2 mx-10">
              <!--begin::Input-->
              <el-input
                v-model="coursesSearchValue"
                id="input_search_courses"
                type="text"
                :placeholder="t('search')"
              />
              <!--end::Input-->
            </div>
            <div class="col-2 mt-2 ">
              <!--begin::Input-->
              <button
                  class="btn btn-sm btn-primary"
                  type="button"
                  style="width: 100px"
                  @click="coursesStore.loadCoursesToAddToPackage(coursesSearchValue);"
              >
                <span
                    class="indicator-label"
                >
                  {{ $t("search") }}
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src=".icons/.svg" />
                  </span>
                </span>

              </button>
              <!--end::Input-->
            </div>

          </div>
          <div>
            <div
              class="modal-body py-2 px-lg-17 overflow-scroll"
              style="height: 70vh"
            >
              <div v-loading="coursesStore.dataIsLoading">
                <el-table
                  max-width
                  ref="multipleTableRef"
                  :data="coursesStore.coursesToSelectToAddToPackage"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" />
                  <el-table-column :label="t('courseLogo')" align="center">
                    <template #default="scope">
                      <a :href="scope.row.logoPath">
                        <img :src="scope.row.logoPath" width="100" class="object-fit-cover"  />
                      </a>
                    </template>
                  </el-table-column>
                  <el-table-column
                    property="name"
                    :label="t('name')"
                    header-align="center"
                    align="center"
                  />
                </el-table>
              </div>
              <!--end::Scroll-->
            </div>
            <!--end::Modal body-->

            <!--begin::Modal footer-->
            <!--begin::Modal footer-->
            <div class="modal-footer flex-center">
              <!--end::Button-->

              <!--begin::Button-->
              <button
                :data-kt-indicator="coursesStore.dataIsLoading ? 'on' : null"
                class="btn btn-sm btn-primary"
                type="button"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_select_courses`"
                style="width: 200px"
              >
                <span
                  v-if="!coursesStore.dataIsLoading"
                  class="indicator-label"
                >
                  {{ $t("save") }}
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span
                  v-if="coursesStore.dataIsLoading"
                  class="indicator-progress"
                >
                  {{ $t("pleaseWait") }}...

                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <!--end::Button-->
            </div>
            <!--end::Modal footer-->
          </div>
        </div>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted, watch } from "vue";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { useI18n } from "vue-i18n";
import { NewLocalityData } from "@/types/Localities";
import { ElTable } from "element-plus";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import { CourseSelection, SelectCoursesDto } from "@/types/Packages/Packages";
import { watchDebounced } from "@vueuse/core";

const { t } = useI18n();
const coursesSearchValue = ref<string>("");
const coursesStore = useCoursesStore();

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const formRef = ref<null | HTMLFormElement>(null);
const modalRef = ref<null | HTMLElement>(null);

const toggleSelection = (rows?: SelectCoursesDto[]) => {
  if (rows) {
    rows.forEach((row) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};

defineExpose({
  multipleTableRef,
  toggleSelection,
});
const submit = () => {
  if (!formRef.value) {
    return;
  }
};
const handleSelectionChange = (val: CourseSelection[]) => {
  console.log("selection change");
  coursesStore.selectedCoursesForPackage = val;
};

onMounted(() => {
  document
    .getElementById("input_search_courses")
    ?.addEventListener("keydown", (event) => {
      if (event.keyCode === 13 || event.key === "Enter") {
        coursesStore.loadCoursesToAddToPackage(coursesSearchValue.value);
      }
    });

  modalRef.value?.addEventListener("hidden.bs.modal", (e) => {
    // coursesStore.coursesToSelectToAddToPackage = [];
    if (formRef.value) console.log();
  });

  coursesStore.loadCoursesToAddToPackage("");
});
///////////watchers

watchDebounced(
  () => coursesSearchValue,
  () => coursesStore.loadCoursesToAddToPackage(coursesSearchValue.value),
  { debounce: 500 }
);

/////////////// validation

const rules = ref({
  name: [
    { required: true, message: t("required"), trigger: "blur" },
    {
      required: true,
      pattern: AppConstants.ARABIC_LETTERS_REGEX,
      message: t("nameMustBeArabic"),
      trigger: ["blur", "change"],
    },
  ],
  englishName: [
    {
      required: true,
      pattern: AppConstants.ENGLISH_LETTERS_REGEX,
      message: t("nameMustBeEnglish"),
      trigger: ["blur", "change"],
    },
  ],
  countryId: [{ required: true, message: t("required"), trigger: "blur" }],
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
