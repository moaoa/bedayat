<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">
        {{ t("notificationsManagement") }}
      </h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a class="btn btn-icon btn-light-primary btn-sm me-3" @click="getUsers">
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a
          href="#"
          class="btn btn-sm btn-primary mx-1"
          target="#"
          data-bs-toggle="modal"
          :data-bs-target="`#kt_modal_notifications`"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("sendNotification") }}
        </a>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <!-- begin::table -->

      <div>
        <div class="row">
          <div class="col-md-4 mb-6">
            <label>{{ $t("users") }}</label>
            <br />
            <el-select
              style="width: 250px"
              v-model="filters.notificationTarget"
              filterable
            >
              <el-option
                :value="AppConstants.NOTIFICATION_TARGETS.Users"
                :label="$t('users')"
              />
              <el-option
                :value="AppConstants.NOTIFICATION_TARGETS.CountriesAndCities"
                :label="$t('countriesAndCities')"
              />
              <el-option
                :value="AppConstants.NOTIFICATION_TARGETS.Families"
                :label="$t('family')"
              />
              <el-option
                :value="AppConstants.NOTIFICATION_TARGETS.Courses"
                :label="$t('courses')"
              />
            </el-select>
          </div>
          <div class="col-md-4 mb-6">
            <label>{{ $t("country") }}</label>
            <br />
            <el-select
              style="width: 250px"
              v-model="filters.countryId"
              filterable
              clearable
              :placeholder="$t('country')"
            >
              <el-option
                v-for="country in countriesStore.countries"
                :label="country.name"
                :value="country.id"
                :key="country.id"
              />
            </el-select>
          </div>

          <div class="col-md-4 mb-6">
            <label>{{ $t("city") }}</label>
            <br />
            <el-select
              style="width: 250px"
              v-model="filters.cityId"
              filterable
              clearable
              :placeholder="$t('city')"
              v-loading="citiesStore.dataIsLoading"
            >
              <el-option
                v-for="city in citiesStore.cities"
                :label="city.name"
                :value="city.id"
                :key="city.id"
              />
            </el-select>
          </div>

          <div class="col-md-4 mb-6">
            <label>{{ $t("locality") }}</label>
            <br />
            <el-select
              style="width: 250px"
              v-model="filters.localityId"
              filterable
              clearable
              :placeholder="$t('locality')"
              v-loading="localitiesStore.dataIsLoading"
            >
              <el-option
                v-for="locality in localitiesStore.localities"
                :label="locality.name"
                :value="locality.id"
                :key="locality.id"
              />
            </el-select>
          </div>
          <div class="col-md-4 mb-6">
            <label>{{ $t("package") }}</label>
            <br />
            <el-select
              style="width: 250px"
              v-model="filters.packageId"
              filterable
              clearable
              :placeholder="$t('package')"
              v-loading="coursesStore.dataIsLoading"
            >
              <el-option
                v-for="item in coursesStore.packages.results"
                :label="item.title"
                :value="item.id"
                :key="item.id"
              />
            </el-select>
          </div>
          <div class="col-md-4 mb-6">
            <label>{{ $t("userRole") }}</label>
            <br />
            <el-select
              style="width: 250px"
              v-model.number="filters.roleType"
              :placeholder="$t('locality')"
              v-loading="localitiesStore.dataIsLoading"
            >
              <el-option
                :label="$t('parent')"
                :value="AppConstants.USER_ROLES.Parent"
              />
              <el-option
                :label="$t('admin')"
                :value="AppConstants.USER_ROLES.Admin"
              />
              <el-option
                :label="$t('teacher')"
                :value="AppConstants.USER_ROLES.Teacher"
              />
              <el-option
                :label="$t('child')"
                :value="AppConstants.USER_ROLES.Child"
              />
              <el-option
                :label="$t('schoolManager')"
                :value="AppConstants.USER_ROLES.SchoolManager"
              />
            </el-select>
          </div>

          <div class="col-md-4 mb-6">
            <label>{{ $t("search") }}</label>
            <br />
            <el-input
              v-model="filters.searchContent"
              :placeholder="$t('search')"
              style="width: 250px"
            />
          </div>
          <div class="col-md-4 mb-6" @click="getUsers">
            <a class="btn btn-sm btn-primary mx-1">
              {{ $t("search") }}
            </a>
          </div>
        </div>
        <el-table
          :data="usersTable"
          height="400"
          v-loading="notificationsStore.dataIsLoading"
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
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
            :label="$t('email')"
            width="250"
            align="center"
            header-align="center"
          >
            <template v-slot="scope: { row: User, $index: number }">
              <ClippedText :text="scope.row.email" :length="40" />
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
            prop="birthDate"
            :label="$t('birthDate')"
            width="120"
            :formatter="formatter('birthDate')"
            align="center"
            header-align="center"
          />
        </el-table>
      </div>
      <!-- end::table -->

      <br />
    </div>

    <NotificationsModal
      @submit="notifyUser"
      ref="notifyUserModalRef"
    ></NotificationsModal>
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  User,
  NotificationFilters,
  NotificationForm,
} from "@/types/Notifications";
import { formatDate } from "@/core/helpers/formatDate";
import { useNotificationsStore } from "@/store/pinia_store/modules/NotificationsModule";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
// import Toaster from "@/core/services/Toaster";
import { hideModal } from "@/core/helpers/dom";
import { ElSelect, ElOption } from "element-plus";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import ClippedText from "@/components/ClippedText.vue";
import NotificationsModal from "./NotificationsModal.vue";
import { useUrlSearchParams } from "@vueuse/core";
import { watch } from "vue";
import { useCountriesStore } from "@/store/pinia_store/modules/CountriesModule";
import { useCitiesStore } from "@/store/pinia_store/modules/CitiesModule";
import { useLocalitiesStore } from "@/store/pinia_store/modules/LocalitiesModule";
import { useCoursesStore } from "@/store/pinia_store/modules/CoursesModule";

const { t } = useI18n();
const notificationsStore = useNotificationsStore();
const countriesStore = useCountriesStore();
const citiesStore = useCitiesStore();
const localitiesStore = useLocalitiesStore();
const coursesStore = useCoursesStore();

const multipleTableRef = ref<HTMLElement | null>(null);

const filters = useUrlSearchParams<NotificationFilters>("history", {
  initialValue: {
    searchContent: "",
    notificationTarget: AppConstants.NOTIFICATION_TARGETS.Users,
    roleType: AppConstants.USER_ROLES.Parent as number,
    countryId: "",
    cityId: "",
    localityId: "",
    packageId: "",
  },
});

filters.notificationTarget = Number(filters.notificationTarget);
filters.roleType = Number(filters.roleType);

const usersTable = computed(() => notificationsStore.users);

const multipleSelection = ref<User[]>([]);

const notifyUserModalRef = ref<{ modalRef: HTMLElement } | null>(null);

const getUsers = async () => {
  notificationsStore.loadUsers(filters);
};

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const notifyUser = (data: NotificationForm) => {
  if (notifyUserModalRef.value) {
    const payload = {
      ...data,
      image: data.image!,
      users: multipleSelection.value.map((user) => user.userId),
    };
    notificationsStore.sendNotification(payload);
    // hideModal(notifyUserModalRef.value.modalRef);
  }
};

const formatter = (key: "createdAt" | "lastUpdated" | "birthDate") => {
  return (user: User) => formatDate(user[key]);
};

setCurrentPageBreadcrumbs(t("notifications"), [t("notifications")]);

getUsers();
countriesStore.loadCountries();
coursesStore.loadAllPackages({ pageSize: 1000, pageNumber: 1 });

watch(
  () => filters.notificationTarget,
  () => {
    getUsers();
  }
);

watch(
  () => filters.countryId,
  () => {
    if (!filters.countryId) {
      return;
    }
    citiesStore.loadCities(filters.countryId, "");
  },
  { immediate: true }
);

watch(
  () => filters.cityId,
  () => {
    if (!filters.cityId) {
      return;
    }
    localitiesStore.loadLocalities(filters.cityId);
  },
  { immediate: true }
);
</script>

<style>
.el-table tr.danger-row {
  background-color: rgba(255, 0, 0, 0.261);
}
el-table td.is-hidden,
.el-table th.is-hidden {
  display: none !important;
}
.el-table td.is-hidden {
  display: none !important;
}
</style>
