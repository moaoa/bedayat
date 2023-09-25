<template>
  <!--begin::Dashboard-->

  <div class="row gy-5 gx-xl-8">
    <div class="col-xxl-12">
      <ListWidget3 widget-classes="card-xxl-stretch mb-xl-3"></ListWidget3>
    </div>
    <div class="col-xxl-8">
      <TableWidget9
        widget-classes="card-xxl-stretch mb-5 mb-xl-8"
      ></TableWidget9>
    </div>
  </div>

  <div class="row gy-5 g-xl-8">
    <div class="col-xxl-4">
      <TableWidget4></TableWidget4>
    </div>
  </div>
  <div class="row gy-5 g-xl-8">
    <div class="col-xxl-4">
      <ListWidget2 widget-classes="card-xl-stretch mb-xl-8"></ListWidget2>
    </div>
    <div class="col-xxl-4">
      <ListWidget6 widget-classes="card-xl-stretch mb-xl-8"></ListWidget6>
    </div>
    <div class="col-xxl-4">
      <ListWidget1 widget-classes="card-xxl-stretch mb-xl-3"></ListWidget1>
    </div>
  </div>

  <!--end::Dashboard-->
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import ListWidget1 from "@/components/widgets/lists/Widget1.vue";
import ListWidget2 from "@/components/widgets/lists/Widget2.vue";
import ListWidget3 from "@/components/widgets/lists/Widget3.vue";
import TableWidget4 from "@/components/widgets/tables/Widget4.vue";
import ListWidget6 from "@/components/widgets/lists/Widget6.vue";
import TableWidget9 from "@/components/widgets/tables/Widget9.vue";

import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

onMounted(() => {
  setCurrentPageTitle("Dashboard");
});
</script>
