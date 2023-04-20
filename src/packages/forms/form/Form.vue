<template lang="html">
  <ValidateObserver
    tag="div"
    class="form"
    v-slot="{ invalid, changed, valid, reset, handleSubmit }"
  >
    <slot v-bind="{ invalid, changed, valid, reset, handleSubmit }" />
  </ValidateObserver>
</template>

<script>
import ValidateObserver from "@/packages/validate/observer/ValidateObserver";

export default {
  name: "Form",
  components: { ValidateObserver },
};
</script>

<style lang="scss">
.form {
}
</style>
