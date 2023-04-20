<template>
  <button
    @click="$emit('click', $event)"
    :class="[
      'button',
      `${variant}`,
      `${size}`,
      {
        outlined: isOutline,
        raised: isRaised,
        boldOutline: isBoldOutline,
        [size]: size
      },
    ]"
  >
    <Loader v-if="isLoading" :color="loaderColor" />
    <slot v-else />
  </button>
</template>

<script>
import Loader from "@/packages/loader/Loader";

export default {
  name: "NewButton",
  components: {
    Loader,
  },
  props: {
    variant: {
      type: String,
      default: "orange",
      validator: (value) => ["orange", "pink", "white", "red"].includes(value),
    },
    size: {
      type: String,
      default: "small",
      validator: (value) => ["small", "middle", "big"].includes(value),
    },
    isOutline: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isRaised: {
      type: Boolean,
      default: false,
    },
    isBoldOutline: {
      type: Boolean,
      default: false
    }
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 70px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;
  font-family: var(--font-regular);
  text-transform: uppercase;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.raised {
    box-shadow: 0 4px 20px var(--color-orange);
  }

  &.block {
    width: 100%;
  }

  &.outlined {
    background-color: transparent;
    box-shadow: none;
  }

  &.boldOutline {
    border-width: 2px !important;
  }


  &.red {
    background-color: var(--color-light-red);
    color: var(--color-white);
  }

  &.orange {
    background-color: var(--color-orange);
    color: var(--color-black);

    &.small {
      padding: 7px 13px;
      font-size: 11px;
      line-height: 17px;

      @media (min-width: 1024px) {
        font-size: 14px;
      }
    }

    &.middle {
      padding: 10px 17px;
      font-size: 19px;
      line-height: 23px;
    }

    &.big {
      font-size: 14px;
      line-height: 17px;
      padding: 10px 16px;

      @media (min-width: 1440px) {
        font-size: 20px;
        line-height: 26px;
        padding: 14px 20px;
      }
    }

    &.outlined {
      background-color: transparent;
      border: 1px solid var(--color-orange);
      color: var(--color-orange);
    }

    &:not(:disabled):hover {
    }

    &:not(:disabled):active {
    }
  }

  &.white {
    background-color: var(--color-white);
    color: var(--color-white);

    &.small {
      padding: 7px 13px;
      font-size: 14px;
      line-height: 17px;
    }

    &.middle {
      padding: 10px 17px;
      font-size: 19px;
      line-height: 23px;
    }

    &.outlined {
      background-color: transparent;
      border: 1px solid var(--color-white);
      color: var(--color-white);
    }

    &:not(:disabled):hover {
    }

    &:not(:disabled):active {
    }
  }

  &.pink {
    background-color: var(--color-pink);
    color: var(--color-white);
    text-transform: initial;
    font-weight: 400;

    &.raised {
      box-shadow: 0px 4px 15px rgba(210, 8, 8, 0.85);
    }

    &.small {
      padding: 7px 13px;
      font-size: 14px;
      line-height: 17px;
    }

    &.middle {
      padding: 10px 17px;
      font-size: 16px;
      line-height: 23px;

      @media (min-width: 1200px) {
        font-size: 19px;
      }
    }

    &.outlined {
      background-color: transparent;
      border: 1px solid var(--color-white);
      color: var(--color-white);
    }

    &:not(:disabled):hover {
    }

    &:not(:disabled):active {
    }
  }

  &.red {
    background-color: var(--color-light-red);
    color: var(--color-white);
    text-transform: initial;
    font-weight: 400;

    &.raised {
      box-shadow: 0 4px 20px var(--color-light-red);
    }

    &.small {
      padding: 7px 13px;
      font-size: 14px;
      line-height: 17px;
    }

    &.middle {
      padding: 10px 17px;
      font-size: 16px;
      line-height: 23px;

      @media (min-width: 1200px) {
        font-size: 19px;
      }
    }

    &.outlined {
      background-color: transparent;
      border: 1px solid var(--color-light-red);
      color: var(--color-white);
    }

    &:not(:disabled):hover {
    }

    &:not(:disabled):active {
    }
  }
}
</style>
