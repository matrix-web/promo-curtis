<template>
  <div class="blur-container">
    <div 
      :class="[
        'blur-container__circle', 
        `${color}`, 
        { isSmall: isSmallCircle,
          raisedBig: isRaisedBig,
          raisedSmall: isRaisedSmall
        }
      ]"></div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "BlurContainer",
  props: {
    color: {
      type: String,
      default: "orange",
      validator: (value) => ["purple", "orange"].includes(value),
    },
    isRaisedBig: {
      type: Boolean,
      default: true
    },
    isRaisedSmall: {
      type: Boolean,
      default: false
    }, 
    isSmallCircle: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style lang="scss" scoped>
.blur-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 424px;
    width: 100%;
    min-height: 365px;
    margin: 0 auto;
    border-radius: 50%;
    

    &.isSmall {
      max-width: 344px;
      min-height: 344px;
    }

    &.raisedBig {
      filter: blur(59.5px);
    }

    &.raisedSmall {
      filter: blur(24.5px);
    }

    @media (min-width: 480px) {
      min-height: 424px;
    }

    @media (min-width: 768px) {
      min-width: 424px;
    }

    @media (min-width: 1024px) {
      min-width: 100%;
    }

    &.purple {
      background: linear-gradient(180deg, #3c0d59 0%, #370c37 100%);
    }

    &.orange {
      background: #7e4110;
    }
  }
}
</style>
