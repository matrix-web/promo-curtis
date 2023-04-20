<template>
  <label class="radio" :class="{ 'm-disabled': isDisabled }">
    <input
      name="name"
      type="checkbox"
      v-model="isSelected"
      :disabled="isDisabled"
    />

    <span
      class="radio__circle"
      :style="`backgroundImage: url(${circle})`"
      :class="{
        'm-checked': isSelected,
        'm-disabled': isDisabled,
      }"
    >
      <span
        class="radio__circle-inner"
        :style="`backgroundImage: url(${circle20})`"
      ></span>
    </span>

    <span v-if="$slots.default" class="radio__label">
      <slot />
    </span>
  </label>
</template>

<script>
import circle from "@/assets/img/svg/circle-32.svg";
import circle20 from "@/assets/img/svg/circle-20.svg";

export default {
  name: "Radio",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    circle,
    circle20,
  }),
  computed: {
    isSelected: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  width: fit-content;

  &.m-disabled {
    cursor: not-allowed;
  }

  input {
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    display: none;
  }

  &__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    &.m-disabled {
      opacity: 0.5;
    }

    > * {
      transition: 0.2s;
      opacity: 0;
    }

    &.m-checked {
      > * {
        opacity: 1;
      }
    }
  }

  &__circle-inner {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  &__label {
    font-weight: 400;
    font-size: 16px;
    color: var(--color-white);

    @media (min-width: 1024px) {
      font-size: 18px;
    }
  }
}
</style>
