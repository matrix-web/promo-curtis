<template>
  <label class="checkbox" :class="{ 'm-disabled': isDisabled }">
    <input type="checkbox" v-model="isChecked" :disabled="isDisabled" />

    <span
      class="checkbox__checkmark"
      :class="{
        'm-checked': isChecked,
        'm-disabled': isDisabled,
      }"
    >
      <Icon name="check-24" color="white" :size="16" />
    </span>

    <span v-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script>
import Icon from "@/packages/icon/Icon";
export default {
  name: "Checkbox",
  components: { Icon },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isChecked: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    iconColor() {
      return this.isDisabled ? "black" : "white";
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  &.m-disabled {
    cursor: not-allowed;
  }

  @media (hover: hover) {
    &:hover &__checkmark:not(.m-checked) > * {
      opacity: 0.2;
    }
  }

  input {
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    display: none;
  }

  &__checkmark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    min-width: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-pink);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.34);
    box-shadow: 0 0 8px rgba(232, 17, 116, 0.44);
    transition: 0.3s;

    &.m-disabled {
    }
    > * {
      transition: 0.2s;
      opacity: 0;
    }

    &.m-checked {
      background-color: var(--color-pink);

      > * {
        opacity: 1;
      }
    }
  }

  &__label {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--color-white);
  }
}
</style>
