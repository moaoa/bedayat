<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <!-- <h3 class="card-title fw-bolder text-dark">{{translate("pageHeader")}}</h3> -->
      <h3 class="card-title fw-bolder text-dark"></h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <div class="me-4">
          <!--begin::Menu-->
          <!-- <a
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
          </a> -->

          <!-- <Dropdown1></Dropdown1> -->
          <!--end::Menu-->
        </div>
        <!-- <a class="btn btn-icon btn-light-success btn-sm me-3">
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
        </a> -->
        <!-- 
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
        <Dropdown2></Dropdown2> -->
        <!--end::Menu-->
      </div>
    </div>
  </div>
  <!--end::Header-->

  <!--begin::Body-->
  <div class="card-body pt-2">
    <h4 class="text-gray-800 fw-bolder">{{ $t("welcomeToHomeScreen") }}</h4>

    <!-- <button class="btn btn-primary" @click="createCity">
        Add City {{ citiesStore.counter }}
      </button> -->
    <!--end::Body-->
  </div>
  <!--end:List Widget 3-->
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
// import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
// import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { MenuComponent } from "@/assets/ts/components/MenuComponent";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import i18n from "@/core/plugins/i18n";
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

onMounted(() => {
  MenuComponent.reInitialization();
  setCurrentPageBreadcrumbs(i18n.global.t("mainPage"), []);
});
</script>
