<template>
  <div class="loader" :class="[`color-${color}`, `m-${size}`]">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    color: {
      type: String,
      default: "white",
      validator: (val) => ["orange", "black"].includes(val),
    },
    size: {
      type: String,
      default: "s",
    },
  },
};
</script>

<style lang="scss">
.loader {
  display: inline-block;
  position: relative;

  &.color-orange div {
    border-color: var(--color-orange) transparent transparent transparent;
  }
  &.color-black div {
    border-color: var(--color-black) transparent transparent transparent;
  }

  &.m-s {
    width: 25px;
    height: 25px;

    div {
      margin: 8px;
      width: 18px;
      height: 18px;
    }
  }

  &.m-m {
    width: 39px;
    height: 39px;

    div {
      margin: 16px;
      width: 32px;
      height: 32px;
    }
  }

  &.m-l {
    width: 55px;
    height: 55px;

    div {
      margin: 15px;
      width: 48px;
      height: 48px;
    }
  }
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  left: -19%;
  top: -19%;
  border: 2px solid;
  border-color: var(--color-white) transparent transparent transparent;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
