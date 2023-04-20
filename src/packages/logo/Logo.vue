<template>
  <div
    :style="{
      cursor: isClickable && 'pointer',
    }"
    @click="$emit('click', $event)"
  >
    <Picture
      :url="
        img(
          ['', require('@/assets/img/logo.png'), ''],
          ['', require('@/assets/img/logo.webp'), '']
        )
      "
      :className="['logo', `${variant}`]"
      alt="Curtis"
    />
  </div>
</template>

<script>
import Picture from "@/components/common/Picture";
import { img } from "@/helpers/utils";

export default {
  name: "Logo",
  components: { Picture },
  props: {
    isClickable: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary"].includes(value),
    },
  },
  data: () => ({}),
  methods: {
    img,
  },
};
</script>

<style lang="scss">
.logo {
  &.primary {
    position: absolute;
    top: 17px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: auto;
    z-index: 1;

    @media (min-width: 1024px) {
      top: 35px;
      left: unset;
      right: 32px;
      width: 80px;
      height: auto;
      z-index: 1000;
    }
  }

  &.secondary {
    width: 44px;
    height: 48px;
  }
}
</style>
