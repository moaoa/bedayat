<template>
  <!--begin::List Widget 3-->

  <div class="card card-xxl-stretch mb-xl-3">
    <!--begin::Header-->
    <div class="card-header border-0">

      <h3 class="card-title fw-bolder text-dark">{{ t("Packages") }}</h3>
      <div class="card-toolbar d-flex flex-row">


        <a class="btn btn-icon btn-light-primary btn-sm me-3"
           @click="coursesStore.loadPackages(searchFilter)">
          <i class="bi bi-arrow-repeat"></i>
        </a>

        <a href="#" class="btn btn-sm btn-primary mx-1" target="#"
           @click="addPackage">
          <span class="svg-icon svg-icon-3">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg"/>
          </span>
          {{ $t("addPackage") }}
        </a>


      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <div class="row">


        <div class="col-md-6 col-lg-4 col-7">
          <label class="fs-6 fw-bold mb-2">
            {{ $t("grades") }}
          </label>
          <el-select v-model="searchFilter.gradeId" clearable filterable>
            <el-option v-for="grade in gradesStore.grades" :key="grade.id" :value="grade.id"
                       :label="grade.name">
            </el-option>
          </el-select>
        </div>


        <div class="col-md-6 col-lg-4 col-7">
          <label class=" fs-6 fw-bold mb-2">
            {{ $t("name") }}
          </label>
            <el-input
                id="input_search_package"
                v-model="searchFilter.name"
                type="text"
                placeholder=""
                clearable
            />
        </div>
      </div>
      <div class="row">
        <div v-loading="coursesStore.dataIsLoading">

          <el-table class="table-responsive" max-width :data="packagesTable">
            >
            <el-table-column index="scope.$index" :label="t('noNumber')" align="center" header-align="center">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>

            <el-table-column prop="name" :label="$t('arabicName')" align="center" header-align="center">
              <template #default="scope">
                <b> {{ scope.row.title }}</b>
              </template>
            </el-table-column>
            <el-table-column prop="englishName" :label="$t('englishName')" align="center" header-align="center">
              <template #default="scope">
                <b> {{ scope.row.englishTitle }}</b>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" :label="$t('createdAt')" :formatter="formatter('createdAt')"
                             align="center"
                             header-align="center"/>
            <el-table-column prop="lastUpdated" :label="$t('lastUpdated')" :formatter="formatter('lastUpdated')"
                             align="center" header-align="center"/>
            <el-table-column :label="$t('edit')" align="center" header-align="center">
<!--              <template #default="scope">-->
<!--                -->
<!--                <a class="btn btn-icon btn-light-success btn-sm" @click="updatePackage(scope.row)"-->
<!--                   data-bs-toggle="modal" :data-bs-target="`#update_locality_modal`">-->
<!--                  <i class="bi bi-pencil"></i>-->
<!--                </a>-->

<!--         -->


<!--              </template>-->

              <template v-slot="scope: { row: Package, $index: number }">
                <RouterLink @click="coursesStore.selectPackage(scope.row)"
                    :to="{
                  name: 'UpdatePackages',
                  params: { id: scope.row.id },
                }"
                >
                  <a
                      class="btn btn-icon btn-light-success btn-sm"
                  >
                    <i class="bi bi-mortarboard-fill"></i>
                  </a>

                </RouterLink>
              </template>

            </el-table-column>

            <el-table-column :label="$t('remove')" width="90" align="center" header-align="center">
<!--              <template #default="scope: { row: Locality, $index: number }">-->
<!--                <div class="flex">-->
<!--                  <a class="btn btn-icon btn-light-danger btn-sm" data-bs-toggle="modal"-->
<!--                     :data-bs-target="`#kt_modal_delete_locality`" @click="localitiesStore.selectLocality(scope.row)">-->
<!--                    <i class="bi bi-trash"></i>-->
<!--                  </a>-->
<!--                </div>-->
<!--              </template>-->
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

    </div>
  </div>
    <!--end:List Widget 3-->
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import {Locality, NewLocalityData} from "@/types/Localities";
import {formatDate} from "@/core/helpers/formatDate";
import {useI18n} from "vue-i18n";
import {setCurrentPageBreadcrumbs} from "@/core/helpers/breadcrumb";
import {useCoursesStore} from "@/store/pinia_store/modules/CoursesModule";
import {useGradesStore} from "@/store/pinia_store/modules/GradesModule";
import {Package, PackageFilter} from "@/types/Packages/Packages";
import coursesService from "@/core/repositories/CoursesService";
import {useRouter} from "vue-router";
import {Grade} from "@/types/Grades";


////////// Declarations///////////////////
const {t} = useI18n();
const coursesStore = useCoursesStore();
const gradesStore = useGradesStore();
const packagesTable = computed(() => coursesStore.packages);
const router = useRouter();

const formatter = (key: keyof Locality) => {
  return (locality: Locality) => formatDate(locality[key]);
};
const searchFilter = reactive<PackageFilter>({
  name:"",
  gradeId:"",
  status: true
});


/////////////Functions///////////////////////

const addPackage = () => {
  router.push({name: "AddPackages"})
  console.log("Package added ")
}
const updatePackage = (packageRow: Package) => {
  console.log("Package updated ")
  // router.push({name: "UpdatePackage",
  // params{
  //
  // }})

}

setCurrentPageBreadcrumbs(t("Packages"), [t("Packages")]);

onMounted(() => {
  gradesStore.loadGrades();

  document.getElementById('input_search_package')?.addEventListener('keydown', async (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      await coursesStore.loadPackages(searchFilter)
    }
    // countriesStore.loadCountries();
  })});



</script>
