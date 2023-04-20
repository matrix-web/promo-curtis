<template>
  <div>
    <Table
      :isBlock="isBlock"
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :current-page="currentPage"
      @click="handleRowClick"
      @pagechanged="handlePageChange"
    />
  </div>
</template>

<script>
import Table from "@/packages/table/Table.vue";
import { mapState } from "vuex";
import moment from "moment/moment";

export default {
  name: "TableCheck",
  components: {
    Table,
  },
  data() {
    return {
      currentPage: 1,
      tableHeaders: [
        {
          name: "Дата/время загрузки чека",
          field: "date",
        },
        {
          name: "Сумма чека",
          field: "sum",
        },
        {
          name: "Статус",
          field: "status",
        },
        {
          name: "Приз",
          field: "prize",
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
    receipts() {
      this.getTableData();
    },
  },
  computed: {
    ...mapState("userModule", {
      receipts: (state) => state.receipts,
    }),
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    getTableData() {
      if (this.receipts.length) {
        this.tableData = this.receipts.map((item) => {
          return {
            id: item.id,
            isNonClick: item.prizes.length
              ? item.prizes.every(
                  (prize) => prize.passport || !prize.prize.need_delivery
                )
              : true,
            date: moment(item.created_at).format("DD.MM.YYYY HH:mm"),
            sum: item.s + " ₽",
            status: item.description,
            prize: item.prizes.length
              ? item.prizes.map((item) => item.prize.name).join(", ")
              : "",
          };
        });
      }
    },
    handleRowClick(row) {
      if (row.prize) {
        const receipt = this.receipts.find((item) => item.id === row.id);
        const isAllDataSend = receipt.prizes.every(
          (prize) => prize.prize.need_delivery && prize.passport
        );

        if (isAllDataSend) {
          this.$toast.open({
            message: "Все данные по доставке заполнены",
            type: "info",
            duration: 3000,
          });
        } else {
          const deliveryPrizes = receipt.prizes.filter(
            (item) => item.prize.need_delivery && !item.passport
          );

          if (deliveryPrizes.length) {
            this.$modal.show("delivery", {
              index: 0,
              modals: deliveryPrizes.map((prize) => {
                return {
                  type: prize.prize.need_passport ? "special" : "default",
                  winner_id: prize.id,
                  prize: prize.prize.name,
                };
              }),
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
