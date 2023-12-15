<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600  fw-bold py-4 fs-6 w-300px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item ">
      <div class="menu-content d-flex align-items-center">
        <!--begin::Avatar-->
        <div class="symbol symbol-50px me-5">
          <img
            v-if="authStore.user.imagePath"
            alt="Logo"
            :src="authStore.user.imagePath"
          />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bolder d-flex align-items-center fs-5">
            {{ authStore.user.name }}
          </div>
          <span class="fw-bold text-muted text-hover-primary fs-7 align-items-center">
            {{ authStore.email }}
          </span>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div
      class="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <span class="menu-link px-5">
        <span class="menu-title position-relative">
          Language
          <span
            class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"
          >
            <img
              class="w-15px h-15px rounded-1 ms-2"
              :src="langStore.langFlagPath"
              alt="metronic"
            />
            {{ langStore.langTitle }}
          </span>
        </span>
      </span>

      <!--begin::Menu sub-->
      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a class="menu-link d-flex px-5" @click="langStore.setLang('en')">
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="/media/flags/united-states.svg"
                alt="metronic"
              />
            </span>
            English
          </a>
        </div>
        <!--end::Menu item-->

        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a class="menu-link d-flex px-5" @click="langStore.setLang('ar')">
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="/media/flags/libya.svg"
                alt="metronic"
              />
            </span>
            العربية
          </a>
        </div>
        <!--end::Menu item-->

        <!--end::Menu item-->
      </div>
      <!--end::Menu sub-->
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <!-- <div class="menu-item px-5 my-1">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        Account Settings
      </router-link>
    </div> -->
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5">{{ i18n.global.t("signOut") }}  </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import { useLangStore } from "@/store/pinia_store/modules/LangModule";
import { useAuthenticationStore } from "@/store/pinia_store/modules/AuthModule";
import i18n from "@/core/plugins/i18n";
const langStore = useLangStore();

const router = useRouter();
const store = useStore();
const authStore = useAuthenticationStore();

const countries = {
  en: {
    flag: "/media/flags/united-states.svg",
    name: "English",
  },
  ar: {
    flag: "/media/flags/libya.svg",
    name: "العربية",
  },
};

const signOut = () => {
  store.dispatch(Actions.LOGOUT).then(() => router.push({ name: "sign-in" }));
};
</script>
