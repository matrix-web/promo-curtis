<template>
  <div>
    <Table
      :isBlock="isBlock"
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :current-page="currentPage"
      @pagechanged="handlePageChange"
    />
  </div>
</template>

<script>
import Table from "@/packages/table/Table.vue";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "TablePoints",
  components: {
    Table,
  },
  data() {
    return {
      currentPage: 1,
      tableHeaders: [
        {
          name: "Дата/время начисления баллов",
          field: "date",
        },
        {
          name: "Количество баллов",
          field: "countPoints",
        },
        {
          name: "За что было начисление",
          field: "type",
        },
      ],
      tableData: [],
      isBlock: true,
    };
  },
  mounted() {
    this.getTableData();
  },
  watch: {
    transactions() {
      this.getTableData();
    },
  },
  computed: {
    ...mapState("userModule", {
      transactions: (state) => state.transactions,
    }),
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    },
    getTableData() {
      if (this.transactions.length) {
        this.tableData = this.transactions.map((item) => {
          return {
            isNonClick: true,
            date: moment(item.created_at).format("DD.MM.YYYY HH:mm"),
            countPoints: item.points,
            type: item.type,
          };
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
