<template>
  <section class="winners content">
    <div class="container">
      <header class="winners__header">
        <Title
          :level="2"
          :weight="700"
          font="optima"
          is-uppercase
          color="orange"
          >Победители</Title
        >
      </header>
      <!--      <div class="winners__message-wrapper" v-if="!tableData.length">-->
      <!--        <Title-->
      <!--          :level="4"-->
      <!--          :weight="700"-->
      <!--          font="optima"-->
      <!--          is-uppercase-->
      <!--          color="orange"-->
      <!--          >Победители будут определены позднее</Title-->
      <!--        >-->
      <!--      </div>-->
      <div class="winners__content">
        <div class="winners__fields">
          <div class="winners__field">
            <Dropdown
              :options="datesOptions"
              :default="date"
              placeholder="Дата розыгрыша"
              @input="handleDate"
            />
          </div>
          <div class="winners__field">
            <Input
              v-model="phone"
              placeholder="Телефон"
              isSearch
              :mask="'+7 (###) ###-##-##'"
              @search="handleSearch"
              @enter="handleSearch"
            />
          </div>
          <div class="winners__field">
            <Dropdown
              :options="prizesOptions"
              :default="prize"
              placeholder="Наименование приза"
              @input="handlePrize"
            />
          </div>
        </div>
        <div class="winners__table">
          <TableWinners
            :table-headers="tableHeaders"
            :table-data="tableData"
            :is-block="true"
            :totalPages="meta?.last_page"
            :perPage="meta?.per_page"
            :currentPage="meta?.current_page"
            @pagechanged="handlePageChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Dropdown from "@/packages/dropdown/Dropdown.vue";
import Input from "@/packages/forms/input/Input.vue";
import Title from "@/packages/title/Title.vue";
import TableWinners from "./TableWinners.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "WinnersContent",
  components: {
    Title,
    Input,
    Dropdown,
    TableWinners,
  },
  data() {
    return {
      phone: "",
      currentPage: 1,
      prize: null,
      date: null,
      dates: [
        "08.03.2023",
        "14.03.2023",
        "22.03.2023",
        "29.03.2023",
        "05.04.2023",
        "12.04.2023",
        "19.04.2023",
        "26.04.2023",
        "03.05.2023",
        "10.05.2023",
        "18.05.2023",
      ],
      options: [],
      tableHeaders: [
        {
          name: "Дата розыгрыша",
          field: "date",
        },
        {
          name: "Имя участника",
          field: "name",
        },
        {
          name: "Телефон",
          field: "phone",
        },
        {
          name: "Наименование приза",
          field: "prize",
        },
      ],
    };
  },
  async created() {
    this.getWinners();
  },
  computed: {
    ...mapState("winnersModule", {
      prizes: (state) => state.prizes,
      winners: (state) => state.winners,
    }),
    tableData() {
      if (this.winners && this.winners.data?.length) {
        return this.winners.data.map((item) => {
          return {
            isNonClick: true,
            date: item.created_at,
            name: item.name,
            phone: item.phone,
            prize: item.prize,
          };
        });
      }

      return [];
    },
    meta() {
      if (this.winners && this.winners?.meta) {
        return this.winners.meta;
      }
      return undefined;
    },
    prizesOptions() {
      if (this.prizes) {
        return [
          {
            title: "Все",
            value: undefined,
          },
          ...Object.values(this.prizes).map((item) => {
            return {
              title: item,
              value: item,
            };
          }),
        ];
      }

      return [];
    },
    datesOptions() {
      return [
        {
          title: "Все",
          value: undefined,
        },
        ...this.dates.map((item) => {
          const [day, month, year] = item.split(".");

          return {
            title: item,
            value: `${year}-${month}-${day}`,
          };
        }),
      ];
    },
  },
  methods: {
    ...mapActions("winnersModule", ["getWinners"]),
    setNewSelectedOption(selectedOption) {
      this.config.placeholder = selectedOption.value;
    },
    handlePageChange(page) {
      console.log(page);
      this.currentPage = page;
      this.handleFilters();
    },
    handleSearch(val) {
      this.phone = val;
      this.handleFilters();
    },
    async handleFilters() {
      await this.getWinners({
        page: this.currentPage,
        date_from: undefined,
        date_to: undefined,
        phone: this.phone ? this.phone.replace(/[^0-9]/g, "") : undefined,
        prize: this.prize ? this.prize.value : undefined,
        date: this.date ? this.date.value : undefined,
      });
    },
    handlePrize(val) {
      if (!this.prize || this.prize.value !== val.value) {
        this.prize = val;
        this.handleFilters();
      }
    },
    handleDate(val) {
      if (!this.date || this.date.value !== val.value) {
        this.date = val;
        this.handleFilters();
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.winners {
  padding: 80px 0 73px;

  @media (min-width: 768px) {
    padding: 80px 20px 73px;
  }

  &__message-wrapper {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  &__fields {
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    row-gap: 12px;
    column-gap: 12px;
    margin-bottom: 40px;
    padding: 0 20px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 40px;
      justify-content: space-between;
      padding: 0;
    }
  }

  &__field {
    @media (min-width: 1024px) {
      min-width: 310px;
    }
  }

  &__table {
    overflow-x: auto;
    overflow-y: hidden;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
