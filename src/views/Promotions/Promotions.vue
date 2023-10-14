<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">

        <h3 class="card-title fw-bolder text-dark">{{ t("localities") }}</h3>
      <div class="card-toolbar d-flex flex-row">




        <a class="btn btn-icon btn-light-primary btn-sm me-3"
           @click="promotionStore.loadPromotions(promotionSearch == undefined ? '': promotionSearch)">
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a href="#" class="btn btn-sm btn-primary mx-1" target="#" data-bs-toggle="modal"
           :data-bs-target="`#kt_modal_add_promotion`">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg"/>
          </span>
          {{ $t("addPromotion") }}
        </a>

      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <p>Need to add the Change active state</p>
              <div class="row">

                  <div class="col-md-6 col-lg-4 col-7">
                    <label class=" fs-6 fw-bold mb-2">
                      {{ $t("name") }}
                    </label>
                    <el-input
                        id="input_search_promotions"
                        v-model="promotionSearch"
                        type="text"
                        placeholder=""
                        clearable
                    />
                  </div>
              </div>


      <div v-loading="promotionStore.dataIsLoading">

        <el-table class="table-responsive" max-width :data="promotionsTable">
          >
          <el-table-column width="50" index="scope.$index" :label="t('noNumber')" align="center" header-align="center">
            <template  #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column prop="image" :label="$t('image')" align="center" header-align="center">
            <template #default="scope">
              <img class="w-50 h-50 image-input-wrapper" :src="scope.row.image" />
            </template>
          </el-table-column>
          <el-table-column prop="information" :label="$t('information')" align="center" header-align="center">
            <template #default="scope">
              <b> {{ scope.row.information }}</b>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" :label="$t('createdAt')" :formatter="formatter('createdAt')" align="center"
                           header-align="center"/>
          <el-table-column prop="lastUpdated" :label="$t('lastUpdated')" :formatter="formatter('lastUpdated')"
                           align="center" header-align="center"/>
          <el-table-column :label="$t('edit')" align="center" header-align="center">
            <template #default="scope">
              <a class="btn btn-icon btn-light-success btn-sm" @click="openUpdatePromotionDialog(scope.row)"
                 data-bs-toggle="modal" :data-bs-target="`#update_promotion_modal`">
                <i class="bi bi-pencil"></i>
              </a>
            </template>
          </el-table-column>

          <el-table-column :label="$t('chageState')" width="90" align="center" header-align="center">
            <template #default="scope: { row: PromotionDto, $index: number }">
              <div class="flex">
                <a class="btn btn-icon btn-light-danger btn-sm" data-bs-toggle="modal"
                   :data-bs-target="`#kt_modal_delete_promotion`" @click="promotionStore.selectPromotion(scope.row)">
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </template>
          </el-table-column>

          <el-table-column :label="$t('remove')" width="90" align="center" header-align="center">
            <template #default="scope: { row: PromotionDto, $index: number }">
              <div class="flex">
                <a class="btn btn-icon btn-light-danger btn-sm" data-bs-toggle="modal"
                   :data-bs-target="`#kt_modal_delete_promotion`" @click="promotionStore.selectPromotion(scope.row)">
                  <i class="bi bi-trash"></i>
                </a>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- end::table -->

      </div>
      <br/>
      <!-- start::pagination -->
<!--      <el-pagination v-if="!localitiesStore.dataIsLoading && !localitiesStore.errorLoadingData-->
<!--        " background layout="total, sizes, prev, pager, next, jumper" :total="localitiesStore.total"-->
<!--                     current-page="{{currentPage}}" page-size="{{currentSize}}" pager-count="{{pageCount}}"-->
<!--                     :page-sizes="[25, 100, 200, 300, 400]"/>-->
      <!-- end::pagination -->
    </div>

    <AddPromotionModal @submit="createPromotion" ref="addLocalityModalRef"></AddPromotionModal>

    <UpdatePromotionModal @submit="updatePromotion" ref="updateLocalityModalRef"/>
    <!-- <AddLocalityForm @submit="localityAdded"></AddLocalityForm> -->
    <DeletePromotionModal @localityDeleted="promotionDeleted" ref="deleteLocalityModalRef"></DeletePromotionModal>
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {Locality, NewLocalityData} from "@/types/Localities";
import {formatDate} from "@/core/helpers/formatDate";
import {useLocalitiesStore} from "@/store/pinia_store/modules/LocalitiesModule";
import {useI18n} from "vue-i18n";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import AddLocalityForm from "@/views/Localities/AddLocalityModal.vue";
import UpdateLocalityModal from "@/views/Localities/UpdateLocalityModal.vue";
import DeleteLocality from "@/views/Localities/DeleteLocality.vue";
import Toaster from "@/core/services/Toaster";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import {hideModal} from "@/core/helpers/dom";
import {useCountriesStore} from "@/store/pinia_store/modules/CountriesModule";
import {useCitiesStore} from "@/store/pinia_store/modules/CitiesModule";
import {usePromotionsStore} from "@/store/pinia_store/modules/PromotionsModule";
import {AddUpdatePromotionDto, PromotionDto} from "@/types/Promotions";
import AddPromotionModal from "@/views/Promotions/AddPromotionModal.vue";
import UpdatePromotionModal from "@/views/Promotions/UpdatePromotionModal.vue";
import DeletePromotionModal from "@/views/Promotions/DeletePromotionModal.vue";

const {t} = useI18n();
const promotionStore = usePromotionsStore();

const addLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const updateLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const deleteLocalityModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const promotionSearch = ref<string>();
const promotionsTable = computed(() => promotionStore.promotions);

const createPromotion = async (data: AddUpdatePromotionDto) => {
  try {

    await promotionStore.createPromotion(data);

    hideModal(addLocalityModalRef.value?.modalRef!);

    promotionStore.unselectPromotion();
  } catch (error) {
    console.log(error);
  }
};

const openUpdatePromotionDialog = (promotionDto: PromotionDto) => {
  promotionStore.selectPromotion(promotionDto);
};

const updatePromotion = async (data: AddUpdatePromotionDto) => {
  try {
    await promotionStore.updatePromotion(data);

    hideModal(updateLocalityModalRef.value?.modalRef!);

    promotionStore.unselectPromotion();
  }catch (error) {
    console.log(error);
  }
};
const formatter = (key: keyof Locality) => {
  return (locality: Locality) => formatDate(locality[key]);
};

// setCurrentPageBreadcrumbs(t("localities"), [t("localities")]);

const promotionDeleted = (promotionDto: PromotionDto) => {
  hideModal(deleteLocalityModalRef.value?.modalRef!);
  promotionStore.deleteItem(promotionDto);
};

setCurrentPageBreadcrumbs(t("promotions"), [t("promotions")]);


</script>
