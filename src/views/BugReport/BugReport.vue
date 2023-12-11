<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{t("bugReports")}}</h3>

      <div class="card-toolbar">
        <a class="btn btn-icon btn-light-success btn-sm me-3" @click="bugReportStore.loadBugReports()">
          <i class="bi bi-arrow-repeat"></i>
        </a>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2">
      <div class="row">
        <div class="col-md-4 col-lg-3 col-7 pb-10 mx-4">

          <el-select class="w-400px" v-model="bugReportStore.selectedBugCategory" clearable filterable>
            <el-option v-for="category in Object.values(BugStatusSearch).slice(0,Object.values(BugStatusSearch).length/2 )" :key="category" :value="BugStatusSearch[category]"
                       :label="t(category)">
            </el-option>
          </el-select>

        </div>
      </div>

      <div v-loading="bugReportStore.dataIsLoading">
      <!-- begin::table -->
      <el-table :data="bugReportStore.bugReports" style="width: 100%" height="250">

        <el-table-column prop="title" :label="$t('title')" width="150" />
        <el-table-column
          prop="description"
          :label="$t('description')"
          width="150"
          align="center"
          header-align="center"
        />
        <el-table-column
          prop="bugResponse"
          :label="$t('bugResponse')"
          width="300"
          align="center"
          header-align="center"
        />


        <el-table-column :label="t('department')"  width="180"
                         align="center"
                         header-align="center" >
          <template v-slot="scope: { row: BugReport, $index: number }">

            <el-select v-model="bugReportStore.bugReports.find(x=> x.id == scope.row.id).department" clearable filterable>
              <el-option v-for="category in Object.values(BugDepartmentType).slice(0,Object.values(BugDepartmentType).length/2 )" :key="category" :value="BugDepartmentType[category]"
                         :label="t(category)"  @click="assignDepartment(scope.row.id, category)" >
              </el-option>
            </el-select>


          </template>
        </el-table-column>


        <el-table-column :label="t('status')" width="120"
                         align="center"
                         header-align="center" >
          <template v-slot="scope: { row: BugReport, $index: number }">

            <el-tag v-if="scope.row.status == 0   ">{{ t("pending") }}</el-tag>
            <el-tag v-else type="success">{{ t("closedIssue") }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('edit')" width="150"
                         align="center"
                         header-align="center" >
          <template #default="scope: { row: BugReport, $index: number }">
            <div class="flex">
              <button
                @click="openRespondToBugReportDialog(scope.row)"
                class="
                  btn btn-icon btn-bg-light btn-active-color-primary btn-sm
                  me-1
                "
              >
                <span class="svg-icon svg-icon-3">
                  <inline-svg src="/media/icons/duotune/art/art005.svg" />
                </span>
              </button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- end::table -->

      </div>
    </div>

    <el-dialog
      v-model="respondToBugDialogIsVisible"
      :title="t('respondToBugDialogTitle')"
      :before-close="closeRespondToBugDialog"
      :show-close="false"
    >
      <RespondToBugReportForm
        @close="closeRespondToBugDialog"
        @submit="respondToBug"
      />
    </el-dialog>
    <br>
    <el-pagination
        v-if="!bugReportStore.dataIsLoading && bugReportStore.bugReports"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="bugReportStore.pagination.total"
        v-model:current-page="bugReportStore.pagination.currentPage"
        v-model:page-size="bugReportStore.pagination.currentSize"
    />
    <!-- end::dialog -->
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {BugDepartmentType, BugReport, BugStatusSearch} from "@/types/BugReports";
import RespondToBugReportForm from "@/views/BugReport/RespondToBugModal.vue";
import { useBugReportsStore } from "@/store/pinia_store/modules/BugReportModule";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import {FaqCategory} from "@/types/Faq";
import bugReportService from "@/core/services/BugReportService";
import store from "@/store";

const { t } = useI18n();
const bugReportStore = useBugReportsStore();

const respondToBugDialogIsVisible = ref(false);

const bugReportsTable = computed(() => bugReportStore.bugReports);

const closeRespondToBugDialog = () => {
  respondToBugDialogIsVisible.value = false;
};

const openConfirmDialog = async () => {
  try {
    await ElMessageBox.confirm(t("deleteMessage"), t("warning"), {
      confirmButtonText: t("ok"),
      cancelButtonText: t("cancel"),
      type: "warning",
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
async function assignDepartment(id: string, category: BugDepartmentType) {


  await bugReportStore.assignDepartment(id, category);

  return;
}

const respondToBug = async (form: { response: string }) => {
  const success = await bugReportStore.respondToSelectedBug(form.response);
  if (success) {
    respondToBugDialogIsVisible.value = false;
    form.response = "";
  }
};

const openRespondToBugReportDialog = (bug: BugReport) => {

bugReportStore.selectedBugToRespond  = bug;
  respondToBugDialogIsVisible.value = true;
  bugReportStore.selectBugReportId(bug.id);
};
onMounted(()=> {
  bugReportStore.selectedBugCategory = 2
})

watch(()=> bugReportStore.selectedBugCategory,
    ()=> {

      console.log("in the watcher")
      bugReportStore.loadBugReports()
    })
watch(()=> bugReportStore.bugReports, (val)=> {
  bugReportsTable.value = val
})
setCurrentPageBreadcrumbs(t("bugReport"), [t("bugReport")]);

watch(
    () => [bugReportStore.pagination.currentPage, bugReportStore.pagination.currentSize],
    () => bugReportStore.loadBugReports()
);
</script>

<style>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
