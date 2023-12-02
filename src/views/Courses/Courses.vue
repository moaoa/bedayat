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
          @click="coursesStore.loadCourses(filters)"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <router-link
          :to="{ name: 'AddCourse' }"
          class="btn btn-sm btn-primary mx-1"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("addCourse") }}
        </router-link>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="coursesStore.dataIsLoading" class="card-body pt-2">
      <!-- begin: filters -->
      <div class="row align-items-center">
        <label for="name" class="col-sm-4 mt-4 d-flex flex-column">
          {{ $t("name") }}
          <el-input
            name="name"
            v-model="filters.name"
            :placeholder="$t('name')"
            style="width: 300px"
            @keyup.enter="coursesStore.loadCourses(filters)"
          />
        </label>

        <label for="minPrice" class="col-sm-4 mt-4 d-flex flex-column">
          {{ $t("minPrice") }}
          <el-input-number
            class="col-sm-4"
            v-model="filters.minPrice"
            name="minPrice"
            :placeholder="$t('minPrice')"
            :min="0"
            style="width: 300px"
          />
        </label>

        <label for="maxPrice" class="col-sm-4 mt-4 d-flex flex-column">
          {{ $t("maxPrice") }}
          <el-input-number
            class="col-sm-4"
            v-model="filters.maxPrice"
            name="maxPrice"
            :placeholder="$t('maxPrice')"
            :min="0"
            style="width: 300px"
          />
        </label>

        <label
          for="minNumberOfLessons"
          class="col-sm-4 mt-4 d-flex flex-column"
        >
          {{ $t("minNumberOfLessons") }}
          <el-input-number
            class="col-sm-4"
            v-model="filters.minNumberOfLessons"
            :placeholder="$t('minNumberOfLessons')"
            :min="0"
            style="width: 300px"
          />
        </label>

        <label
          for="maxNumberOfLessons"
          class="col-sm-4 mt-4 d-flex flex-column"
        >
          {{ $t("maxNumberOfLessons") }}
          <el-input-number
            class="col-sm-4"
            v-model="filters.maxNumberOfLessons"
            :placeholder="$t('maxNumberOfLessons')"
            style="width: 300px"
          />
        </label>
        <label for="subjects" class="col-sm-4 mt-4 d-flex flex-column">
          {{ $t("subjects") }}
          <el-select
            v-model="filters.subjectIds"
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            :placeholder="$t('subjects')"
            class="col-sm-4"
            style="width: 300px"
            v-loading="subjectsStore.dataIsLoading"
          >
            <el-option
              v-for="subject in subjectsStore.subjects"
              :key="subject.id"
              :label="subject.name"
              :value="subject.id"
            />
          </el-select>
        </label>
        <label for="rating" class="col-sm-4 mt-4 d-flex flex-column">
          {{ $t("rating") }}
          <el-input
            class="col-sm-4"
            v-model="filters.rating"
            :placeholder="$t('rating')"
            style="width: 300px"
          />
        </label>
        <div @click="coursesStore.loadCourses(filters)" class="col-sm-4 mt-9">
          <a class="btn btn-sm btn-primary mx-1">
            {{ $t("search") }}
          </a>
        </div>
      </div>
      <!-- end: filters -->

      <!-- begin::table -->
      <el-table
        :data="coursesTable"
        style="width: 100%"
        class="mt-8"
        height="400"
      >
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Course, $index: number }">
            <div
              class="d-flex align-items-center gap-3 justify-content-between"
            >
              <span
                v-if="
                  scope.row.courseStatus === AppConstants.COURSE_STATUS.InActive
                "
                class="bullet bullet-vertical h-40px bg-danger"
              ></span>
              <span
                v-else
                class="bullet bullet-vertical h-40px bg-success"
              ></span>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('arabicName')" width="120">
          <template v-slot="scope: { row: Course, $index: number }">
            <ClippedText :text="scope.row.name" />
          </template>
        </el-table-column>
        <el-table-column
          prop="englishName"
          :label="$t('englishName')"
          width="150"
        >
          <template v-slot="scope: { row: Course, $index: number }">
            <ClippedText :text="scope.row.englishName" />
          </template>
        </el-table-column>
        <el-table-column
          prop="numberOfLessons"
          :label="$t('numberOfLessons')"
          width="170"
          align="center"
        />
        <el-table-column
          prop="rating"
          :label="$t('rating')"
          width="170"
          align="center"
        />
        <el-table-column
          prop="numberOfRatings"
          :label="$t('numberOfRatings')"
          width="170"
          align="center"
        />
        <el-table-column :label="$t('sections')" width="120" align="center">
          <template #default="scope: { row: Course, $index: number }">
            <router-link
              :to="{ name: 'CourseSections', params: { id: scope.row.id } }"
            >
              <a
                class="btn btn-icon btn-light-success btn-sm"
                @click="() => selectCourse(scope.row)"
              >
                <DotsIcon />
              </a>
            </router-link>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('status')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Course, $index: number }">
            <div class="flex">
              <el-switch
                v-model="scope.row.courseStatus"
                :loading="coursesStore.isSwitchingCourseStatus"
                :active-action-icon="CheckIcon"
                :inactive-action-icon="CrossIcon"
                :active-value="AppConstants.COURSE_STATUS.Active"
                :inactive-value="AppConstants.COURSE_STATUS.InActive"
                :before-change="() => handleToggleUser(scope.row)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('edit')" width="120" align="center">
          <template #default="scope: { row: Course, $index: number }">
            <router-link
              :to="{ name: 'UpdateCourse', params: { id: scope.row.id } }"
            >
              <a
                class="btn btn-icon btn-light-success btn-sm"
                @click="() => selectCourse(scope.row)"
              >
                <i class="bi bi-pencil"></i>
              </a>
            </router-link>
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
        :total="coursesStore.pagination.total"
        v-model:current-page="filters.currentPage"
        v-model:page-size="filters.pageSize"
      />
      <!-- end::pagination -->
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <DeleteCourse></DeleteCourse>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { Course, CourseFilters } from "@/types/Courses";
import DeleteCourse from "@/views/Courses/DeleteCourseModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";
import { useSubjectsStore } from "@/store/pinia_store/modules/SubjectModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import ClippedText from "@/components/ClippedText.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import DotsIcon from "@/components/icons/DotsIcon.vue";
import Toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { watch } from "vue";

const { t } = useI18n();
const coursesStore = useCoursesStore();

const subjectsStore = useSubjectsStore();

const coursesTable = computed(() => coursesStore.courses);

const filters = reactive<CourseFilters>({
  maxNumberOfLessons: 10,
  maxPrice: 10,
  minNumberOfLessons: 0,
  minPrice: 0,
  name: "",
  rating: [],
  subjectIds: [],
  currentPage: 1,
  pageSize: 10,
});

coursesStore.loadCourses(filters);

const selectCourse = (course: Course) => {
  coursesStore.selectCourse(course);
};

const unselectCourse = () => {
  coursesStore.unselectCourse();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (course: Course) => formatDate(course[key]);
};

const handleToggleUser = async (course: Course) => {
  try {
    await coursesStore.toggleCourseStatus(course);
    Toaster.Success("Success", "sucess");
    return true;
  } catch (error) {
    return false;
  }
};

setCurrentPageBreadcrumbs(t("courses"), [t("courses")]);

subjectsStore.loadSubjects();

watch(
  () => [filters.currentPage, filters.pageSize],
  () => coursesStore.loadCourses(filters)
);
</script>
