<template>
  <v-otp-input
    style="direction: ltr"
    ref="otpInput"
    name="otp"
    v-model="otpValue"
    input-classes="otp-input"
    separator=""
    :num-inputs="numberOfInputs"
    :should-auto-focus="true"
    input-type="letter-numeric"
    :conditionalClass="['one', 'two', 'three', 'four']"
    @on-change="handleOnChange"
    @on-complete="handleOnComplete"
  />
</template>

<script setup lang="ts">
defineProps({
  numberOfInputs: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{ (event: "change", value: string): void }>();
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

const otpValue = ref("");

const handleOnComplete = (value: string) => {
  //   console.log("OTP completed: ", value);
};

const handleOnChange = (value: string) => {
  emit("change", value);
};

// const clearInput = () => {
//   otpInput.value?.clearInput();
// };
</script>

<style>
.otp-input {
  direction: rtl;
  width: 73px;
  height: 85px;
  padding: 5px;
  margin: 0;
  margin-inline-end: 8px;
  font-size: 48px;
  font-weight: 700;
  border-radius: 12px;
  border: 1px solid rgba(158, 165, 173, 1);
  text-align: center;
  color: var(--secondary-color);
}

.otp-input:focus-visible {
  border: 2px solid rgba(158, 165, 173, 1) !important;
  outline: none;
}
/* Background colour of an input field with value */

/*.otp-input.is-complete {
  background-color: #e4e4e4;
}*/

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.otp-input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .otp-input {
    width: 50px;
    height: 50px;
    font-size: 30px;
  }
}
</style>
