<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">

        <h3 class="card-title fw-bolder text-dark">{{ t("promotions") }}</h3>
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
              <div
                  class="d-flex align-items-center gap-3 justify-content-between"
              >
                <span
                    v-if="scope.row.activeState === PromotionState.Inactive"
                    class="bullet bullet-vertical h-40px bg-danger"
                ></span>
                <span
                    v-else
                    class="bullet bullet-vertical h-40px bg-success"
                ></span>
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="image" :label="$t('image')" align="center" header-align="center">
            <template #default="scope">

              <img class="w-50 h-50 image-input-wrapper" style="height: 50%" :src="scope.row.image"  />
            </template>
          </el-table-column>
          <el-table-column prop="information" :label="$t('information')" align="center" header-align="center">


                <template #default="scope: { row: PromotionDto, $index: number }">
                  <ClippedText :text="scope.row.information"  />
                </template>


          </el-table-column>

          <el-table-column prop="createdAt" :label="$t('createdAt')" :formatter="formatter('createdAt')" align="center"
                           header-align="center"/>
          <el-table-column prop="lastUpdated" :label="$t('lastUpdated')" :formatter="formatter('lastUpdated')"
                           align="center" header-align="center"/>
          <el-table-column :label="$t('state')" width="90" align="center" header-align="center">
            <template #default="scope: { row: PromotionDto, $index: number }">
              <div class="flex">
                <label
                    class="
                      form-check form-switch form-check-custom form-check-solid align-content-center justify-content-center
                    "
                >
                  <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="scope.row.activeState == PromotionState.Active"
                      @change="changePromotionState(scope.row)"
                  />
                </label>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('edit')" align="center" header-align="center">
            <template #default="scope">
              <a class="btn btn-icon btn-light-success btn-sm" @click="openUpdatePromotionDialog(scope.row)"
                 data-bs-toggle="modal" :data-bs-target="`#update_promotion_modal`">
                <i class="bi bi-pencil"></i>
              </a>
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

    </div>
    <AddPromotionModal @submit="createPromotion" ref="addPromotionModalRef"></AddPromotionModal>
    <UpdatePromotionModal @submit="updatePromotion" ref="updatePromotionModalRef"/>
    <DeletePromotionModal @submit="promotionDeleted" ref="deletePromotionModalRef"></DeletePromotionModal>
  </div>
  <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {Locality} from "@/types/Localities";
import {formatDate} from "@/core/helpers/formatDate";
import {useI18n} from "vue-i18n";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import {hideModal} from "@/core/helpers/dom";
import {usePromotionsStore} from "@/store/pinia_store/modules/PromotionsModule";
import {AddUpdatePromotionDto, PromotionDto, PromotionState} from "@/types/Promotions";
import AddPromotionModal from "@/views/Promotions/AddPromotionModal.vue";
import UpdatePromotionModal from "@/views/Promotions/UpdatePromotionModal.vue";
import DeletePromotionModal from "@/views/Promotions/DeletePromotionModal.vue";
import ClippedText from "@/components/ClippedText.vue";

const {t} = useI18n();
const promotionStore = usePromotionsStore();

const addPromotionModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const updatePromotionModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const deletePromotionModalRef = ref<{ modalRef: HTMLElement } | null>(null);
const promotionSearch = ref<string>();
const promotionsTable = computed(() => promotionStore.promotions);

const createPromotion = async (data: AddUpdatePromotionDto) => {
  try {
    await promotionStore.createPromotion(data);
    hideModal(addPromotionModalRef.value?.modalRef!);
    promotionStore.unselectPromotion();
    await promotionStore.loadPromotions(promotionSearch.value ?? '')

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
    hideModal(updatePromotionModalRef.value?.modalRef!);
    promotionStore.unselectPromotion();
    await promotionStore.loadPromotions(promotionSearch.value ?? '')
  }catch (error) {
    console.log(error);
  }
};

const formatter = (key: keyof Locality) => {
  return (locality: Locality) => formatDate(locality[key]);
};
const changePromotionState = async (promotionDto : PromotionDto)=>  {
  console.log('sdfsdfsdfsdfsdfsdf')
  await promotionStore.activateDeactivatePromotion(promotionDto, promotionDto.activeState == PromotionState.Active? PromotionState.Inactive : PromotionState.Active)
  await promotionStore.loadPromotions(promotionSearch.value ?? '')
}

const promotionDeleted = (promotionDto: PromotionDto) => {
  promotionStore.deleteItem(promotionDto);
  hideModal(deletePromotionModalRef.value?.modalRef!);
};

onMounted(()=> {
      promotionStore.loadPromotions('')
  document.getElementById('input_search_promotions')?.addEventListener('keydown',  async (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      promotionStore.loadPromotions(promotionSearch.value ?? '')
    }
  })
})

setCurrentPageBreadcrumbs(t("promotions"), [t("promotions")]);
</script>
