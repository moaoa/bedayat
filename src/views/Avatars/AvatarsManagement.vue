<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("avatar") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="
            () =>
              avatarsManagementStore.loadAvatars({
                currentPage: filters.currentPage,
                pageSize: filters.pageSize,
                roleType: filters.selectedRoleType,
              })
          "
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a
          href="#"
          class="btn btn-sm btn-primary mx-1"
          target="#"
          data-bs-toggle="modal"
          :data-bs-target="`#kt_modal_add_customer`"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("addAvatar") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <!-- begin::table -->

      <div>
        <div class="d-flex gap-4 align-items-center">
          <el-select
            style="width: 300px"
            v-model="filters.selectedRoleType"
            :placeholder="t('userRole')"
            clearable
          >
            <el-option
              :value="AppConstants.USER_ROLES.Admin"
              :label="$t('admin')"
            />
            <el-option
              :value="AppConstants.USER_ROLES.Child"
              :label="$t('child')"
            />
            <el-option
              :value="AppConstants.USER_ROLES.Parent"
              :label="$t('parent')"
            />
            <el-option
              :value="AppConstants.USER_ROLES.SchoolManager"
              :label="$t('schoolManager')"
            />
            <el-option
              :value="AppConstants.USER_ROLES.Teacher"
              :label="$t('teacher')"
            />
          </el-select>

          <div
            @click="
              () =>
                avatarsManagementStore.loadAvatars({
                  currentPage: filters.currentPage,
                  pageSize: filters.pageSize,
                  roleType: filters.selectedRoleType,
                })
            "
          >
            <a class="btn btn-sm btn-primary mx-1">
              {{ $t("search") }}
            </a>
          </div>
        </div>
        <el-table
          :data="dataTable"
          height="400"
          table-layout="fixed"
          v-loading="avatarsManagementStore.dataIsLoading"
        >
          <el-table-column
            index="scope.$index"
            :label="t('noNumber')"
            width="55"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: Avatar, $index: number }">
              <div
                class="d-flex align-items-center gap-3 justify-content-between"
              >
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :label="t('avatar')"
            width="200"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: Avatar, $index: number }">
              <div
                class="d-flex align-items-center gap-3 justify-content-between"
              >
                <img
                  style="width: 100%"
                  height="300"
                  class="object-fit-contain justify-content-center"
                  :src="scope.row.avatarPath"
                  loading="eager"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('edit')"
            width="90"
            align="center"
            header-align="center"
          >
            <template #default="scope">
              <a
                class="btn btn-icon btn-light-success btn-sm"
                @click="selectAvatar(scope.row)"
                data-bs-toggle="modal"
                :data-bs-target="`#update_user_modal`"
              >
                <i class="bi bi-pencil"></i>
              </a>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('delete')"
            width="90"
            align="center"
            header-align="center"
          >
            <template #default="scope">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                @click="selectAvatar(scope.row)"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete`"
              >
                <i class="bi bi-trash"></i>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- end::table -->

      <br />
      <!-- start::pagination -->
      <!-- <el-pagination
        v-if="!avatarsManagementStore.dataIsLoading"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="avatarsManagementStore.pagination.total"
        v-model:current-page="filters.currentPage"
        v-model:page-size="filters.pageSize"
        :page-sizes="[25, 100, 200, 300, 400]"
      /> -->
      <!-- end::pagination -->
    </div>

    <AddAvatarModal
      @submit="createAvatar"
      ref="addAvatarModalRef"
    ></AddAvatarModal>

    <UpdateAvatarModal @submit="updateAvatar" ref="updateAvatarModalRef" />
    <DeleteAvatarModal @deleted="deleteItem" ref="deleteModal" />
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Avatar, NewAvatarData } from "@/types/Avatar";
import { useAvatarsStore } from "@/store/pinia_store/modules/AvatarsManagementModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import AddAvatarModal from "@/views/Avatars/AddAvatarModal.vue";
import UpdateAvatarModal from "./UpdateAvatarModal.vue";
import Toaster from "@/core/services/Toaster";
import { hideModal } from "@/core/helpers/dom";
import { ElSelect } from "element-plus";
import debounce from "lodash/debounce";
import { useUrlSearchParams } from "@vueuse/core";
import DeleteAvatarModal from "@/views/Avatars/DeleteModal.vue";
import { AppConstants } from "@/core/constants/ApplicationsConstants";

const { t } = useI18n();
const avatarsManagementStore = useAvatarsStore();

const addAvatarModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const updateAvatarModalRef = ref<{ modalRef: HTMLElement } | null>(null);

const dataTable = computed(() => avatarsManagementStore.avatars);

const deleteModal = ref<{ modalRef: HTMLElement } | null>(null);

const filters = useUrlSearchParams<{
  currentPage: number;
  pageSize: number;
  selectedRoleType: number | null;
}>("history", {
  initialValue: {
    currentPage: 1,
    pageSize: 25,
    selectedRoleType: null,
  },
});

filters.currentPage = Number(filters.currentPage ?? 1);
filters.pageSize = Number(filters.pageSize ?? 25);
filters.selectedRoleType = filters.selectedRoleType
  ? Number(filters.selectedRoleType)
  : null;

const createAvatar = async (data: NewAvatarData) => {
  try {
    await avatarsManagementStore.createNewItem(data);

    if (addAvatarModalRef.value) {
      hideModal(addAvatarModalRef.value.modalRef);
    }
  } catch (error) {
    console.log(error);
  }
};

const selectAvatar = (item: Avatar) => {
  avatarsManagementStore.selectItem(item);
};

const updateAvatar = async (data: NewAvatarData) => {
  try {
    await avatarsManagementStore.updateItem(data);

    if (updateAvatarModalRef.value) {
      hideModal(updateAvatarModalRef.value.modalRef);
    }

    avatarsManagementStore.unselectItem();

    Toaster.Success(t("success"), t("updatedSuccessfully"));
  } catch (error) {
    console.log(error);
  }
};

setCurrentPageBreadcrumbs(t("usersManagement"), [t("admins")]);

setCurrentPageBreadcrumbs(t("avatar"), [t("avatar")]);

avatarsManagementStore.loadAvatars({
  currentPage: filters.currentPage,
  pageSize: filters.pageSize,
  roleType: filters.selectedRoleType,
});

const deleteItem = async () => {
  try {
    hideModal(deleteModal.value!.modalRef);
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => [filters.selectedRoleType, filters.currentPage, filters.pageSize],
  () => {
    avatarsManagementStore.loadAvatars({
      currentPage: filters.currentPage,
      pageSize: filters.pageSize,
      roleType: filters.selectedRoleType,
    });
  }
);
</script>

<style>
.el-table tr.danger-row {
  background-color: rgba(255, 0, 0, 0.261);
}
.el-table td.is-hidden,
.el-table th.is-hidden {
  display: none !important;
}
.el-table td.is-hidden {
  display: none !important;
}
</style>
