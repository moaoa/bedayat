<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="text"
    placement="top-start"
    v-if="text.length > props.length"
  >
    <div class="d-flex">
      <span class="text-muted">...</span>
      <b>{{ text.slice(0, length) }}</b>
    </div>
  </el-tooltip>
  <b v-else>{{ text }}</b>
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
