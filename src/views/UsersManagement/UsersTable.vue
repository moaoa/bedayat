<template>
  <el-table v-if="userType === AppConstants.USER_ROLES.Admin"></el-table>
</template>

<script lang="ts" setup>
import { RoleValues } from "@/types/User";
import { AppConstants } from "@/core/constants/ApplicationsConstants";
defineProps<{ userType: RoleValues }>();
import { ElTable } from "element-plus";
</script>
