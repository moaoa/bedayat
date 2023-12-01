<template>
  <el-tooltip
    class=""
    effect="dark"
    :content="text"
    placement="top-start"
    v-if="text?.length > props.length"
  >
    <div class="d-flex justify-content-center" style="white-space: nowrap">
      <span class="">...</span>
      <span>{{ text?.slice(0, length) }}</span>
    </div>
  </el-tooltip>
  <span v-else style="white-space: nowrap">{{ text }}</span>
</template>

<script lang="ts" setup>
import { ElTooltip } from "element-plus";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    default: 20,
  },
});
</script>
