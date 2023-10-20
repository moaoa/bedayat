<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ $t("gradeSubjects") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
            class="btn btn-icon btn-light-primary btn-sm me-3"
            @click="gradeSubjectsStore.loadGradeSubjects()"
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

          {{ $t("addNewGradeSubject") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->


    <div class="card-body pt-2">
      <!-- begin::table -->
      <div class="row">
        <div class="col-md-4 col-lg-3 col-7 mx-10">

          <el-select v-model="gradeSubjectsStore.selectedGradeId" clearable filterable>
            <el-option v-for="grade in gradesStore.grades" :key="grade.id" :value="grade.id"
                       :label="grade.name">
            </el-option>
          </el-select>
        </div>
      </div>

      <div v-loading="gradeSubjectsStore.dataIsLoading" class="card-body pt-2">
        <el-table :data="gradeSubjectsTable" style="width: 100%" height="500">
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
          <el-table-column :label="$t('grades')"  align="center"
                           header-align="center">
            <template #default="scope: { row: GradeSubject, $index: number }">
              {{ scope.row.grade.name}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('gradesEnglish')" align="center"
                           header-align="center">
            <template #default="scope: { row: GradeSubject, $index: number }">
              {{ scope.row.grade.englishName}}
            </template>
          </el-table-column>

          <el-table-column :label="$t('subjects')" align="center"
                           header-align="center">
            <template #default="scope: { row: GradeSubject, $index: number }">
              {{ scope.row.subject.name}}
            </template>
          </el-table-column>

          <el-table-column :label="$t('subjectsEnglish')"  align="center"
                           header-align="center">
            <template #default="scope: { row: GradeSubject, $index: number }">
              {{ scope.row.subject.englishName}}
            </template>
          </el-table-column>

          <el-table-column :label="$t('book')"  align="center"
                           header-align="center">
            <template #default="scope: { row: GradeSubject, $index: number }">
              <a
                  class="btn btn-icon btn-light-success btn-sm"
                  :href="scope.row.bookLink"
              >
                <i class="bi bi-book"></i>
              </a>
            </template>

          </el-table-column>
          <el-table-column :label="$t('logo')"  align="center"
                           header-align="center">
            <template #default="scope: { row: GradeSubject, $index: number }">
              <a
                  class="btn btn-icon btn-light-success btn-sm"
                  :href="scope.row.logo"
              >
                <i class="bi bi-images"></i>
              </a>
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


          <el-table-column :label="$t('edit')" width="120" align="center"
                           header-align="center">
            <template #default="scope">
              <a
                  class="btn btn-icon btn-light-success btn-sm"
                  data-bs-toggle="modal"
                  :data-bs-target="`#update_item_modal`"
                  @click="selectGradeSubject(scope.row)"
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
            <template #default="scope: { row: GradeSubject, $index: number }">
              <div class="flex">
                <a
                    class="btn btn-icon btn-light-danger btn-sm"
                    data-bs-toggle="modal"
                    :data-bs-target="`#kt_modal_delete_item`"
                    @click="selectGradeSubject(scope.row)"
                >
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- end::table -->

        <!-- start::pagination -->
        <br/>
        <!-- start::pagination -->
        <el-pagination
            v-if="!gradeSubjectsStore.dataIsLoading && gradeSubjectsStore.gradeSubjects"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="gradeSubjectsStore.gradeSubjects.length"
        />
        <!-- end::pagination -->
      </div>
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->
    <AddGradeSubjectModal/>
    <!-- end::dialog -->
    <!-- begin::dialog -->
    <UpdateGradeSubject @close="unselectGrade"/>
    <!-- end::dialog -->

    <!-- begin::dialog -->
    <DeleteGradeSubject></DeleteGradeSubject>
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {Grade} from "@/types/Grades";
import AddGradeSubjectModal from "@/views/GradeSubjects/AddGradeSubjectModal.vue";
import UpdateGradeSubject from "@/views/GradeSubjects/UpdateGradeSubjectModal.vue";
import DeleteGradeSubject from "@/views/GradeSubjects/DeleteGradeSubjectModal.vue";
import {formatDate} from "@/core/helpers/formatDate";
import {useGradesStore} from "@/store/pinia_store/modules/GradesModule";
import {useI18n} from "vue-i18n";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import {hideModal} from "@/core/helpers/dom";
import {useGradeSubjectsStore} from "@/store/pinia_store/modules/GradeSubjectsModule";
import {GradeSubject} from "@/types/GradeSubjects";
import {useRoute} from "vue-router";

const route = useRoute();
const {t} = useI18n();
const gradeSubjectsStore = useGradeSubjectsStore();
const gradesStore = useGradesStore();

const gradeSubjectsTable = computed(() => gradeSubjectsStore.gradeSubjects);

const deleteGradeModalRef  = ref<{ modalRef: HTMLElement } | null>(null);

const selectGradeSubject = (gradeSubject: GradeSubject) => {
  gradeSubjectsStore.selectGradeSubject(gradeSubject);
};

const unselectGrade = () => {
  gradeSubjectsStore.unselectGradeSubject();
};

const formatter = (key: "createdAt" | "lastUpdated") => {
  return (grade: Grade) => formatDate(grade[key]);
};
watch(()=> {
  return gradeSubjectsStore.selectedGradeId
}, (gradeId)=> {
  gradeSubjectsStore.loadGradeSubjects();

})
onMounted(()=> {
  gradesStore.loadGrades();
  gradeSubjectsStore.selectedGradeId = route.params.id as string;
  gradeSubjectsStore.loadGradeSubjects();
})
setCurrentPageBreadcrumbs(t("grades"), [t("grades")]);
</script>
