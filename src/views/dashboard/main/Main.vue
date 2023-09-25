<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <!-- <h3 class="card-title fw-bolder text-dark">{{translate("pageHeader")}}</h3> -->
      <h3 class="card-title fw-bolder text-dark">translate("pageHeader")</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <div class="me-4">
          <!--begin::Menu-->
          <a
            href="#"
            class="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <span class="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
              <inline-svg src="/media/icons/duotune/general/gen031.svg" />
            </span>
            Filter
          </a>

          <Dropdown1></Dropdown1>
          <!--end::Menu-->
        </div>
        <a class="btn btn-icon btn-light-success btn-sm me-3">
          <i class="bi bi-file-earmark-arrow-up fs-4"></i>
        </a>
        <a
          href="#"
          class="btn btn-sm btn-light-primary mx-1"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_invite_friends"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          New Member
        </a>

        <a
          href="#"
          class="btn btn-sm btn-light-primary mx-1"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_invite_friends"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          New Member
        </a>

        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="/media/icons/duotune/general/gen024.svg" />
          </span>
        </button>
        <Dropdown2></Dropdown2>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <div
        class="
          notice
          d-flex
          bg-light-warning
          rounded
          border-warning border border-dashed
          mb-9
          p-6
        "
      >
        <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
          <inline-svg src="/media/icons/duotune/general/gen044.svg" />
        </span>
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="fw-bold">
            <h4 class="text-gray-800 fw-bolder">{{ $t("pageHeader") }}</h4>
            <div class="fs-6 text-gray-600">
              Updating address may affter to your
              <a href="#">Tax Location</a>
            </div>
          </div>
          <!--end::Content-->
        </div>
        <!--end::Wrapper-->
      </div>

      <!-- <button class="btn btn-primary" @click="createCity">
        Add City {{ citiesStore.counter }}
      </button> -->
      <table>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>CountryId</td>
        </tr>

        <!-- <tr v-for="item in citiesStore.items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.countryId }}</td>
        </tr> -->
      </table>
    </div>
    <!--end::Body-->
  </div>
  <!--end:List Widget 3-->
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { MenuComponent } from "@/assets/ts/components/MenuComponent";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
// import { City, useCitiesStore } from "@/store/pinia_store/modules/CitiesModule";
// import { useI18n } from "vue-i18n";
// const { t, te } = useI18n();

// import { useI18n } from "vue-i18n";
// const i18n = useI18n();

// import { useI18n } from "vue-i18n";

// const { t } = useI18n({ useScope: "global" });
// const {t} = useI18n({})

// const translate = (text) => {
//   if (te(text)) {
//     return t(text);
//   } else {
//     return text;
//   }
// };
// let citiesStore = useCitiesStore();

const createCity = function () {
  // citiesStore.Inc();
  // citiesStore.createNewItem(new City("1", "tripoly", "1"));
  // citiesStore.createNewItem(new City("2", "Sebha", "1"));
  // citiesStore.createNewItem(new City("3", "Cairo", "2"));
  // citiesStore.createNewItem(new City("3", "Cairo", "2"));
  // citiesStore.SelectCity(citiesStore.items[0])
};

onMounted(() => {
  MenuComponent.reInitialization();
  setCurrentPageBreadcrumbs("pageHeader", ["Ss", "ss"]);
  // console.log(i18n.t('pageHeader'));
});
</script>
