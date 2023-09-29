<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("courses") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="coursesStore.loadCourses()"
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
          {{ $t("addNewCourse") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="coursesStore.dataIsLoading" class="card-body pt-2">
      <!-- begin::table -->

      <el-table :data="coursesTable" style="width: 100%" height="250">
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Course, $index: number }">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('arabicName')" width="120" />
        <el-table-column
          prop="englishName"
          :label="$t('englishName')"
          width="120"
        />
        <el-table-column
          prop="createdAt"
          :label="$t('createdAt')"
          width="200"
          :formatter="formatter('createdAt')"
        />
        <el-table-column
          prop="lastUpdated"
          :label="$t('lastUpdated')"
          width="200"
          :formatter="formatter('lastUpdated')"
        />
        <el-table-column :label="$t('edit')" width="120" align="center">
          <template #default="scope">
            <a
              class="btn btn-icon btn-light-success btn-sm"
              data-bs-toggle="modal"
              :data-bs-target="`#update_item_modal`"
              @click="selectCourse(scope.row)"
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
          <template #default="scope: { row: Course, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_item`"
                @click="selectCourse(scope.row)"
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
      <el-pagination
        v-if="!coursesStore.dataIsLoading && coursesStore.courses"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="coursesStore.courses.length"
      />
      <!-- end::pagination -->
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <CreateCourseForm />
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <UpdateCourseForm @close="unselectCourse" />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteCourse></DeleteCourse>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Course } from "@/types/Courses";
import CreateCourseForm from "@/views/Courses/AddCourseModal.vue";
import UpdateCourseForm from "@/views/Courses/UpdateCourseModal.vue";
import DeleteCourse from "@/views/Courses/DeleteCourseModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Toaster from "@/core/services/Toaster";
import { hideModal } from "@/core/helpers/dom";

const { t } = useI18n();
const coursesStore = useCoursesStore();

const coursesTable = computed(() => coursesStore.courses);

const deleteCourseModalRef = ref<{ modalRef: HTMLElement } | null>(null);

coursesStore.loadCourses();

const selectCourse = (course: Course) => {
  coursesStore.selectCourse(course);
};

const unselectCourse = () => {
  coursesStore.unselectCourse();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (course: Course) => formatDate(course[key]);
};
setCurrentPageBreadcrumbs(t("courses"), [t("courses")]);
</script>
