<template>
  <!--begin::Menu wrapper-->
  <div
    class="header-menu align-items-stretch"
    data-kt-drawer="true"
    data-kt-drawer-name="header-menu"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
    data-kt-place="true"
    data-kt-place-mode="prepend"
    data-kt-place-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
  >
    <!--begin::Menu-->
    <div
      class="
        menu
        menu-lg-rounded
        menu-column
        menu-lg-row
        menu-state-bg
        menu-title-gray-700
        menu-state-title-primary
        menu-state-icon-primary
        menu-state-bullet-primary
        menu-arrow-gray-400
        fw-bold
        my-5 my-lg-0
        align-items-stretch
      "
      id="#kt_header_menu"
      data-kt-menu="true"
    >
      <div
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-start"
        class="menu-item menu-lg-down-accordion me-lg-1"
      >
        <span class="menu-link py-3">
          <span class="menu-title fs-5">{{ translate("pageHeader") }}</span>
          <span class="menu-arrow d-lg-none"></span>
        </span>
      </div>
    </div>
    <div
      class="
        menu
        menu-lg-rounded
        menu-column
        menu-lg-row
        menu-state-bg
        menu-title-gray-700
        menu-state-title-primary
        menu-state-icon-primary
        menu-state-bullet-primary
        menu-arrow-gray-400
        fw-bold
        my-5 my-lg-0
        align-items-stretch
      "
      id="#kt_header_menu"
      data-kt-menu="true"
    >
<!--      <div-->
<!--        data-kt-menu-trigger="click"-->
<!--        data-kt-menu-placement="bottom-start"-->
<!--        class="menu-item menu-lg-down-accordion me-lg-1"-->
<!--      >-->
<!--        <span class="menu-link py-3">-->
<!--          <span class="menu-title fs-5">-->
<!--            &lt;!&ndash; <inline-svg src="/media/svg/lang.svg" /> &ndash;&gt;-->
<!--            <el-menu-->
<!--              :default-active="activeIndex"-->
<!--              class="el-menu-demo"-->
<!--              active-text-color="#ffd04b"-->
<!--              mode="horizontal"-->
<!--              @select="handleSelect"-->
<!--            >-->
<!--              <el-submenu index="1">-->
<!--                <template #title>lang</template>-->
<!--                <el-menu-item index="2-1" @click="langStore.setLang('ar')">-->
<!--                  العربية-->
<!--                </el-menu-item>-->
<!--                <el-menu-item index="2-2" @click="langStore.setLang('en')">-->
<!--                  English-->
<!--                </el-menu-item>-->
<!--              </el-submenu>-->
<!--            </el-menu>-->
<!--          </span>-->
<!--          <span class="menu-arrow d-lg-none"></span>-->
<!--        </span>-->
<!--      </div>-->
    </div>
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { MenuComponent } from "@/assets/ts/components";
import { useLangStore } from "@/store/pinia_store/modules/LangModule";

const { t, te } = useI18n();
const route = useRoute();
const langStore = useLangStore();

const hasActiveChildren = (match) => {
  return route.path.indexOf(match) !== -1;
};

const translate = (text) => {
  if (te(text)) {
    return t(text);
  } else {
    return text;
  }
};

onMounted(() => {
  MenuComponent.reInitialization();
});
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  activeIndex.value = key;
};

const activeIndex = ref("1");
</script>
