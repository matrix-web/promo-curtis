<template>
  <button
    :type="type"
    :disabled="isDisabled"
    class="button"
    :class="{
      outlined: isOutlined,
      block: isBlock,
      raised: isRaised,
      small: isSmall,
      button__loading: isLoading,
    }"
    @click="handleClick"
  >
    <Loader class="button__loader" v-if="isLoading" :color="loaderColor" />
    <slot />
  </button>
</template>

<script>
import Loader from "@/packages/loader/Loader";

export default {
  name: "Button",
  components: { Loader },
  props: {
    isOutlined: {
      type: Boolean,
      default: false,
    },
    isRaised: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
  },
  computed: {
    loaderColor() {
      if (this.isRaised || this.isOutlined) return "orange";
      return "black";
    },
  },
  methods: {
    handleClick() {
      if (!this.isLoading && !this.isDisabled) {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 70px;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  line-height: 26px;
  font-weight: 700;
  transition: all 0.3s;
  font-family: var(--font-regular);
  text-transform: uppercase;
  background-color: var(--color-orange);
  color: var(--color-black);

  &.small {
    padding: 7px 13px;
    font-size: 14px;
    line-height: 17px;
  }

  &:not(:disabled):hover {
  }

  &:not(:disabled):active {
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.outlined {
    background: transparent;
    box-shadow: none;
    border: 2px solid var(--color-orange);
    color: var(--color-orange);
  }

  &.raised {
    box-shadow: 0 4px 20px var(--color-orange);
  }

  &.block {
    width: 100%;
  }

  &__loading {
    color: transparent;
  }

  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
