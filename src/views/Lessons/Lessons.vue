<template>
  <!--begin::List Widget 3-->
  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("lessons") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="lessonsStore.loadLessons(sectionSelectedId)"
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
          {{ $t("addNewLesson") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="lessonsStore.dataIsLoading" class="card-body pt-2">
      <!-- begin::table -->

      <el-table :data="tableData" style="width: 100%" height="500">
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Lesson, $index: number }">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="thumbnail"
          :label="$t('thumbnail')"
          width="120"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Lesson, $index: number }">
            <img
              v-if="scope.row.thumbnail"
              :src="scope.row.thumbnail"
              style="object-fit: contain; width: 400px"
              alt="thumbnail"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          :label="$t('title')"
          width="120"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="description"
          :label="$t('description')"
          align="center"
          min-width="200"
        />
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
          :label="$t('attachments')"
          width="150"
          align="center"
          header-align="center"
        >
          <template v-slot="scope: { row: Lesson, $index: number }">
            <a
              class="btn btn-icon btn-light-primary btn-sm"
              data-bs-toggle="modal"
              :data-bs-target="`#kt_modal_attachments_item`"
              @click="selectLesson(scope.row)"
            >
              <AttachmentIcon />
            </a>
          </template>
        </el-table-column>
        <el-table-column :label="$t('edit')" width="120" align="center">
          <template #default="scope">
            <a
              class="btn btn-icon btn-light-success btn-sm"
              data-bs-toggle="modal"
              :data-bs-target="`#update_item_modal`"
              @click="selectLesson(scope.row)"
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
          <template #default="scope: { row: Lesson, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_item`"
                @click="selectLesson(scope.row)"
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
    <CreateLessonModal />
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <UpdateLessonModal @close="unselectSection" />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteLessonModal></DeleteLessonModal>
    <!-- end::dialog -->

    <!-- begin::modal -->
    <LessonAttachmentsModal />
    <!-- end::modal -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Lesson } from "@/types/Lessons";
import CreateLessonModal from "@/views/Lessons/AddLessonModal.vue";
import UpdateLessonModal from "@/views/Lessons/UpdateLessonModal.vue";
import DeleteLessonModal from "@/views/Lessons/DeleteLessonModal.vue";
import LessonAttachmentsModal from "@/views/Lessons/LessonAttachmentsModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useLessonsStore } from "@/store/pinia_store/modules/LessonsModule";
import { useCourseSectionsStore } from "@/store/pinia_store/modules/CourseSectionModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import router from "@/router";
import AttachmentIcon from "@/components/icons/AttachmentIcon.vue";

const { t } = useI18n();
const lessonsStore = useLessonsStore();
const sectionsStore = useCourseSectionsStore();

const sectionSelectedId = router.currentRoute.value.params.id as string;

const tableData = computed(() => lessonsStore.lessons);

lessonsStore.loadLessons(sectionSelectedId);

const selectLesson = (section: Lesson) => {
  lessonsStore.selectLesson(section);
};

const unselectSection = () => {
  lessonsStore.unselectLesson();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (section: Lesson) => formatDate(section[key]);
};

setCurrentPageBreadcrumbs(
  sectionsStore.selectedCourseSection.title?.slice(0, 30) || t("lessons"),
  [t("lessons")]
);
</script>
