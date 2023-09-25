<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("family") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->

    <!--begin::Tables Widget 9-->
    <div class="card">
      <!--begin::Header-->

      <!--end::Header-->

      <!--begin::Body-->
      <div class="card-body py-3">
        <!--begin::Table container-->
        <div class="table-responsive">
          <!--begin::Table-->
          <table
            class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
          >
            <!--begin::Table head-->
            <thead>
              <tr class="fw-bolder text-muted">
                <th class="min-w-150px">{{ $t("name") }}</th>
                <th class="min-w-140px">{{ $t("address") }}</th>
                <th class="min-w-120px">{{ $t("birthDate") }}</th>
                <th class="min-w-120px">{{ $t("phoneNumber") }}</th>
                <th class="min-w-100px text-end">{{ $t("actions") }}</th>
              </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
              <template
                v-for="(
                  item, index
                ) in regularUsersMangementStore.selectedFamilyParents"
                :key="index"
              >
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <span
                        v-if="item.isDisabled"
                        class="bullet bullet-vertical h-40px bg-danger"
                      ></span>
                      <span
                        v-else
                        class="bullet bullet-vertical h-40px bg-success"
                      ></span>
                      <div class="symbol symbol-45px me-5">
                        <img
                          src="https://via.placeholder.com/300x300/cccccc"
                          alt=""
                        />
                      </div>
                      <div class="d-flex justify-content-start flex-column">
                        <a
                          href="#"
                          class="text-dark fw-bolder text-hover-primary fs-6"
                        >
                          <ClippedText :text="item.fullName" />
                        </a>

                        <span
                          class="text-muted fw-bold text-muted d-block fs-7"
                        >
                          <!-- {{ item.gender }} -->
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary d-block fs-6"
                    >
                      <ClippedText :text="item.address" />
                    </a>
                  </td>

                  <td class="text-end">
                    <div class="d-flex flex-column w-100 me-2">
                      <div class="d-flex flex-stack mb-2">
                        {{ formatDate(item.birthDate) }}
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <div class="d-flex flex-column w-100 me-2">
                      <div class="d-flex flex-stack mb-2">
                        {{ item.otherPhone }}
                      </div>
                    </div>
                  </td>

                  <td class="text-end">
                    <div
                      target="#"
                      @click="usersMangementStore.selectUser(item)"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_notifications"
                    >
                      <NotificationsIcon />
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
            <!--end::Table body-->
          </table>
          <!--end::Table-->
        </div>
        <!--end::Table container-->
      </div>
      <!--begin::Body-->
    </div>
    <!--end::Tables Widget 9-->
  </div>

  <!-- start: children table -->
  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("children") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->

    <!-- start:parents table -->
    <div class="card-body pt-2">
      <!-- begin::table -->

      <div>
        <div class="d-flex gap-4 align-items-center"></div>
        <el-table
          :data="childrenTable"
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
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column
            prop="firstName"
            :label="$t('firstName')"
            width="200"
            align="center"
            header-align="center"
          >
            <template v-slot="scope: { row: User, $index: number }">
              <div class="text-gray-800 text-hover-primary fw-bolder fs-6">
                {{ scope.row.firstName }}
              </div>
              <span class="text-muted fw-bold d-block">
                {{
                  $t(
                    scope.row.gender === AppConstants.USER_GENDER.Male
                      ? "male"
                      : "female"
                  )
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="fatherName"
            :label="$t('fatherName')"
            width="200"
            align="center"
            header-align="center"
          >
            <template #default="scope: { $index: number, row: User }">
              <b> {{ scope.row.fatherName }}</b>
            </template>
          </el-table-column>
          <el-table-column
            prop="surName"
            :label="$t('surName')"
            width="100"
            align="center"
            header-align="center"
          />
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
            width="120"
            align="center"
            header-align="center"
          />
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
          />

          <el-table-column :label="$t('status')">
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
            :label="$t('actions')"
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
    </div>
    <!-- end:parents table -->
  </div>
  <!-- end: children table -->

  <!--end:List Widget 3-->
  <NotificationsModal
    @submit="notifyUser"
    ref="notifyUserModalRef"
  ></NotificationsModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { User } from "@/types/User";
import { formatDate } from "@/core/helpers/formatDate";
import { useRegularUsersStore } from "@/store/pinia_store/modules/RegularUsersModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Toaster from "@/core/services/Toaster";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import { useUsersStore } from "@/store/pinia_store/modules/UsersManagementModule";
import GenderBadge from "@/components/GenderBadge.vue";
import ClippedText from "@/components/ClippedText.vue";
import NotificationsIcon from "@/components/icons/NotificationsIcon.vue";
import NotificationsModal from "./NotificationsModal.vue";

const { t } = useI18n();
const regularUsersMangementStore = useRegularUsersStore();
const usersMangementStore = useUsersStore();

const notifyUserModalRef = ref<InstanceType<typeof NotificationsModal>>();

const route = useRoute();

const parentsTable = computed(
  () => regularUsersMangementStore.selectedFamilyParents
);

const childrenTable = computed(
  () => regularUsersMangementStore.selectedFamilyChildren
);

const formatter = (key: "createdAt" | "lastUpdated" | "birthDate") => {
  return (user: User) => formatDate(user[key]);
};

setCurrentPageBreadcrumbs(t("usersManagement"), [t("usersManagement")]);

setCurrentPageBreadcrumbs(t("usersManagement"), [t("usersManagement")]);

regularUsersMangementStore.geUserFamily(route.params.id as string);

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

const notifyUser = () => {
  console.log("notifyUser");
};
</script>
