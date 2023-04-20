<template>
  <picture>
    <source
      v-if="isMobile"
      media="(max-width: 899px)"
      :srcset="srcset('mobileUrl', 'webp')"
      :sizes="sizing"
      type="image/webp"
    />
    <source
      v-if="isMobile"
      media="(max-width: 899px)"
      :srcset="srcset('mobileUrl', 'png')"
      :sizes="sizing"
      type="image/png"
    />
    <source
      v-if="isMobile"
      media="(min-width: 900px)"
      :srcset="srcset('url', 'png')"
      :sizes="sizing"
      type="image/png"
    />
    <source
      v-if="isMobile"
      media="(min-width: 900px)"
      :srcset="srcset('url', 'webp')"
      :sizes="sizing"
      type="image/webp"
    />

    <source
      v-if="!isMobile"
      type="image/webp"
      :srcset="srcset('url', 'webp')"
      :sizes="sizing"
    />
    <img
      class="img"
      :loading="loading"
      :class="className"
      :src="url.png['1x']"
      :alt="alt"
      :srcset="srcset('url', 'png')"
      :sizes="sizing"
    />
  </picture>
</template>

<script>
export default {
  name: "Picture",
  props: {
    alt: {
      type: String,
      default: "",
    },
    loading: {
      type: String,
      default: "eager",
    },
    className: {
      type: String || Array,
      default: "",
    },
    sizes: {
      type: Object,
      default: () => ({
        mobile: "",
        tablet: "",
        laptop: "",
        desktop: "",
      }),
    },
    url: {
      type: Object,
      default: () => ({
        png: {
          "0.5x": "",
          "1x": "",
          "2x": "",
        },
        webp: {
          "0.5x": "",
          "1x": "",
          "2x": "",
        },
      }),
    },
    mobileUrl: {
      type: Object,
      default: () => ({
        png: {
          "0.5x": "",
          "1x": "",
          "2x": "",
        },
        webp: {
          "0.5x": "",
          "1x": "",
          "2x": "",
        },
      }),
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    srcset(obj, type) {
      const half = this[obj][type]["0.5x"]
        ? `${this[obj][type]["0.5x"]} 0.5x, `
        : "";
      const one = this[obj][type]["1x"] ? `${this[obj][type]["1x"]} 1x, ` : "";
      const two = this[obj][type]["2x"] ? `${this[obj][type]["2x"]} 2x` : "";

      return `${half}${one}${two}`;
    },
  },
  computed: {
    sizing() {
      const mobile = this.sizes.mobile ? this.sizes.mobile : "100vw";
      const tablet = this.sizes.tablet
        ? `(min-width: 768px) ${this.sizes.tablet}, `
        : "";
      const laptop = this.sizes.laptop
        ? `(min-width: 1024px) ${this.sizes.laptop}, `
        : "";
      const desktop = this.sizes.desktop
        ? `(min-width: 1440px) ${this.sizes.desktop}, `
        : "";

      return `${tablet}${laptop}${desktop}${mobile}`;
    },
  },
};
</script>

<style lang="scss">
.img {
  width: 100%;
  height: auto;
}
</style>
