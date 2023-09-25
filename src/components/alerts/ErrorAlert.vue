<template>
  <div
    class="alert bg-light-danger border border-danger border d-flex flex-column flex-sm-row p-5 mb-10"
  >
    <span
      :class="description ? 'mt-1' :'mt-2'"
      class="bi bi-info-circle svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0 fs-2 text-danger"></span>

    <div class="d-flex flex-column pe-0 pe-sm-10">
      <h5
          :class="description ? 'mt-1' :'mt-4'"

          style="width: 100%">{{title}}</h5>

      <span v-if="description">{{description}}</span>
    </div>

    <button
      v-if="dismissAble" type="button" class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
      <i class="bi bi-x fs-1 text-primary"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: false },
  dismissAble: { type: Boolean },
  icon: { type: String }
});
</script>
