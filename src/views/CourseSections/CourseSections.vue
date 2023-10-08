<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("sections") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="sectionsStore.loadCourseSection(sectionSelectedId)"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a
          href="#"
          class="btn btn-sm btn-primary mx-1"
          target="#"
          data-bs-toggle="modal"
          :data-bs-target="`#kt_modal_add_item`"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("addNewSection") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="sectionsStore.dataIsLoading" class="card-body pt-2">
      <!-- begin::table -->

      <el-table :data="sectionsTable" style="width: 100%" height="500">
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: CourseSection, $index: number }">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          :label="$t('title')"
          width="150"
          align="center"
          header-align="center"
        >
          <template v-slot="scope: { row: CourseSection, $index: number }">
            <ClippedText :text="scope.row.title" />
          </template>
        </el-table-column>
        <el-table-column
          prop="englishTitle"
          :label="$t('englishTitle')"
          width="150"
        >
          <template v-slot="scope: { row: CourseSection, $index: number }">
            <ClippedText :text="scope.row.englishTitle" />
          </template>
        </el-table-column>
        <el-table-column
          prop="gradeTypeIndex"
          :label="$t('gradeTypeIndex')"
          width="150"
        >
          <template v-slot="scope: { row: CourseSection, $index: number }">
            {{ mapIndexToSectionLabel(scope.row.gradeTypeIndex) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          :label="$t('createdAt')"
          width="150"
          align="center"
          header-align="center"
          :formatter="formatter('createdAt')"
        />
        <el-table-column
          prop="lastUpdated"
          :label="$t('lastUpdated')"
          width="150"
          align="center"
          header-align="center"
          :formatter="formatter('lastUpdated')"
        />

        <el-table-column
          :label="$t('lessons')"
          width="90"
          align="center"
          header-align="center"
        >
          <template v-slot="scope: { row: CourseSection, $index: number }">
            <RouterLink
              :to="{
                name: 'CourseLessons',
                params: { id: scope.row.id },
              }"
            >
              <a class="btn btn-icon btn-light-success btn-sm">
                <i class="bi bi-book"></i>
              </a>

              <i class=""></i>
            </RouterLink>
          </template>
        </el-table-column>
        <el-table-column :label="$t('edit')" width="120" align="center">
          <template #default="scope">
            <a
              class="btn btn-icon btn-light-success btn-sm"
              data-bs-toggle="modal"
              :data-bs-target="`#update_item_modal`"
              @click="selectSection(scope.row)"
            >
              <i class="bi bi-pencil"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('remove')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: CourseSection, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_item`"
                @click="selectSection(scope.row)"
              >
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- end::table -->

      <!-- start::pagination -->
      <br />
      <!-- start::pagination -->
      <!-- <el-pagination
        v-if="!sectionsStore.dataIsLoading && sectionsStore.sections"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="sectionsStore.sections.length"
      /> -->
      <!-- end::pagination -->
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <CreateSectionForm />
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <UpdateSectionForm @close="unselectSection" />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteSection></DeleteSection>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { CourseSection } from "@/types/CourseSection";
import CreateSectionForm from "@/views/CourseSections/AddCourseSectionModal.vue";
import UpdateSectionForm from "@/views/CourseSections/UpdateCourseSectionModal.vue";
import DeleteSection from "@/views/CourseSections/DeleteSectionModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useCourseSectionsStore } from "@/store/pinia_store/modules/CourseSectionModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ClippedText from "@/components/ClippedText.vue";
import Toaster from "@/core/services/Toaster";
import { hideModal } from "@/core/helpers/dom";
import { User } from "@/types/User";
import DotsIcon from "@/components/icons/DotsIcon.vue";
import router from "@/router";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import mapIndexToSectionLabel from "@/core/helpers/mapIndexToSectionLabel";

const { t } = useI18n();
const sectionsStore = useCourseSectionsStore();

const sectionSelectedId = router.currentRoute.value.params.id as string;

const sectionsTable = computed(() => sectionsStore.courseSections);

const deleteSectionModalRef = ref<{ modalRef: HTMLElement } | null>(null);

sectionsStore.loadCourseSection(sectionSelectedId);

const selectSection = (section: CourseSection) => {
  sectionsStore.selectCourseSection(section);
};

const unselectSection = () => {
  sectionsStore.unselectCourseSection();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (section: CourseSection) => formatDate(section[key]);
};

sectionsStore.getGradeTypeByCourseId(
  router.currentRoute.value.params.id as string
);
setCurrentPageBreadcrumbs(t("sections"), [t("sections")]);
</script>
@/store/pinia_store/modules/CourseSectionModule
