<template lang="html">
  <ValidateProvider
    class="formItem"
    tag="div"
    :rules="rules"
    v-bind="$attrs"
    v-slot="{ errors: [error] }"
  >
    <slot />
    <span
      v-if="customError || error"
      class="formItem__error"
      v-html="customError || error"
    />
  </ValidateProvider>
</template>

<script>
import ValidateProvider from "@/packages/validate/provider/ValidateProvider";

export default {
  name: "FormItem",
  components: { ValidateProvider },
  inheritAttrs: false,
  props: {
    rules: {
      type: [String, Object],
      default: null,
    },
    customError: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.formItem {
  position: relative;

  &__error {
    color: var(--color-red);
    font-size: 10px;
    font-weight: 400;
    margin-left: 2px;
  }
}
</style>
