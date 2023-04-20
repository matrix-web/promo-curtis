<template>
  <div class="dropdown" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      <p class="dropdown__value">
        {{ selected && selected.title ? selected.title : placeholder }}
      </p>
      <span class="dropdown__arrow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.26512 8.39999L12 13.0924L16.7349 8.39999L18 9.65377L12 15.6L6 9.65377L7.26512 8.39999Z"
            fill="#FCCA0B"
          />
        </svg>
      </span>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default ? this.default : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;

  &__arrow {
    &_active {
      transform: rotate(-135deg);
    }
  }

  &__value {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.dropdown .selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 16px;
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  background: rgba(0, 0, 0, 0.34);
  border: 1px solid var(--color-pink);
  box-shadow: 0 0 8px rgba(232, 17, 116, 0.44);
  border-radius: 5px;
  font-size: 10px;
  line-height: 15px;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 17px;
  }
}

.dropdown__arrow {
  transition: 0.3s ease;
  transform: translateY(3px);
}

.dropdown .selected.open {
  border: 1px solid var(--color-pink);
  border-radius: 6px 6px 0 0;

  & .dropdown__arrow {
    transform: rotate(180deg) translateY(3px);
  }
}

.dropdown .items {
  color: #fff;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  border-right: 1px solid var(--color-pink);
  border-left: 1px solid var(--color-pink);
  border-bottom: 1px solid var(--color-pink);
  position: absolute;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 999;
}

.dropdown .items div {
  color: #fff;
  padding-left: 1em;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  user-select: none;
  font-size: 10px;
  line-height: 15px;

  &.selected-item {
    background-color: var(--color-pink);
  }

  @media (min-width: 1024px) {
    font-size: 14px;
    line-height: 17px;
  }
}

.dropdown .items div:hover {
  background-color: var(--color-pink);
}

.selectHide {
  display: none;
}
</style>
