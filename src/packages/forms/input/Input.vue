<template>
  <div class="input-field">
    <input
      :class="[
        'input',
        {
          error: isError,
          [variant]: variant,
          'text-center': isTextCenter,
          'icon-show': isSearch,
        },
      ]"
      ref="input"
      :placeholder="placeholder"
      :type="typeField"
      :inputmode="inputmode"
      :pattern="pattern"
      :autocomplete="autocomplete"
      v-model.trim="innerValue"
      :maxlength="max"
      :disabled="isDisabled"
      :readonly="isReadonly"
      v-mask="mask"
      @keyup.enter="$emit('enter', innerValue)"
      @blur="$emit('blur', $event)"
    />
    <button class="input-field__icon" v-if="isSearch" @click="$emit('search', innerValue)">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_631_1899)">
          <path
            d="M15.4888 14.5735L11.6808 10.6129C12.6599 9.44901 13.1964 7.98455 13.1964 6.45999C13.1964 2.89801 10.2983 0 6.73636 0C3.17438 0 0.276367 2.89801 0.276367 6.45999C0.276367 10.022 3.17438 12.92 6.73636 12.92C8.07358 12.92 9.34788 12.5167 10.4374 11.751L14.2743 15.7416C14.4347 15.9082 14.6504 16 14.8816 16C15.1004 16 15.3079 15.9166 15.4655 15.7649C15.8003 15.4428 15.811 14.9085 15.4888 14.5735ZM6.73636 1.68522C9.36923 1.68522 11.5111 3.82713 11.5111 6.45999C11.5111 9.09286 9.36923 11.2348 6.73636 11.2348C4.10349 11.2348 1.96158 9.09286 1.96158 6.45999C1.96158 3.82713 4.10349 1.68522 6.73636 1.68522Z"
            fill="#FCCA0B"
          />
        </g>
        <defs>
          <clipPath id="clip0_631_1899">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  </div>
</template>

<script>
import { VueMaskDirective } from "v-mask";

export default {
  name: "Input",
  components: {},
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
    isSearch: {
      type: Boolean,
      default: false,
    },
    isTextCenter: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validate: (value) => ["primary", "secondary", "tertiary"].includes(value),
    },
    inputmode: {
      type: String,
    },
    pattern: {
      type: String,
    },
    autocomplete: {
      type: String,
    },
    isFocus: {
      type: Boolean,
      default: false,
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
  watch: {
    isFocus() {
      if (this.isFocus) this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  position: relative;

  &__icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-34%);
  }

  .button {
    cursor: pointer;
  }
}
.input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: var(--font-regular);
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;
  color: var(--color-white);
  text-overflow: ellipsis;
  border: 1px solid var(--color-pink);
  box-shadow: 0 0 8px rgba(232, 17, 116, 0.44);
  border-radius: 5px;
  padding: 12px 16px;
  width: 100%;
  transition: all 0.3s;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 17px;
  }

  &.icon-show {
    padding: 10px 32px 10px 16px;
  }

  &.text-center {
    text-align: center;
  }

  &.primary {
    background-color: rgba(0, 0, 0, 0.34);
  }

  &.secondary {
    background: rgba(228, 0, 164, 0.2);
  }

  &.tertiary {
    padding: 1.5px 10px;
    background-color: transparent;
    border: none;
    box-shadow: none;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }

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
