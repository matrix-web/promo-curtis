<template>
  <div>
    <table :class="['table', { block: isBlock }]">
      <thead class="table-head">
        <tr class="table-head__row">
          <th
            class="table-head__heading"
            v-for="(head, idx) in tableHeaders"
            :key="idx"
          >
            {{ head.name }}
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          class="table-body__row"
          :class="{ pointer: !row.isNonClick }"
          v-for="(row, idx) in $route.name === 'winners' ? pageData : currentPageData"
          :key="idx"
          @click="row.isNonClick ? null : $emit('click', row)"
        >
          <td
            class="table-body__cell"
            v-for="(cell, idx) in tableFileds"
            :key="idx"
          >
            {{ row[cell] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-wrapper" v-if="totalPagesFromData > 1">
      <Pagination
        :totalPages="totalPagesFromData"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/packages/pagination/Pagination.vue";

export default {
  name: "Table",
  components: {
    Pagination,
  },
  props: {
    totalPages: {
      type: Number,
    },
    perPage: {
      type: Number,
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    tableHeaders: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    tableFileds() {
      return this.tableHeaders.map((header) => header.field);
    },
    totalPagesFromData() {
      return this.totalPages !== undefined
        ? this.totalPages
        : Math.ceil(this.tableData.length / this.perPage);
    },
    tableDataPaginationArray() {
      let dividedData = [];

      for (let i = 0; i <= this.tableData.length; i += this.perPage) {
        dividedData.push(this.tableData.slice(i, i + this.perPage));
      }

      return dividedData;
    },
    pageData() {
      return this.tableData
    }, 
    currentPageData() {
      return this.tableDataPaginationArray[this.currentPage - 1];
    },
  },
  methods: {
    onPageChange(page) {
      this.$emit("pagechanged", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  background: rgba(228, 0, 164, 0.2);

  &.block {
    width: 100%;
  }
}
.table-head {
}
.table-head__row {
  background: var(--color-pink);
  border-radius: 2px 2px 0 0;
}
.table-head__heading {
  padding: 8px 10px;
  font-family: var(--font-optima);
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: var(--color-white);

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 16px;
    padding: 15px 40px;
  }
}
.table-body {
}
.table-body__row {
  &.pointer {
    cursor: pointer;
  }
  &:nth-child(odd) {
    background: rgba(0, 0, 0, 0.2);
  }
}
.table-body__cell {
  padding: 14px 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: var(--color-white);
  text-align: center;
  font-family: var(--font-regular);

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 18px;
    padding: 14px 40px;
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
