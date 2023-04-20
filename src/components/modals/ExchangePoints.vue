<template>
  <ModalWrapper
    name="exchange-points"
    isBig
    class="exchange-points-modal"
    @before-close="reset"
  >
    <div class="exchange-points-modal__wrapper">
      <header class="exchange-points-modal__header">
        <Title
          class="exchange-points-modal__title"
          font="optima"
          :weight="700"
          :level="4"
          color="white"
          :is-uppercase="true"
          >Обменять баллы</Title
        >
        <p class="exchange-points-modal__subtitle">
          Вам доступно
          <span class="exchange-points-modal__subtitle_style"
            >{{ totalPoints }} баллов</span
          >
        </p>
      </header>
      <div class="cards">
        <div
          :class="[
            'card-points',
            {
              active:
                selectedPoint !== null
                  ? selectedPoint?.type === point?.type
                  : false,
              inactive:
                selectedPoint !== null
                  ? selectedPoint?.type !== point?.type
                  : true,
              blocked: !point.isAvailiable || isAlreadyGet(point?.type),
            },
          ]"
          v-for="(point, index) in prizesList"
          :key="index"
          @click="handleExchangePoints(point)"
        >
          <div class="card-points__img">
            <Picture
              loading="lazy"
              :url="
                img(
                  ['', require(`@/assets/img/cards/${point.img}.png`), ''],
                  ['', require(`@/assets/img/cards/${point.img}.webp`), '']
                )
              "
              alt="points"
            />
          </div>
          <div class="card-points__badge">
            <span class="card-points__badge-count">{{ point.points }}</span>
            баллов
          </div>
        </div>
      </div>
      <div class="exchange-points-modal__action">
        <Button
          @click="handleExchange"
          size="big"
          :disabled="!selectedPoint"
          isRaised
          :is-loading="isLoading"
          >Обменять</Button
        >
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import Title from "@/packages/title/Title";
import Button from "@/packages/newButton/Button.vue";
import ModalWrapper from "@/components/modals/ModalWrapper";

import { mapActions, mapState, mapMutations } from "vuex";
import { PrizesEnum } from "@/helpers/enums";
import { certificates } from "@/mocks/certificates";
import Vue from "vue";
import Picture from "@/components/common/Picture";
import { img } from "@/helpers/utils";

export default {
  name: "ExchangePoints",
  props: {
    totalPoints: {
      type: Number,
      default: 200,
    },
  },
  components: {
    Picture,
    ModalWrapper,
    Title,
    Button,
  },
  data() {
    return {
      certificates,
      selectedPoint: null,
      isLoading: false,
    };
  },
  mounted() {},
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
      prizes: (state) => state.prizes,
    }),
    prizesList() {
      let arr = [];
      for (let key in this.prizes) {
        const enumType = this.getTypeFromEnum(key);
        arr.push({
          img: key,
          type: enumType,
          points: certificates[enumType],
          isAvailiable: this.prizes[key],
        });
      }
      return arr;
    },
  },
  methods: {
    ...mapActions("userModule", ["choosePrize", "getUser", "prizeTimeout"]),
    ...mapMutations("userModule", ["setIsChoosePrize"]),
    img,
    getTypeFromEnum(string) {
      return Object.keys(PrizesEnum).find(
        (item) => PrizesEnum[item] === string
      );
    },
    reset() {
      this.selectedPoint = null;
      this.isLoading = false;
    },
    handleExchangePoints(point) {
      this.selectedPoint = point;
    },
    isAlreadyGet(type) {
      return this.user?.points_prizes[PrizesEnum[type]];
    },
    async handleExchange() {
      this.isLoading = true;
      await this.choosePrize(PrizesEnum[this.selectedPoint.type])
        .then(async (res) => {
          console.log(res);
          if (res.data.success) {
            this.$toast.open({
              message: `<p>Обмен баллов произведен. <br/> Следующая транзакция будет доступна через 30 секунд</p>`,
              type: "success",
              duration: 6000,
            });
            this.prizeTimeout();
            this.setIsChoosePrize(false);
            await this.getUser();
            this.reset();
            this.$modal.hide("exchange-points");
          }
          if (!res.data.success) {
            this.$toast.open({
              message: res.data.response.message,
              type: "error",
              duration: 6000,
            });
          }
        })
        .catch((e) => {
          console.error(e.response);
          Vue.$toast.open({
            message: e.response.data.response.message,
            type: "error",
            duration: 6000,
          });
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange-points-modal {
  &__wrapper {
    padding: 40px 40px 30px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }

  &__title {
  }

  &__subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 37px;
    color: var(--color-white);

    &_style {
      color: var(--color-orange);
    }
  }

  &__action {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
  }
}

.cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    align-items: initial;
    flex-direction: row;
    justify-content: space-around;
  }
}

.card-points {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 135px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 40px;

    @media (min-width: 1024px) {
      margin-bottom: 0;
    }
  }

  &.active {
    .card-points__img {
      &::after {
        background: #7e4110;
      }
    }
  }

  &.inactive {
    .card-points__img {
      &::after {
        background: rgba(126, 65, 16, 0.6);
      }
    }
  }

  &.blocked {
    pointer-events: none;
    .card-points__img {
      &::after {
        background: transparent;
      }
    }

    .card-points__badge {
      background: var(--color-gray);
      color: var(--color-light-gray);
    }

    .card-points__badge-count {
      color: var(--color-light-gray);
    }
  }
}
.card-points__img {
  position: relative;
  z-index: 9;
  margin-bottom: 20px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    display: block;
    width: 135px;
    height: 135px;
    background: #7e4110;
    filter: blur(24.5px);
  }
}
.card-points__badge {
  position: relative;
  z-index: 9;
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  background: var(--color-orange);
  border-radius: 90px;
  font-family: var(--font-walsheim);
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-black);
}
.card-points__badge-count {
  margin-right: 6px;
  font-family: var(--font-walsheim);
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 126.62%;
  text-align: center;
  color: var(--color-black);
}
</style>
