<template>
  <div class="card rounded bg-white m-auto p-8 shadow">
    <h3 class="text-center">{{ $t("enterOtpCode") }}</h3>
    <OtpInput :number-of-inputs="6" @change="setOtp" input-type="number" />
    <div class="card-body">
      <button
        class="btn btn-primary"
        @click="confirmOtp"
        :disabled="otp.length < 6"
      >
        {{ $t("send") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import OtpInput from "@/components/OtpInput.vue";
import { ref } from "vue";
import { useAuthenticationStore } from "@/store/pinia_store/modules/AuthModule";
import Toaster from "@/core/services/Toaster";

const authStore = useAuthenticationStore();

const otp = ref("");

const setOtp = (value: string) => {
  otp.value = value;
};

const confirmOtp = () => {
  authStore.confirmOtp(otp.value);
};
</script>
