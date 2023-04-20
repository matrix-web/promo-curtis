<template>
  <Modal
    :name="name"
    :adaptive="isAdaptive"
    :resizable="isResizable"
    :draggable="isDraggable"
    :scrollable="isScrollable"
    :focusTrap="isFocusTrap"
    :reset="isReset"
    :transition="transition"
    :overlayTransition="overlayTransition"
    :classes="classes"
    :styles="styles"
    :width="width"
    :height="height"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </Modal>
</template>

<script>
export default {
  name: "CustomModal",
  props: {
    name: {
      type: String,
      default: "",
    },
    isAdaptive: {
      type: Boolean,
      default: true,
    },
    isResizable: {
      type: Boolean,
      default: false,
    },
    isDraggable: {
      type: [Boolean, String],
      default: false,
    },
    isScrollable: {
      type: Boolean,
      default: false,
    },
    isFocusTrap: {
      type: Boolean,
      default: false,
    },
    isReset: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
    },
    overlayTransition: {
      type: String,
    },
    classes: {
      type: [String, Array],
    },
    styles: {
      type: [String, Array, Object],
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
      default: "auto",
    },
  },
};
</script>

<style lang="scss">
.vm--modal {
  background-color: transparent !important;
  overflow-y: auto !important;
  border-radius: 0 !important;
  box-shadow: none !important;

  @media (min-width: 1024px) {
    overflow: auto !important;
  }
}

.vm--overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 77.47%, #000000 100%);
  opacity: 0.4;
  backdrop-filter: blur(9px);
}
</style>
