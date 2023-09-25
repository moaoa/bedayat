<template>
  <el-tag class="ml-2" type="success" v-if="isMale">{{ $t("male") }}</el-tag>
  <el-tag class="ml-2" v-else>{{ $t("female") }}</el-tag>
</template>

<script lang="ts" setup>
import { AppConstants } from "@/core/constants/ApplicationsConstants";
import { ElTag } from "element-plus";

const props = defineProps<{ gender: number }>();
const isMale = AppConstants.USER_GENDER.Male === props.gender;
</script>
