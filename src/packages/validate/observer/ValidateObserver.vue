<template>
  <ValidationObserver
    v-bind="$attrs"
    v-slot="{ invalid, changed, valid, reset, handleSubmit }"
  >
    <slot v-bind="{ invalid, changed, valid, reset, handleSubmit }" />
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  name: "ValidateObserver",
  inheritAttrs: false,
  components: {
    ValidationObserver
  },
  props: {
    invalid: {
      type: Boolean,
      default: null
    },
    changed: {
      type: Boolean,
      default: null
    }
  }
};
</script>
