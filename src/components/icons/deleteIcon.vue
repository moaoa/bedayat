<template>
  <button
    :class="[
      'btn btn-icon btn-bg-light',
      `btn-active-color-${props.hoverColor}`,
      'btn-sm me-1',
    ]"
  >
    <span class="svg-icon svg-icon-3">
      <inline-svg src="/media/icons/duotune/general/gen027.svg" />
    </span>
  </button>
</template>

<script setup lang="ts">
export interface Props {
  hoverColor?: "primary" | "danger" | "success" | "warning";
}

const props = withDefaults(defineProps<Props>(), {
  hoverColor: "danger",
});
</script>
