<template>
  <div class="table">
    <Table
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :isBlock="isBlock"
      :totalPages="totalPages"
      :perPage="perPage"
      :currentPage="currentPage"
      @pagechanged="(page) => $emit('pagechanged', page)"
    />
  </div>
</template>

<script>
import Table from "@/packages/table/Table.vue";

export default {
  name: "WinnersTable",
  components: {
    Table,
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
      default: 0,
    },
    tableHeaders: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    isBlock: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  min-width: 375px;
}
</style>
