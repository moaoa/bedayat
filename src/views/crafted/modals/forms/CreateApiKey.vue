<template>
  <KTModalCard
    title="Create API Key Modal Example"
    description="Click on the below buttons to launch <br/>a new API Key creation example."
    image="/media/illustrations/sketchy-1/16.png"
    button-text="Create API Key"
    modal-id="kt_modal_create_account"
  ></KTModalCard>

  <KTCreateAPIKeyModal></KTCreateAPIKeyModal>
  <KTModalCreateF></KTModalCreateF>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import KTModalCard from "@/components/cards/Card.vue";
import KTModalCreateAccount from "@/components/modals/wizards/CreateAccountModal.vue";
import KTModalCreateApp from "@/components/modals/wizards/CreateAppModal.vue";
import KTModalCreateF from "@/components/modals/wizards/TwoFactorAuthModal.vue";
import KTCreateAPIKeyModal from "@/components/modals/forms/CreateAPIKeyModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "create-api-key",
  components: {
    KTModalCard,
    KTCreateAPIKeyModal,
    KTModalCreateF,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Create API Key", ["Modals", "Forms"]);
    });
  },
});
</script>
