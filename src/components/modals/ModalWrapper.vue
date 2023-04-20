<template>
  <CustomModal
    :name="name"
    width="'auto'"
    :classes="['modal', className, { big: isBig }]"
    @before-close="$emit('before-close')"
    @before-open="$emit('before-open', $event)"
  >
    <div class="modal__wrapper" :class="{ 'm-test': isTest }">
      <button class="modal__close" @click="$modal.hide(name)">
        <Icon name="cross-16" :size="16" color="orange" :isClickable="true" />
      </button>
      <slot />
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "@/packages/custom-modal/CustomModal";
import Icon from "@/packages/icon/Icon";

export default {
  name: "ModalWrapper",
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    isBig: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CustomModal,
    Icon,
  },
};
</script>

<style lang="scss">
.modal {
  margin: 0 auto;
  width: 335px;

  @media (min-width: 1024px) {
    width: 453px;
  }

  &.big {
    width: 335px;
    @media (min-width: 1024px) {
      width: 700px;
    }
  }

  &__wrapper {
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("@/assets/img/backgrounds/gradient-mobile.png");
    box-shadow: 0 4px 23px rgba(0, 0, 0, 0.5);
    margin-top: 52px;
    margin-bottom: 52px;

    &.m-test {
      background-image: url("@/assets/img/backgrounds/test-mobile.png");

      @media (min-width: 768px) {
        background-image: url("@/assets/img/backgrounds/test.png");
      }
    }

    @media (min-width: 768px) {
      background-image: url("@/assets/img/backgrounds/gradient.png");
    }

    @media (min-width: 1024px) {
      margin-top: 0;
      margin-right: 52px;
    }
  }

  &__close {
    position: absolute;
    top: -52px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-purple-100);
    height: 53px;
    width: 52px;
    border-radius: 0 50px 50px 0;
    transform: rotate(-90deg);

    @media (min-width: 1024px) {
      transform: none;
      top: 16px;
      right: -52px;
    }
  }
}
</style>
