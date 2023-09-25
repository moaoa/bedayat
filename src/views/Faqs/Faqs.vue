<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bolder text-dark">{{ t("faqs") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->

        <a
          class="btn btn-icon btn-light-primary btn-sm me-3"
          @click="faqsStore.loadFaqs()"
        >
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a
          href="#"
          class="btn btn-sm btn-primary mx-1"
          target="#"
          data-bs-toggle="modal"
          :data-bs-target="`#kt_modal_add_faq`"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ $t("addFaq") }}
        </a>

      </div>
    </div>

    <div v-loading="faqsStore.dataIsLoading" class="card-body pt-2">

      <el-table :data="faqsTable" height="400">
        >
        <el-table-column
          index="scope.$index"
          :label="t('noNumber')"
          width="55"
          align="center"
          header-align="center"
        >
          <template #default="scope:{ row: Faq, $index: number }">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          :label="$t('faqQuestion')"
          width="200"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Faq, $index: number }">
            <b> {{ scope.row.question }}</b>
          </template>
        </el-table-column>
        <el-table-column
          prop="englishName"
          :label="$t('faqAnswer')"
          width="300"
          align="center"
          header-align="center"
        >
          <template #default="scope:{ row: Faq, $index: number }">
            <b> {{ scope.row.answer }}</b>
          </template>
        </el-table-column>
        <el-table-column
          prop="englishName"
          :label="$t('faqCategory')"
          width="130"
          align="center"
          header-align="center"
        >
          <template #default="scope:{ row: Faq, $index: number }">
            <b>
              <span class="badge fs-8 fw-bolder badge-light-success">
              {{ t(faqCategoryTitle(scope.row.faqCategory)) }}
            </span>
            </b>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          :label="$t('createdAt')"
          width="100"
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
        <el-table-column
          :label="$t('edit')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope :{ row: Faq, $index: number }">
            <a
              data-bs-toggle="modal"
              :data-bs-target="`#kt_modal_update_faq`"
              class="btn btn-icon btn-light-success btn-sm"
              @click="openUpdateCityDialog(scope.row)"
            >
              <i class="bi bi-pencil"></i>
            </a>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('remove')"
          width="90"
          align="center"
          header-align="center"
        >
          <template #default="scope: { row: Faq, $index: number }">
            <div class="flex">
              <a
                class="btn btn-icon btn-light-danger btn-sm"
                data-bs-toggle="modal"
                :data-bs-target="`#kt_modal_delete_faq`"
                @click="faqsStore.selectFaq(scope.row)"
              >
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- end::table -->

      <br />
      <!-- start::pagination -->
      <el-pagination
        v-if="!faqsStore.dataIsLoading && !faqsStore.errorLoadingData"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="faqsStore.total"

        :page-sizes="[25, 100, 200, 300, 400]"
      />
      <!--      current-page="{{currentPage}}"-->
      <!--      page-size="{{currentSize}}"-->
      <!--      pager-count="{{pageCount}}"-->
      <!-- end::pagination -->
    </div>

    <AddFaq ref="addFaqModalRef"  @submit="faqAdded" />
    <UpdateFaq ref="updateFaqModalRef"  @submit="faqUpdated" />
    <DeleteFaq ref="deleteFaqModalRef"  @submit="faqDeleted" />

  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { City } from "@/types/Cities";
import { formatDate } from "@/core/helpers/formatDate";
import { useI18n } from "vue-i18n";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useFaqsStore } from "@/store/pinia_store/modules/FaqsModule";
import { Faq, FaqCategory } from "@/types/Faq";
import AddFaq from "@/views/Faqs/AddFaq.vue";
import UpdateFaq from "@/views/Faqs/UpdateFaq.vue";
import DeleteFaq from "@/views/Faqs/DeleteFaq.vue";
import { hide } from "@popperjs/core";
import { hideModal } from "@/core/helpers/dom";

const { t } = useI18n();
const faqsStore = useFaqsStore();


const faqsTable = computed(() => faqsStore.faqs);
const addFaqModalRef = ref<HTMLElement | null>(null);


const openUpdateCityDialog=(faq : Faq)=>{
  faqsStore.selectFaq(faq)
}
const faqCategoryTitle = (category : FaqCategory)=>{

  switch (category) {
    case FaqCategory.General:
      return "general"
    case FaqCategory.Login:
      return "login"
    case FaqCategory.Courses:
      return "courses"
    case FaqCategory.Subscription:
      return "subscription"
  }

};

const formatter = (key: keyof City) => {
  return (city: City) => formatDate(city[key]);
};

watch(
  () => faqsStore.dataIsLoading,
  (newVal) => {
    console.log(newVal);
  }
);
setCurrentPageBreadcrumbs(t("faqs"), [t("faqs")]);
const faqUpdated=()=>{
}
const faqDeleted=(faq:Faq)=>{
}
const faqAdded=(faq:Faq)=>{
}
faqsStore.loadFaqs();
</script>
