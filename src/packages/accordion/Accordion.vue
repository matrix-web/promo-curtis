<template>
  <div class="accordion">
    <div
      class="accordion__item"
      v-for="(accordionItem, index) in changedItems"
      :key="accordionItem.id"
    >
      <div class="accordion__header" @click="handleActive(accordionItem)">
        <p class="accordion__title">
          <span class="accordion__title-index">{{
            index + 1 < 10 ? `0${index + 1}` : index + 1
          }}</span>
          {{ accordionItem.title }}
        </p>
        <span
          :class="[
            'accordion__arrow',
            {
              accordion__arrow_active: isMultiple
                ? accordionItem.isActive
                : activeItem === accordionItem,
            },
          ]"
        ></span>
      </div>
      <Transition
        name="accordion"
        @before-enter="beforeEnter"
        @before-leave="beforeLeave"
        @enter="enter"
        @leave="leave"
      >
        <div
          class="accordion__content"
          v-html="accordionItem.content"
          v-show="isMultiple ? accordionItem.isActive : activeItem === accordionItem"
        ></div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeItem: null,
      itemsList: this.items,
    };
  },
  computed: {
    changedItems: {
      set(value) {
        this.itemsList = value;
      },
      get() {
        return this.itemsList;
      },
    },
  },
  mounted() {
    this.changedItems = this.items.map((item) => ({ ...item, isActive: false }));
  },
  methods: {
    beforeEnter(el) {
      el.style.height = "0";
    },
    enter(el) {
      el.style.height = `${el.scrollHeight}px`;
    },
    beforeLeave(el) {
      el.style.height = `${el.scrollHeight}px`;
    },
    leave(el) {
      el.style.height = "0";
    },
    handleActive(item) {
      if (!this.isMultiple) {
        this.activeItem = item;
      } else {
        item.isActive = !item.isActive;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  display: block;
  width: 100%;

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__arrow {
    display: block;
    position: absolute;
    right: 10px;
    top: 50%;
    width: 13px;
    height: 13px;
    border-bottom: 2px solid #e81174;
    border-right: 2px solid #e81174;
    transition: 0.3s;
    transform-origin: center;
    transform: rotate(45deg) translateY(-50%);

    @media (min-width: 480px) {
      right: 24px;
    }

    &_active {
      transform: rotate(-135deg);
    }
  }

  &__item {
    padding: 23px 10px 16px;
    background: rgba(0, 0, 0, 0.34);
    border: 1px solid var(--color-red);
    box-shadow: 0px 0px 8px rgba(232, 17, 116, 0.44);
    border-radius: 5px;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 7px;
    }

    @media (min-width: 1024px) {
      padding: 13px 23px 13px 32px;
    }
  }

  &__title {
    max-width: 90%;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--color-white);

    @media (min-width: 1024px) {
      font-size: 24px;
      line-height: 26px;
    }

    &-index {
      font-family: var(--font-optima);
      font-weight: 400;
      font-size: 32px;
      line-height: 33px;
      text-align: center;
      text-transform: uppercase;
      color: var(--color-orange);
      text-shadow: 0px 0px 16px #e81174;
      margin-right: 10px;

      @media (min-width: 1024px) {
        font-size: 42px;
        line-height: 43px;
        margin-right: 28px;
      }
    }
  }

  &__content {
    font-size: 12px;
    line-height: 22px;
    font-weight: 400;
    color: var(--color-white);
    transition: 150ms ease-out;
    overflow: hidden;

    @media (min-width: 1024px) {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
