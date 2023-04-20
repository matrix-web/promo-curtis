<template>
  <div class="acc-content">
    <div class="container">
      <header class="acc-content__header">
        <Title
          :level="2"
          :weight="700"
          font="optima"
          is-uppercase
          color="orange"
        >
          Личный кабинет
        </Title>
      </header>
      <div class="acc-content__wrapper">
        <div class="acc-content__column">
          <div class="acc-content__user-info">
            <UserInfo
              :user="isAuth ? user : undefined"
              @onInvite="handleInvite"
              @onExchangePoints="handleExchange"
            />
            <Button
              class="acc-content__user-info-button"
              variant="orange"
              size="big"
              isRaised
              @click="handleRegisterCheck"
              >Зарегистрировать чек</Button
            >
          </div>
          <CardForm />
        </div>
        <div
          :class="[
            'acc-content__column',
            { 'center-column': isCategory && isCanQuiz },
          ]"
        >
          <div
            :class="[
              'acc-content__prize-category',
              {
                center: !isUserTest,
                spaced: !isCategory,
              },
            ]"
          >
            <PrizeCategory :category="categoryTitle" :is-unknown="isCategory" />
            <CategoryDefinition
              v-if="!isCategory && isCanQuiz"
              :is-unknown="isAuth ? user.tests === 0 : true"
              @click="goToTest"
            />
          </div>
          <div
            class="acc-content__prizes"
            v-if="isCategory && prizes[categoryNumber]?.prizes"
          >
            <Prizes
              :prizes="
                isAuth && isCategory ? prizes[categoryNumber]?.prizes : []
              "
              :is-category="isCategory"
            />
          </div>
          <div class="acc-content__tables">
            <div class="tabs">
              <button
                :class="[
                  'tabs__button',
                  {
                    active: tab.component === currentTab,
                  },
                ]"
                v-for="(tab, idx) in tabs"
                :key="idx"
                @click="handleChangeTab(tab)"
              >
                {{ tab.title }}
              </button>
            </div>
            <div class="acc-content__table">
              <component :is="currentTab" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Prizes from "@/components/account/Prizes.vue";
import Title from "@/packages/title/Title.vue";
import TableCheck from "./TableCheck.vue";
import TablePoints from "./TablePoints.vue";
import PrizeCategory from "./PrizeCategory.vue";
import UserInfo from "@/components/account/UserInfo.vue";
import CardForm from "@/components/account/CardForm.vue";
import CategoryDefinition from "./CategoryDefinition.vue";
import Button from "@/packages/newButton/Button.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { prizes } from "@/mocks/prizes";

export default {
  name: "AccountContent",
  components: {
    Title,
    CardForm,
    UserInfo,
    Button,
    CategoryDefinition,
    PrizeCategory,
    TableCheck,
    TablePoints,
    Prizes,
  },
  data() {
    return {
      prizes,
      tabs: [
        {
          component: "TableCheck",
          title: "Чеки",
        },
        {
          component: "TablePoints",
          title: "Баллы",
        },
      ],
      currentTab: "TableCheck",
    };
  },
  async mounted() {
    await this.getReceipts();
    await this.getTransactions();
    await this.getPrizes();
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
      receipts: (state) => state.receipts,
    }),
    ...mapGetters("userModule", [
      "isAuth",
      "isCanQuiz",
      "isNotQuiz",
      "isExchangePoints",
    ]),
    categoryTitle() {
      return this.isAuth && this.isCategory
        ? {
            title:
              this.categoryNumber >= 0
                ? this.prizes[this.categoryNumber]?.type
                : "",
            imgPath:
              this.categoryNumber >= 0
                ? this.prizes[this.categoryNumber]?.icon
                : "",
          }
        : undefined;
    },
    categoryNumber() {
      return this.isAuth
        ? this.prizes.findIndex((item) => item.category === this.user.category)
        : -1;
    },
    isCategory() {
      return this.isAuth ? !!this.user.category : false;
    },
    isUserTest() {
      return this.isAuth ? this.user.tests < 2 : false;
    },
  },
  methods: {
    ...mapActions("userModule", [
      "getReceipts",
      "getTransactions",
      "goToTest",
      "getPrizes",
    ]),
    handleExchange() {
      if (this.isExchangePoints) {
        this.$modal.show("exchange-points");
      } else {
        this.$modal.show("success", {
          text: "В текущем периоде призы за баллы закончились. Не расстраивайтесь! Баллы не сгорают, вы сможете их обменять в следующем периоде акции, стартующем в 10:00 в понедельник",
        });
      }
    },
    handleChangeTab(tab) {
      this.currentTab = tab.component;
    },
    handleRegisterCheck() {
      if (!this.isAuth) {
        this.$modal.show("alert");
      } else {
        if (this.isNotQuiz) {
          this.$toast.open({
            position: "top",
            message: "Для регистрации чека необходимо пройти тест",
            type: "info",
            duration: 6000,
          });
        } else {
          this.$modal.show("check");
        }
        gtag("event", "register_check", { event_category: "click_button" }); // eslint-disable-line
      }
    },
    async handleInvite() {
      gtag("event", "click_friend", { event_category: "button_sher_friend" }); // eslint-disable-line
      await navigator.clipboard
        .writeText(
          `https://yourdesire.curtistea.com?referral_code=${this.user.referral_code}`
        )
        .then(() =>
          this.$toast.open({
            message: "Ccылка скопирована",
            type: "success",
            duration: 3000,
          })
        );
    },
  },

  watch: {
    async user() {
      if (this.user) {
        await this.getReceipts();
        await this.getTransactions();
        await this.getPrizes();
      }
    },
    receipts() {
      if (this.receipts) {
        let modals = [];

        this.receipts.forEach((receipt) => {
          const isAllDataSend = receipt.prizes.every(
            (prize) => prize.prize.need_delivery && prize.passport
          );

          if (!isAllDataSend) {
            const deliveryPrizes = receipt.prizes.filter(
              (item) => item.prize.need_delivery && !item.passport
            );

            modals = [
              ...modals,
              ...deliveryPrizes.map((prize) => {
                return {
                  type: prize.prize.need_passport ? "special" : "default",
                  winner_id: prize.id,
                  prize: prize.prize.name,
                };
              }),
            ];
          }
        });

        console.log("modals", modals);

        if (modals.flat().length) {
          this.$modal.show("delivery", {
            index: 0,
            modals,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.acc-content {
  padding: 52px 0 60px;
  background-image: url("@/assets/img/backgrounds/blur-account.png"),
    url("@/assets/img/backgrounds/background.png"),
    url("@/assets/img/backgrounds/blur-account.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: -200px 90px, center;

  @media (min-width: 1240px) {
    padding: 80px 0 85px;
  }

  &__user-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    div {
      margin-bottom: 28px;

      @media (min-width: 1024px) {
        margin-bottom: 21px;
      }
    }
  }

  &__user-info-button {
    align-self: center;
  }

  &__prizes {
    margin: 54px 0 78px;

    @media (min-width: 1240px) {
      margin: 48px 0 100px;
    }
  }

  &__header {
    display: flex;
    justify-content: center;
    margin: 0 0 24px;

    @media (min-width: 1024px) {
      margin: 0 0 45px;
    }
  }

  &__prize-category {
    display: flex;
    flex-direction: column;
    align-items: center;

    &.spaced {
      margin-bottom: 100px;

      @media (min-width: 1240px) {
        margin-bottom: 78px;
      }
    }

    div:not(:last-of-type) {
      margin-bottom: 24px;

      @media (min-width: 1240px) {
        margin-bottom: 0;
        margin-right: 60px;
      }
    }

    &.center {
      justify-content: center;
    }

    @media (min-width: 1240px) {
      flex-direction: row;
      align-items: initial;
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 78px;

    @media (min-width: 1240px) {
      grid-template-columns: 300px 1fr;
      gap: 90px;
      padding: 0 20px;
    }

    @media (min-width: 1440px) {
      padding: 0;
    }
  }

  &__column {
    &:first-child {
      display: flex;
      flex-direction: column;

      .card-form {
        display: none;

        @media (min-width: 1240px) {
          display: flex;
        }
      }
    }

    &.center-column {
      align-items: center;
    }

    &:last-child {
      display: flex;
      flex-direction: column;
    }
  }
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  &__button {
    font-family: var(--font-optima);
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;
    color: var(--color-white);

    &:not(:last-child) {
      margin-right: 26px;

      @media (min-width: 1024px) {
        margin-right: 40px;
      }
    }

    @media (min-width: 1240px) {
      font-size: 36px;
      line-height: 45px;
    }

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--color-white);
    }

    &.active {
      color: var(--color-orange);

      &::after {
        background-color: var(--color-orange);
      }
    }
  }
}

.container {
  max-width: 1240px;
  margin: 0 auto;
}
</style>
