<template>
  <textarea
    :class="['input', { error: isError }]"
    :placeholder="placeholder"
    :type="typeField"
    v-model.trim="innerValue"
    :maxlength="max"
    :disabled="isDisabled"
    :readonly="isReadonly"
    v-mask="mask"
    @blur="$emit('blur', $event)"
  />
</template>

<script>
import { VueMaskDirective } from "v-mask";

export default {
  name: "Textarea",
  directives: {
    mask: VueMaskDirective,
  },
  props: {
    placeholder: {
      type: String,
    },
    value: {
      type: [String, Number, null],
      default: null,
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    max: {
      type: [Number, String],
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: [String, Object, Function],
    },
  },
  data() {
    return {
      isPasswordHidden: true,
      isHintVisible: false,
    };
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    typeField() {
      return this.isPassword && this.isPasswordHidden ? "password" : "text";
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: var(--font-regular);
  font-weight: 400;
  font-size: 16px;
  line-height: 17px;
  color: var(--color-white);
  text-overflow: ellipsis;
  background-color: rgba(0, 0, 0, 0.34);
  border: 1px solid var(--color-pink);
  box-shadow: 0 0 8px rgba(232, 17, 116, 0.44);
  border-radius: 5px;
  padding: 12px 16px;
  width: 100%;
  transition: all 0.3s;
  resize: none;
  min-height: 92px;

  @media (min-width: 768px) {
    font-size: 14px;
  }

  &.error {
    border: 1px solid var(--color-red);
  }

  &::placeholder {
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
  }
}
</style>
