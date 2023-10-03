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
          {{ $t("addNewCourse") }}
        </router-link>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="coursesStore.dataIsLoading" class="card-body pt-2">
      <!-- begin::table -->
      <div class="row align-items-center">
        <!-- <el-select
          style="width: 250px"
          v-model=""
          filterable
        >
          <el-option
            :value="FilterByOptions.ByName"
            :label="$t('searchByName')"
          >
          </el-option>
          <el-option
            :value="FilterByOptions.ByPhoneNumber"
            :label="$t('searchByPhoneNumber')"
          >
          </el-option>
        </el-select> -->

        <label for="name" class="col-sm-4">
          {{ $t("name") }}
          <el-input
            name="name"
            v-model="filters.name"
            :placeholder="$t('name')"
            style="width: 300px"
            @keyup.enter="coursesStore.loadCourses(filters)"
          />
        </label>

        <label for="minPrice" class="col-sm-4">
          {{ $t("minPrice") }}
          <el-input
            name="minPrice"
            class="col-sm-4"
            v-model="filters.minPrice"
            :placeholder="$t('minPrice')"
            style="width: 300px"
          />
        </label>

        <label for="maxPrice" class="col-sm-4">
          {{ $t("maxPrice") }}
          <el-input
            class="col-sm-4"
            v-model="filters.maxPrice"
            :placeholder="$t('maxPrice')"
            style="width: 300px"
          />
        </label>

        <label for="minNumberOfLessons" class="col-sm-4">
          {{ $t("minNumberOfLessons") }}
          <el-input
            class="col-sm-4"
            v-model="filters.minNumberOfLessons"
            :placeholder="$t('minNumberOfLessons')"
            style="width: 300px"
          />
        </label>

        <label for="maxNumberOfLessons" class="col-sm-4">
          {{ $t("maxNumberOfLessons") }}
          <el-input
            class="col-sm-4"
            v-model="filters.maxNumberOfLessons"
            :placeholder="$t('maxNumberOfLessons')"
            style="width: 300px"
          />
        </label>
        <label for="subjects" class="col-sm-4">
          {{ $t("subjects") }}
          <el-select
            class="col-sm-4"
            v-model="filters.subjectIds"
            :placeholder="$t('subjects')"
            style="width: 300px"
          />
        </label>
        <label for="rating" class="col-sm-4">
          {{ $t("rating") }}
          <el-input
            class="col-sm-4"
            v-model="filters.rating"
            :placeholder="$t('rating')"
            style="width: 300px"
          />
        </label>
        <label for="flag" class="col-sm-4">
          {{ $t("TODO") }}
          <el-input
            class="col-sm-4"
            v-model="filters.filteredInList"
            :placeholder="$t('TODO')"
            style="width: 300px"
          />
        </label>
        <div @click="coursesStore.loadCourses(filters)" class="col-sm-4">
          <a class="btn btn-sm btn-primary mx-1">
            {{ $t("search") }}
          </a>
        </div>
      </div>
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
    <UpdateCourseForm @close="unselectCourse" />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteCourse></DeleteCourse>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { Course, CourseFilters } from "@/types/Courses";
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

const filters = reactive<CourseFilters>({
  filteredInList: true,
  maxNumberOfLessons: 10,
  maxPrice: 200,
  minNumberOfLessons: 2,
  minPrice: 0,
  name: "",
  rating: [],
  subjectIds: [],
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
setCurrentPageBreadcrumbs(t("courses"), [t("courses")]);
</script>
