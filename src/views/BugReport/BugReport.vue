<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">البلدان</h3>

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
        <div class="col-md-3 col-lg-2 col-7">

          <el-select v-model="bugReportStore.selectedBugCategory" clearable filterable>
            <el-option v-for="category in Object.values(BugStatusSearch).slice(0,Object.values(BugStatusSearch).length/2 )" :key="category" :value="BugStatusSearch[category]"
                       :label="category">
            </el-option>
          </el-select>

        </div>
      </div>



      <div v-loading="bugReportStore.dataIsLoading">
      <!-- begin::table -->
      <el-table :data="bugReportsTable" style="width: 100%" height="250">
        <!-- <el-table-column
          fixed
          prop="date"
          label="Date"
          width="150"
          style="direction: rtl"
        /> -->
        <el-table-column prop="title" :label="$t('title')" width="150" />
        <el-table-column
          prop="description"
          :label="$t('description')"
          width="150"
        />
        <el-table-column
          prop="bugResponse"
          :label="$t('bugResponse')"
          width="150"
        />
        <el-table-column
          prop="attachments"
          :label="$t('attachments')"
          width="150"
        >
          <template v-slot="scope: { row: BugReport, $index: number }">
            <div class="demo-image__preview">
              <el-image
                style="width: 40px; height: 40px"
                :src="scope.row.attachments?.[0] ?? ''"
                :zoom-rate="1.2"
                :preview-src-list="scope.row.attachments"
                :initial-index="4"
                fit="cover"
              />
            </div>
            <!-- <el-image
              v-if="scope.row.attachments.length > 0"
              style="width: 100px; height: 100px"
              :src="scope.row.attachments?.[0]"
              :zoom-rate="1.2"
              :preview-src-list="scope.row.attachments"
              :initial-index="4"
              fit="cover"
            />
            <span v-else>/</span> -->
          </template>
        </el-table-column>
        <el-table-column label="Status" width="120">
          <template v-slot="scope: { row: BugReport, $index: number }">
            <el-tag v-if="scope.row.issueStatus === 'Pending'">Pending</el-tag>
            <el-tag v-else type="danger">Closed</el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('edit')" width="150">
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

      <!-- start::pagination -->
      <el-pagination layout="prev, pager, next" :total="1000" />
      <!-- end::pagination -->
      </div>
    </div>
    <!--end::Body-->

    <!-- begin::dialog -->

    <!-- <el-dialog
      v-model="createBugReportDialogVisible"
      :title="$t('createBugReport')"
      destroy-on-close
      :show-close="false"
    >
      <UpdateBugReportModal
        @close="closeCreateBugReportDialog"
        @submit="createBugReport"
      />
    </el-dialog> -->
    <!-- end::dialog -->
    <!-- begin::dialog -->
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

const respondToBug = async (form: { response: string }) => {
  const success = await bugReportStore.respondToSelectedBug(form.response);
  if (success) {
    respondToBugDialogIsVisible.value = false;
    form.response = "";
  }
};

const openRespondToBugReportDialog = (bug: BugReport) => {
  if (bug.issueStatus === "Solved") return;

  respondToBugDialogIsVisible.value = true;
  bugReportStore.selectBugReportId(bug.id);
};
onMounted(()=> {
  bugReportStore.selectedBugCategory = 2
})

watch(()=> bugReportStore.selectedBugCategory,
    ()=> bugReportStore.loadBugReports())
setCurrentPageBreadcrumbs(t("bugReport"), [t("bugReport")]);
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
