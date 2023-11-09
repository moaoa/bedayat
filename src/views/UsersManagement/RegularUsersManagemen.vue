<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("usersManagement") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->
        <div class="card-toolbar">
          <ul class="nav">
            <li
              class="nav-item"
              @click="() => selectUserType(userRoles.Parent)"
            >
              <a
                class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bolder px-4 me-1"
                data-bs-toggle="tab"
                href="#kt_table_widget_6_tab_1"
              >
                {{ $t("parents") }}
              </a>
            </li>

            <li class="nav-item" @click="() => selectUserType(userRoles.Child)">
              <a
                class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4 me-1"
                data-bs-toggle="tab"
                href="#kt_table_widget_6_tab_2"
              >
                {{ $t("children") }}
              </a>
            </li>

            <li
              class="nav-item"
              @click="() => selectUserType(userRoles.Teacher)"
            >
              <a
                class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4"
                data-bs-toggle="tab"
                href="#kt_table_widget_6_tab_3"
              >
                {{ $t("teacher") }}
              </a>
            </li>
          </ul>
        </div>

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
            style="max-width: 200px"
            v-model="filterBy"
            class="flex-grow-1"
          >
            <el-option
              :value="FilterByOptions.Name"
              :label="$t('searchByName')"
            >
            </el-option>
            <el-option
              :value="FilterByOptions.PhoneNumber"
              :label="$t('searchByPhoneNumber')"
            >
            </el-option>
            <el-option :value="FilterByOptions.Email" :label="$t('email')">
            </el-option>
            <el-option :value="FilterByOptions.ALL" :label="$t('all')">
            </el-option>
          </el-select>
          <el-select
            style="max-width: 250px"
            v-model="userState"
            class="flex-grow-1"
          >
            <el-option
              :value="AppConstants.USER_STATE.All"
              :label="$t('all')"
            />
            <el-option
              :value="AppConstants.USER_STATE.Active"
              :label="$t('active')"
            />
            <el-option
              :value="AppConstants.USER_STATE.InActive"
              :label="$t('inactive')"
            />
          </el-select>

          <el-input
            v-model="searchValue"
            class="flex-grow-1"
            style="max-width: 300px"
            :placeholder="$t('search')"
            @keyup.enter="handleLoadUser"
          />

          <div @click="handleLoadUser">
            <a class="btn btn-sm btn-primary mx-1">
              {{ $t("search") }}
            </a>
          </div>
        </div>
        <el-table
          :data="usersTable"
          height="400"
          v-loading="regularUsersMangementStore.dataIsLoading"
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
              <ClippedText :text="scope.row.fullName" />
            </template>
          </el-table-column>

          <el-table-column
            prop="gender"
            :label="$t('gender')"
            width="200"
            align="center"
            header-align="center"
          >
            <template #default="scope: { $index: number, row: User }">
              <GenderBadge :gender="scope.row.gender" />
            </template>
          </el-table-column>

          <el-table-column
            prop="otherPhone"
            :label="$t('phone')"
            width="120"
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
            <template
              #default="scope: { row: User, $index: number }"
              :length="1"
            >
              <ClippedText :text="scope.row.address" />
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

          <!-- <el-table-column
            prop="createdAt"
            :label="$t('createdAt')"
            width="120"
            :formatter="formatter('createdAt')"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="lastUpdated"
            :label="$t('lastUpdated')"
            width="120"
            :formatter="formatter('lastUpdated')"
            align="center"
            header-align="center"
          /> -->

          <!-- <el-table-column width="100" :label="$t('status')">
            <template v-slot="scope: { row: User, $index: number }">
              <span
                v-if="scope.row.isDisabled"
                class="badge fs-8 fw-bolder"
                :class="`badge-light-danger`"
              >
                {{ $t("inactive") }}
              </span>
              <span
                v-else
                class="badge fs-8 fw-bolder"
                :class="`badge-light-success`"
              >
                {{ $t("active") }}
              </span>
            </template>
          </el-table-column> -->

          <el-table-column
            v-if="
              regularUsersMangementStore.selectedUserType !== userRoles.Teacher
            "
            :label="$t('family')"
            width="90"
            align="center"
          >
            <template v-slot="scope: { row: User, $index: number }">
              <RouterLink
                :to="{
                  name: 'FamilyMembers',
                  params: { id: scope.row.id },
                }"
              >
                <UserIcon />
              </RouterLink>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('edit')"
            width="90"
            align="center"
            header-align="center"
          >
            <template #default="scope: { row: User, $index: number }">
              <div class="flex">
                <el-switch
                  v-model="scope.row.isDisabled"
                  :loading="usersMangementStore.isSwitchingUserStatus"
                  :active-action-icon="CheckIcon"
                  :inactive-action-icon="CrossIcon"
                  :active-value="false"
                  :inactive-value="true"
                  :before-change="() => handleToggleUser(scope.row)"
                />
              </div>
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
                @click="usersMangementStore.selectUser(scope.row)"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_notifications"
              >
                <NotificationsIcon />
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
          !regularUsersMangementStore.dataIsLoading &&
          !regularUsersMangementStore.errorLoadingData
        "
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="regularUsersMangementStore.pagination.total"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        v-model:pager-count="pagination.pagerCount"
        :page-sizes="[25, 100, 200, 300, 400]"
      />
      <!-- end::pagination -->
    </div>
  </div>
  <!--end:List Widget 3-->
  <NotificationsModal
    @submit="notifyUser"
    ref="notifyUserModalRef"
  ></NotificationsModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { User } from "@/types/User";
import { formatDate } from "@/core/helpers/formatDate";
import { useRegularUsersStore } from "@/store/pinia_store/modules/RegularUsersModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Toaster from "@/core/services/Toaster";
import { ElSelect, ElOption } from "element-plus";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import { useUsersStore } from "@/store/pinia_store/modules/UsersManagementModule";
import GenderBadge from "@/components/GenderBadge.vue";
import debounce from "lodash/debounce";
import ClippedText from "@/components/ClippedText.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import NotificationsModal from "@/views/Notifications/NotificationsModal.vue";
import NotificationsIcon from "@/components/icons/NotificationsIcon.vue";
import { useNotificationsStore } from "@/store/pinia_store/modules/NotificationsModule";
import { hideModal } from "@/core/helpers/dom";
import { NotificationForm } from "@/types/Notifications";
import { useUrlSearchParams } from "@vueuse/core";

const { t } = useI18n();
const regularUsersMangementStore = useRegularUsersStore();
const usersMangementStore = useUsersStore();

const FilterByOptions = AppConstants.FILTER_USER_BY_OPTIONS;
const userRoles = AppConstants.USER_ROLES;

const usersTable = computed(() => regularUsersMangementStore.users);

const searchValue = ref("");
const notifyUserModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const filterBy = ref(FilterByOptions.Name);
const pagination = useUrlSearchParams<{
  currentPage: number;
  pageSize: number;
  pagerCount;
}>("history", {
  initialValue: {
    currentPage: 1,
    pageSize: 25,
    pagerCount: 1,
  },
});

pagination.currentPage = Number(pagination.currentPage ?? 1);
pagination.pageSize = Number(pagination.pageSize ?? 25);
pagination.pagerCount = Number(pagination.pagerCount ?? 1);

const userState = ref(AppConstants.USER_STATE.All);

const notificationsStore = useNotificationsStore();

const formatter = (key: "createdAt" | "lastUpdated" | "birthDate") => {
  return (user: User) => formatDate(user[key]);
};

setCurrentPageBreadcrumbs(t("usersManagement"), [t("usersManagement")]);

setCurrentPageBreadcrumbs(t("usersManagement"), [t("usersManagement")]);

const handleLoadUser = () => {
  try {
    regularUsersMangementStore.loadUsers(
      filterBy.value,
      searchValue.value,
      userState.value
    );
  } catch (error) {
    console.log(error);
  }
};

const notifyUser = (data: NotificationForm) => {
  if (notifyUserModalRef.value) {
    const payload = {
      ...data,
      image: data.image!,
      users: [usersMangementStore.selectedUser!.id],
    };
    notificationsStore.sendNotification(payload);
    hideModal(notifyUserModalRef.value.modalRef);
  }
};

const handleToggleUser = async (user: User) => {
  try {
    await usersMangementStore.toggleUserStatus(user);
    Toaster.Success("Success", "sucess");
    return true;
  } catch (error) {
    Toaster.error("Error", "Error");
    return false;
  }
};

const selectUserType = (userType: number) => {
  regularUsersMangementStore.selectedUserType = userType;
};

const loadUsersDebounced = debounce(
  (...args: [any, any, any]) => regularUsersMangementStore.loadUsers(...args),
  1000
);

watch(
  () => searchValue.value,
  (newValue) => {
    loadUsersDebounced(filterBy.value, newValue, userState.value);
  }
);

watch(
  () => [
    filterBy.value,
    userState.value,
    regularUsersMangementStore.selectedUserType,
  ],
  () => {
    handleLoadUser();
  }
);

handleLoadUser();
</script>

<style>
/* .el-table tr.danger-row {
  background-color: rgba(255, 0, 0, 0.261);
} */
</style>
