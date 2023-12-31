<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("usersManagement") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="
            () =>
              usersManagementStore.loadAdmins({
                currentPage: pagination.currentPage,
                pageSize: pagination.pageSize,
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
          {{ $t("addUser") }}
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
            style="width: 250px"
            v-model="usersManagementStore.filterBy"
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
          </el-select>

          <el-input
            v-model="usersManagementStore.searchValue"
            :placeholder="$t('search')"
            style="width: 300px"
            @keyup.enter="
              () =>
                usersManagementStore.loadAdmins({
                  currentPage: pagination.currentPage,
                  pageSize: pagination.pageSize,
                })
            "
          />

          <div
            @click="
              () =>
                usersManagementStore.loadAdmins({
                  currentPage: pagination.currentPage,
                  pageSize: pagination.pageSize,
                })
            "
          >
            <a class="btn btn-sm btn-primary mx-1">
              {{ $t("search") }}
            </a>
          </div>
        </div>
        <el-table
          :data="usersTable"
          height="400"
          v-loading="usersManagementStore.dataIsLoading"
        >
          <el-table-column
            index="scope.$index"
            :label="t('noNumber')"
            width="55"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: User, $index: number }">
              <div
                class="d-flex align-items-center gap-3 justify-content-between"
              >
                <span
                  v-if="scope.row.isDisabled"
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

          <el-table-column
            :label="$t('name')"
            width="200"
            align="center"
            header-align="center"
          >
            <template v-slot="scope: { row: User, $index: number }">
              <ClippedText :text="scope.row.fullName ?? ''" />
            </template>
          </el-table-column>

          <el-table-column
            prop="phoneNumber"
            :label="$t('phoneNumber')"
            width="200"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="address"
            :label="$t('address')"
            width="200"
            align="center"
            header-align="center"
          >
            <template #default="scope: { $index: number, row: User }">
              <ClippedText :text="scope.row.address ?? ''" />
            </template>
          </el-table-column>
          <el-table-column
            prop="birthDate"
            :label="$t('birthDate')"
            width="120"
            :formatter="formatter('birthDate')"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="gender"
            :label="$t('gender')"
            width="120"
            align="center"
            header-align="center"
          >
            <template v-slot="scope: { $index: number, row: User }">
              <GenderBadge :gender="scope.row.gender" />
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
                @click="selectUser(scope.row)"
                data-bs-toggle="modal"
                :data-bs-target="`#update_user_modal`"
              >
                <i class="bi bi-pencil"></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('notify')"
            width="90"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: User, $index: number }">
              <div
                target="#"
                @click="usersManagementStore.selectUser(scope.row)"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_notifications"
              >
                <NotificationsIcon />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('status')"
            width="90"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: User, $index: number }">
              <div class="flex">
                <el-switch
                  v-model="scope.row.isDisabled"
                  :loading="usersManagementStore.isSwitchingUserStatus"
                  :active-action-icon="CheckIcon"
                  :inactive-action-icon="CrossIcon"
                  :active-value="false"
                  :inactive-value="true"
                  :before-change="() => handleToggleUser(scope.row)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- end::table -->

      <br />
      <!-- start::pagination -->
      <el-pagination
        v-if="
          !usersManagementStore.dataIsLoading &&
          !usersManagementStore.errorLoadingData
        "
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersManagementStore.pagination.total"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[25, 100, 200, 300, 400]"
      />
      <!-- end::pagination -->
    </div>

    <AddUserModal @submit="createUser" ref="addUserModalRef"></AddUserModal>

    <UpdateUserModal @submit="updateUser" ref="updateUserModalRef" />

    <NotificationsModal
      @submit="notifyUser"
      ref="notifyUserModalRef"
    ></NotificationsModal>
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { User, NewUserData } from "@/types/User";
import { formatDate } from "@/core/helpers/formatDate";
import { useUsersStore } from "@/store/pinia_store/modules/UsersManagementModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import AddUserModal from "@/views/UsersManagement/AddUserModal.vue";
import UpdateUserModal from "./UpdateUserModal.vue";
import Toaster from "@/core/services/Toaster";
import { hideModal } from "@/core/helpers/dom";
import { ElSelect, ElOption } from "element-plus";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import GenderBadge from "@/components/GenderBadge.vue";
import debounce from "lodash/debounce";
import ClippedText from "@/components/ClippedText.vue";
import NotificationsModal from "@/views/Notifications/NotificationsModal.vue";
import NotificationsIcon from "@/components/icons/NotificationsIcon.vue";
import { NotificationForm } from "@/types/Notifications";
import { useNotificationsStore } from "@/store/pinia_store/modules/NotificationsModule";
import { useUrlSearchParams } from "@vueuse/core";

const { t } = useI18n();
const usersManagementStore = useUsersStore();
const notificationsStore = useNotificationsStore();

const addUserModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const updateUserModalRef = ref<{ modalRef: HTMLElement } | null>(null);

const FilterByOptions = AppConstants.FILTER_ADMIN_BY_OPTIONS;

const usersTable = computed(() => usersManagementStore.users);

const notifyUserModalRef = ref<{ modalRef: HTMLElement } | null>(null);

const pagination = useUrlSearchParams<{
  currentPage: number;
  pageSize: number;
}>("history", {
  initialValue: {
    currentPage: 1,
    pageSize: 25,
  },
});

pagination.currentPage = Number(pagination.currentPage ?? 1);
pagination.pageSize = Number(pagination.pageSize ?? 25);

const createUser = async (data: NewUserData) => {
  try {
    await usersManagementStore.createNewItem(data);

    if (addUserModalRef.value) {
      hideModal(addUserModalRef.value.modalRef);
    }
  } catch (error) {
    console.log(error);
  }
};

const notifyUser = (data: NotificationForm) => {
  if (notifyUserModalRef.value) {
    const payload = {
      ...data,
      image: data.image!,
      users: [usersManagementStore.selectedUser!.id],
    };
    notificationsStore.sendNotification(payload);
    hideModal(notifyUserModalRef.value.modalRef);
  }
};

const selectUser = (user: User) => {
  usersManagementStore.selectUser(user);
};

const updateUser = async (data: Omit<NewUserData, "email" | "password">) => {
  try {
    await usersManagementStore.updateItem(data);

    if (updateUserModalRef.value) {
      hideModal(updateUserModalRef.value.modalRef);
    }

    usersManagementStore.unselectUser();

    Toaster.Success(t("operationDone"), t("upatedItemSuccessfully"));
  } catch (error) {
    console.log(error);
  }
};
const formatter = (key: "createdAt" | "lastUpdated" | "birthDate") => {
  return (user: User) => formatDate(user[key] ?? "");
};

setCurrentPageBreadcrumbs(t("usersManagement"), [t("admins")]);

setCurrentPageBreadcrumbs(t("usersManagement"), [t("admins")]);

usersManagementStore.loadAdmins({
  currentPage: pagination.currentPage,
  pageSize: pagination.pageSize,
});

const loadUsersDebounced = debounce(
  (currentPage: number, pageSize: number) =>
    usersManagementStore.loadUsers({ currentPage, pageSize }),
  1000
);

const handleToggleUser = async (user: User) => {
  try {
    await usersManagementStore.toggleUserStatus(user);
    Toaster.Success("Success", "Success");
    return true;
  } catch (error) {
    return false;
  }
};

watch(
  () => [
    usersManagementStore.searchValue,
    usersManagementStore.filterBy,
    pagination.currentPage,
    pagination.pageSize,
  ],
  () => {
    loadUsersDebounced(pagination.currentPage, pagination.pageSize);
  }
);
</script>

<style>
.el-table tr.danger-row {
  background-color: rgba(255, 0, 0, 0.261);
}
/*.el-table td.is-hidden > *,
.el-table th.is-hidden > * {
  visibility: visible !important;
}*/
.el-table td.is-hidden,
.el-table th.is-hidden {
  display: none !important;
}
.el-table td.is-hidden {
  display: none !important;
}
</style>
