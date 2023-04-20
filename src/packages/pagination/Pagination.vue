<template>
  <ul class="pagination">
    <!-- <li class="pagination-item">
      <button
        class="pagination-item__button pagination-item__button_first"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >
        first
      </button>
    </li> -->
    <li class="pagination-item">
      <button
        class="pagination-item__button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        <img src="@/assets/img/svg/prev-arrow.svg" alt="prev"/>
      </button>
    </li>
    <li class="pagination-item" v-for="page in pages" :key="page.name">
      <button
        type="button"
        class="pagination-item__button"
        @click="onClickPage(page.name)"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>
    <li class="pagination-item">
      <button
        class="pagination-item__button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >
        <img src="@/assets/img/svg/next-arrow.svg" alt="next" />
      </button>
    </li>

    <!-- <li class="pagination-item">
      <button
        class="pagination-item__button pagination-item__button_last"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >
        Last
      </button>
    </li> -->
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (
        this.currentPage === 1 ||
        this.currentPage <= this.maxVisibleButtons
      ) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages + 1 - this.maxVisibleButtons;
      }

      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  list-style-type: none;
}

.pagination-item {
  display: inline-block;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &__button {
    font-family: var(--font-optima);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: var(--color-white);

    &_first {
      text-transform: uppercase;
    }

    &_last {
      text-transform: uppercase;
    }

    &:disabled {
      opacity: 0.3;
    }
  }
}

.active {
  color: var(--color-pink);
}
</style>
