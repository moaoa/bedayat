<template>
  <el-config-provider :locale="langStore.elementPlusLocale">
    <transition name="fade">
      <router-view/>
    </transition>
  </el-config-provider>
</template>

<style lang="scss">
@import "bootstrap-icons/font/bootstrap-icons.css";
@import "apexcharts/dist/apexcharts.css";
@import "quill/dist/quill.snow.css";
@import "animate.css";
@import "sweetalert2/dist/sweetalert2.css";
@import "nouislider/distribute/nouislider.css";
@import "@fortawesome/fontawesome-free/css/all.min.css";
@import "socicon/css/socicon.css";
@import "line-awesome/dist/line-awesome/css/line-awesome.css";
@import "@yaireo/tagify/src/tagify.scss";
@import "dropzone/dist/dropzone.css";
@import "@vueform/multiselect/themes/default.css";
@import "prism-themes/themes/prism-shades-of-purple.css";
@import "element-plus/lib/theme-chalk/index.css";

// Main demo style scss
@import "assets/sass/plugins";
@import "assets/sass/style";
@import "assets/sass/overrides";

// Dark mode demo style scss
@import "assets/sass/plugins.dark";
@import "assets/sass/style.dark";

//RTL version styles
@import "assets/css/style.rtl.css";
</style>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useStore} from "vuex";
import {Mutations, Actions} from "@/store/enums/StoreEnums";
// import ar from "element-plus/dist/locale/ar.mjs";
import {useLangStore} from "@/store/pinia_store/modules/LangModule";

const store = useStore();
const langStore = useLangStore();

langStore.setLang("ar");
onMounted(() => {
  /**
   * this is to override the layout config using saved data from localStorage
   * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
   */
  document.querySelector('#loadingContainer')?.remove()
  store.commit(Mutations.OVERRIDE_LAYOUT_CONFIG);
});
</script>
