<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">البلدان</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="gradesStore.loadGrades()"
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
          {{ $t("addNewGrade") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-loading="gradesStore.dataIsLoading" class="card-body pt-2">
      <!-- begin::table -->

      <el-table :data="gradesTable" style="width: 100%" height="250">
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Grade, $index: number }">
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
              @click="selectGrade(scope.row)"
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
          <template #default="scope: { row: Grade, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_item`"
                @click="selectGrade(scope.row)"
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
        v-if="!gradesStore.dataIsLoading && gradesStore.grades"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="gradesStore.grades.length"
      />
      <!-- end::pagination -->
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <CreateGradeForm ref="addGradeModalRef" @submit="createGrade" />
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <UpdateGradeForm
      ref="updateGradeModalRef"
      @submit="gradeUpdated"
      @close="unselectGrade"
    />
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteGrade
      @gradeDeleted="gradeDeleted"
      ref="deleteGradeModalRef"
    ></DeleteGrade>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Grade } from "@/types/Grades";
import CreateGradeForm from "@/views/Grades/AddGradeModal.vue";
import UpdateGradeForm from "@/views/Grades/UpdateGradeModal.vue";
import DeleteGrade from "@/views/Grades/DeleteGradeModal.vue";
import { formatDate } from "@/core/helpers/formatDate";
import { useGradesStore } from "@/store/pinia_store/modules/GradesModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Toaster from "@/core/services/Toaster";
import { hideModal } from "@/core/helpers/dom";

const { t } = useI18n();
const gradesStore = useGradesStore();

const gradesTable = computed(() => gradesStore.grades);

const updateGradeModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const deleteGradeModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const addGradeModalRef = ref<{ modalRef: HTMLElement } | null>(null);

gradesStore.loadGrades();

const selectGrade = (grade: Grade) => {
  gradesStore.selectGrade(grade);
};

const unselectGrade = () => {
  gradesStore.unselectGrade();
};

const createGrade = async (gradeData: Grade) => {
  try {
    Toaster.Success("Success", "sucess");
    hideModal(addGradeModalRef.value!.modalRef);
  } catch (error) {
    console.log(error);
    Toaster.error("Error", "sucess");
  }
};

const gradeUpdated = async () => {
  hideModal(updateGradeModalRef.value!.modalRef);
  Toaster.Success("success", "asasdsds");
};

const gradeDeleted = async () => {
  hideModal(deleteGradeModalRef.value!.modalRef!);
  Toaster.Success("success", "asasdsds");
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (grade: Grade) => formatDate(grade[key]);
};
setCurrentPageBreadcrumbs(t("grades"), [t("grades")]);
</script>
