<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("subjects") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="subjectsStore.loadSubjects()"
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
          {{ $t("addNewSubject") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="subjectsStore.dataIsLoading" class="card-body pt-2">
      <!-- begin::table -->

      <div class="row">
        <div class="col-md-3 col-lg-2 col-7">
          <el-select
            v-model="subjectsStore.selectedSubjectType"
            clearable
            filterable
          >
            <el-option :label="t('none')" :value="SubjectType.None" />
            <el-option :label="t('literary')" :value="SubjectType.Literary" />
            <el-option
              :label="t('scientific')"
              :value="SubjectType.Scientific"
            />
          </el-select>
        </div>
      </div>

      <div v-loading="subjectsStore.dataIsLoading" class="card-body pt-2">
        <el-table :data="subjectsTable" style="width: 100%" height="70vh">
          <el-table-column
            index="scope.$index"
            :label="t('noNumber')"
            width="55"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: Subject, $index: number }">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('arabicName')"
            min-width="100"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: Subject, $index: number }">
              <ClippedText :text="scope.row.name" />
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('englishName')"
            min-width="100"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: Subject, $index: number }">
              <ClippedText :text="scope.row.englishName" />
            </template>
          </el-table-column>

<!--          <el-table-column-->
<!--            prop="createdAt"-->
<!--            :label="$t('createdAt')"-->
<!--            :formatter="formatter('createdAt')"-->
<!--          />-->
<!--          <el-table-column-->
<!--            prop="lastUpdated"-->
<!--            :label="$t('lastUpdated')"-->
<!--            :formatter="formatter('lastUpdated')"-->
<!--          />-->
          <el-table-column :label="$t('edit')" align="center">
            <template #default="scope">
              <a
                class="btn btn-icon btn-light-success btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#update_item_modal`"
                @click="selectSubject(scope.row)"
              >
                <i class="bi bi-pencil"></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('remove')"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: Subject, $index: number }">
              <div class="flex">
                <a
                  class="btn btn-icon btn-light-danger btn-sm"
                  data-bs-toggle="modal"
                  :data-bs-target="`#kt_modal_delete_item`"
                  @click="selectSubject(scope.row)"
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
          v-if="!subjectsStore.dataIsLoading && subjectsStore.subjects"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="subjectsStore.subjects.length"
        />
        <!-- end::pagination -->
      </div>
    </div>

    <!--end::Body-->

    <!-- begin::dialog -->
    <CreateSubjectForm />
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <UpdateSubjectForm @close="unselectSubject" />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteSubject></DeleteSubject>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { Subject, SubjectType } from "@/types/Subjects";
import CreateSubjectForm from "@/views/Subjects/AddSubjectModal.vue";
import UpdateSubjectForm from "@/views/Subjects/UpdateSubjectModal.vue";
import DeleteSubject from "@/views/Subjects/DeleteSubjectModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useSubjectsStore } from "@/store/pinia_store/modules/SubjectModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { BugStatusSearch } from "@/types/BugReports";
import { GradeSubject } from "@/types/GradeSubjects";
import ClippedText from "@/components/ClippedText.vue";

const { t } = useI18n();
const subjectsStore = useSubjectsStore();

const subjectsTable = computed(() => subjectsStore.subjects);

subjectsStore.loadSubjects();

const selectSubject = (subject: Subject) => {
  subjectsStore.selectSubject(subject);
};

const unselectSubject = () => {
  subjectsStore.unselectSubject();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (subject: Subject) => formatDate(subject[key]);
};
setCurrentPageBreadcrumbs(t("subjects"), [t("subjects")]);
watch(
  () => subjectsStore.selectedSubjectType,
  () => subjectsStore.loadSubjects()
);
</script>
