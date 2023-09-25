<template>
  <div class="card mb-10">
    <div v-if="store.termsAndPrivacy.length < 2" class="d-flex justify-content-end  align-items-center">


      <div class="flex gap-3">
        <button v-if="store.termsAndPrivacy.some(t => t.type != TermsAndPrivacyType.Terms)|| store.termsAndPrivacy.length == 0"
          :data-kt-indicator="true ? 'on' : null" class="btn btn-sm m-5 btn-primary " style="height: 30px;" type="submit"
          @click="handleAdd(TermsAndPrivacyType.Terms)">
          {{ $t("addTerms") }}
        </button>
        <button v-if="store.termsAndPrivacy.some(t => t.type != TermsAndPrivacyType.Privacy) || store.termsAndPrivacy.length == 0"
          :data-kt-indicator="true ? 'on' : null" class="btn btn-sm m-5 flex btn-primary " style="height: 30px;"
          type="submit" @click="handleAdd(TermsAndPrivacyType.Privacy)">
          {{ $t("addPrivacy") }}
        </button>

      </div>
    </div>
    <div class="card-header card-header-stretch">
      <ul
       id="kt_layout_builder_tabs"
        ref="kt_layout_builder_tabs"
        class="nav nav-stretch nav-line-tabs fw-bold border-0 " 
        role="tablist" 
          >
        <li v-for="term in store.termsAndPrivacy" :key="term.id" class="nav-item">
          <a class="nav-link px-3" :class="{ active: tabIndex === term.type }" data-bs-toggle="tab"
            :data-tab-index=term.type @click="setActiveTab($event)" href="#kt_builder_main" role="tab">
            {{ t(term.type == TermsAndPrivacyType.Terms ? "termsAndConditions" : "privacy") }}
          </a>
        </li>

      </ul>
    </div>

    <div class="card-body container">

      <div v-if="!store.termsAndPrivacy.length" class="d-flex gap-3 text-center justify-content-center">
        <p> no data to display, please check your connections</p>
      </div>

      <div v-else>
        <div class="d-flex gap-3">

          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="store.displayArabic" size="small">
              <el-radio label="0" class="checked">{{ t("english") }} </el-radio>
              <el-radio label="1">{{ t("arabic") }}</el-radio>
            </el-radio-group>

          </div>
        </div>

        <div v-for="term in store.termsAndPrivacy" :key="term.id">

          <div
          id="kt_tabs"
          class="tab-content pt-3 col "
          >
            <div class="tab-pane col " :class="{ active: tabIndex === term.type }" id="kt_builder_main">

              <div v-if="store.displayArabic == '1'" class="row m-1 p-5 border h-100">

                <!-- <input class="form-control form-control-solid " type="text" v-model="term.content" /> -->

                <editor v-model="term.content" />
              </div>
              <div v-else class="row m-1 p-5 border h-100">

                <!-- <input class="form-control form-control-solid " type="text" v-model="term.englishContent" /> -->

                <editor v-model="term.englishContent" />

              </div>

              <div class="text-center">



              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="card-footer d-flex justify-content-center">
      <!-- <button :data-kt-indicator="true ? 'on' : null" class="btn btn-sm btn-primary" type="submit"
        @click="handleUpdate(tabIndex as TermsAndPrivacyType)">

        <span v-if="!store.termsDataSubmitting">
          {{ $t(" save") }}
          <span class="svg-icon svg-icon-3 ms-2 me-0">
          </span>

        </span>
        <span v-else class="indicator-progress btn-sm">
          {{ $t("pleaseWait") }}...
          <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      </button> -->


      <button v-if="store.termsAndPrivacy.length > 0" ref="submitMobileButtonRef" type="submit" data-kt-element="sms-submit"
        class="btn btn-primary" @click="handleUpdate(tabIndex as TermsAndPrivacyType)">
        <span v-if="!store.termsDataSubmitting" class="indicator-label"> Submit </span>
        <span v-else class="btn-sm ">
          Please wait...
        </span>
      </button>


    </div>
  </div>
</template>
  
<script setup lang="ts">
import { setCurrentPageBreadcrumbs } from '@/core/helpers/breadcrumb';
import { useI18n } from "vue-i18n";
import { onMounted, ref } from 'vue';
import { useTermsAndPrivacyStore } from '@/store/pinia_store/modules/TermsAndPrivacyModule';
import Toaster from '@/core/services/Toaster';
import { TermsAndPrivacyType } from '@/types/TermsAndPrivacy';
import Editor from '@tinymce/tinymce-vue'

const { t } = useI18n();

const tabIndex = ref(0);
const changelanguage = () => {

  console.log(store.displayArabic);

  return;
}

const store = useTermsAndPrivacyStore();


onMounted(async () => {


  await store.getTermsAndPrivacy();

  // set the tab from previous
  tabIndex.value = parseInt(localStorage.getItem("builderTab") || "0");

  setCurrentPageBreadcrumbs(t("termsAndPrivacy"), [t("termsAndPrivacy")]);
});

const handleUpdate = async (enumType: TermsAndPrivacyType) => {

  try {
    store.termsDataSubmitting = true;
    const update = await store.updateTermsAndPrivacy(enumType);

  } catch (error) {
    Toaster.error((error as Error).message);
  }
}
const handleAdd = async (enumType: TermsAndPrivacyType) => {
  try {
    //  store.termsDataSubmitting = true;

    const add = await store.addTermsAndPrivacy(enumType);

  } catch (error) {

    Toaster.error((error as Error).message);
  }
}



/**
 * Reset config
 * @param event
 */
const reset = (event) => {
  event.preventDefault();
  // remove existing saved config
  localStorage.removeItem("config");
  window.location.reload();
};

/**
 * Set active tab when the tab get clicked
 * @param event
 */
const setActiveTab = (event) => {
  tabIndex.value = parseInt(event.target.getAttribute("data-tab-index"));
  // keep active tab
  localStorage.setItem("builderTab", tabIndex.value.toString());
};




//  setCurrentPageBreadcrumbs("systemSettings", ["systemSettings"]);
</script>
  
<style>
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
  