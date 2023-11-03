<template>
  <div>
    <slot :reset="reset" :fileName="fileName" :open="open">
      <div class="d-flex gap-4" @click.prevent="() => open()">
        <button class="btn btn-primary">{{ $t("upload") }}</button>
        <div class="d-flex align-items-center justify-content-center gap-1">
          <p class="m-0">{{ fileName }}</p>
          <i
            class="bi bi-x-circle-fill text-danger cursor-pointer"
            @click="handleReset"
            v-if="fileName"
          >
          </i>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import Toaster from "@/core/services/Toaster";
import { useFileDialog } from "@vueuse/core";
import { computed } from "vue";

const fileOptions = {
  image: "image/*",
  video: "video/*",
  audio: "audio/*",
  text: "text/*",
  pdf: "pdf/*",
  all: "*/*",
};

const props = defineProps<{ accept: keyof typeof fileOptions }>();

const { files, onChange, open, reset } = useFileDialog({
  accept: fileOptions[props.accept],
});

const emit = defineEmits<{ (event: "change", data: File | null) }>();

const fileName = computed(() => {
  if (files.value === null) return "";
  return files.value[0]?.name ?? "";
});

const handleReset = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  reset();
};

onChange((files) => {
  if (
    props.accept !== "all" &&
    files?.[0]?.type.includes(props.accept) === false
  ) {
    Toaster.error("Invalid file type");
    reset();
    return;
  }
  emit("change", files?.[0] ?? null);
});

defineExpose({ reset, fileName, open });
</script>
