<template>
  <svg
    :class="`icon`"
    :style="{
      height: `${size}px`,
      width: `${size}px`,
      cursor: isClickable && 'pointer',
      fill: color ? `var(--color-${color})` : undefined,
    }"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="iconUrl" />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "black",
    },
  },
  computed: {
    iconUrl() {
      return `#${this.name}`;
    },
  },
};
</script>

<style lang="scss">
svg {
  fill: none;
}

.icon {
  fill: var(--color-black);
}
</style>
