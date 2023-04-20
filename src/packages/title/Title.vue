<template>
  <component
    :is="tag"
    :style="{ color: color ? `var(--color-${color})` : undefined }"
    :class="[
      'title',
      `w-${weight}`,
      `f-${font}`,
      `h${level}`,
      { 'm-upper': isUppercase },
    ]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "Title",
  props: {
    level: {
      type: Number,
      default: 1,
      validator: (value) => [1, 2, 3, 4, 5].includes(value),
    },
    color: {
      type: String,
    },
    font: {
      type: String,
    },
    weight: {
      type: Number,
    },
    isUppercase: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tag() {
      return `h${this.level}`;
    },
  },
};
</script>

<style lang="scss">
.title {
  color: var(--color-black);
  margin: 0;
  font-family: var(--font-regular);
  font-weight: 400;

  &.m-upper {
    text-transform: uppercase;
  }
  &.w-400 {
    font-weight: 400;
  }
  &.w-700 {
    font-weight: 700;
  }
  &.f-optima {
    font-family: var(--font-optima);
  }
  &.h1 {
    font-size: 30px;
    line-height: 30px;

    @media (min-width: 1024px) {
      font-size: 52px;
      line-height: 53px;
    }
  }
  &.h2 {
    font-size: 30px;
    line-height: 30px;

    @media (min-width: 1024px) {
      font-size: 34px;
      line-height: 36px;
    }

    @media (min-width: 1440px) {
      font-size: 42px;
      line-height: 43px;
    }
  }
  &.h3 {
    font-size: 23px;
    line-height: 24px;

    @media (min-width: 1024px) {
      font-size: 26px;
      line-height: 34px;
    }

    @media (min-width: 1440px) {
      font-size: 36px;
      line-height: 37px;
    }
  }
  &.h4 {
    font-size: 20px;
    line-height: 24px;

    @media (min-width: 1024px) {
      font-size: 32px;
      line-height: 33px;
    }
  }
  &.h5 {
    font-size: 16px;
    line-height: 18px;

    @media (min-width: 1024px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
  &.h6 {
    font-size: 16px;
    line-height: 18px;
  }
}
</style>
