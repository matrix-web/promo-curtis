<template>
  <section class="info-points" id="points">
    <div class="container">
      <header class="info-points__header">
        <Title
          :level="2"
          :weight="700"
          font="optima"
          color="orange"
          is-uppercase
        >
          Копи баллы и получай<br />
          гарантированные призы
        </Title>
      </header>
      <div class="info-points__content">
        <div class="info-points__block">
          <div class="info-points__block-title">
            <Title
              :level="3"
              :weight="700"
              font="optima"
              color="white"
              is-uppercase
              >Как накопить баллы?</Title
            >
          </div>
          <div class="point-items">
            <div
              v-for="(point, idx) in pointsData"
              :key="point.id"
              :class="[
                'point-items__item',
                { 'point-items__item-row': idx > 1 },
              ]"
            >
              <div class="badge info-points__badge">
                <span class="badge__text">{{ point.points }}</span> баллов
              </div>
              <p class="point-items__item-title">
                <button
                  v-if="point.linkTextTitle"
                  :disabled="isShared"
                  class="point-items__item-link point-items__item-link_special"
                  v-on:click="handleShare"
                >
                  {{ point.linkTextTitle }}
                </button>
                {{ point.title }}
              </p>
              <p v-if="point.text" class="point-items__item-small-text">
                {{ point.text }}
              </p>
              <a v-else v-scroll-to="'#FAQ'" class="point-items__item-link">{{
                point.linkText
              }}</a>
            </div>
          </div>
        </div>
        <div class="info-points__block">
          <div class="info-points__block-title">
            <Title
              :level="3"
              :weight="700"
              font="optima"
              color="white"
              is-uppercase
              >Сертификаты для тебя</Title
            >
          </div>
          <BlurContainer
            :is-raised-big="isRaisedBig"
            :is-raised-small="isRaisedSmall"
            :color="color"
          >
            <Slider :slides="slides" colorBlur="orange" />
          </BlurContainer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "@/packages/title/Title.vue";
import Slider from "@/components/promo/Slider.vue";
import BlurContainer from "@/components/common/BlurContainer.vue";
import { mapGetters } from "vuex";

export default {
  name: "InformationPoints",
  props: {
    isRaisedBig: {
      type: Boolean,
      default: true,
    },
    isRaisedSmall: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "orange",
      valudator: (value) => ["orange", "purple"].includes(value),
    },
  },
  components: {
    Title,
    Slider,
    BlurContainer,
  },
  data() {
    return {
      pointsData: [
        {
          id: 1,
          points: "10-20",
          title: "Купить чай Curtis",
          linkText: "Уточни кол-во баллов в FAQ",
        },
        {
          id: 2,
          points: "10",
          title: "ссылкой на тест в соц. сетях",
          linkTextTitle: "Поделиться",
        },
        {
          id: 3,
          points: "10",
          title: "Пригласить друга",
          text: "Ищи ссылку-приглашение в личном кабинете",
        },
        {
          id: 4,
          points: "10",
          title: "Смотреть Стримы на Twitch",
          linkText: "Узнай подробности в FAQ",
        },
        {
          id: 5,
          points: "50",
          title: "Повторить продуктовую корзину стримера",
          linkText: "Смотри детали в FAQ",
        },
      ],
      slides: [
        {
          id: 1,
          img: {
            img: require("@/assets/img/cards/card-1000.png"),
            webp: require("@/assets/img/cards/card-1000.webp"),
          },
          title: "Сертификат номиналом 1000 рублей",
          points: 400,
        },
        {
          id: 2,
          img: {
            img: require("@/assets/img/cards/card-750.png"),
            webp: require("@/assets/img/cards/card-750.webp"),
          },
          title: "Сертификат номиналом 750 рублей",
          points: 300,
        },
        {
          id: 3,
          img: {
            img: require("@/assets/img/cards/card-500.png"),
            webp: require("@/assets/img/cards/card-500.webp"),
          },
          title: "Сертификат номиналом 500 рублей",
          points: 200,
        },
        {
          id: 4,
          img: {
            img: require("@/assets/img/cards/card-250.png"),
            webp: require("@/assets/img/cards/card-250.webp"),
          },
          title: "Сертификат номиналом 250 рублей",
          points: 100,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("userModule", ["isAuth", "isShared"]),
  },
  methods: {
    handleShare() {
      this.$modal.show("share");
    },
  },
};
</script>

<style lang="scss" scoped>
.info-points {
  padding: 95px 0 50px;
  background-image: url("@/assets/img/backgrounds/background-1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 1440px) {
    padding: 95px 0 60px;
  }

  &__header {
    max-width: 610px;
    text-align: center;
    margin: 0 auto 32px auto;
    padding: 0 20px;

    @media (min-width: 1024px) {
      margin: 0 auto 67px auto;
      padding: 0;
    }
  }

  &__block {
    &:first-child {
      margin-bottom: 60px;
      padding: 0 20px;
    }

    &:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width: 1440px) {
        display: block;
        flex-direction: initial;
        align-items: initial;
        align-self: initial;
      }

      .info-points__block-title {
        padding: 0 20px;

        @media (min-width: 1024px) {
          padding: 0;
        }
      }
    }

    @media (min-width: 1440px) {
      margin-bottom: 0;
      padding: 0;
    }
  }

  &__block-title {
    margin-bottom: 22px;
    text-align: center;

    @media (min-width: 1024px) {
      text-align: left;
    }
  }

  &__content {
    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1440px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 120px;
    }
  }

  &__badge {
    margin-bottom: 4px;
  }
}

.point-items {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 25px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  &__item {
    &-row {
      @media (min-width: 768px) {
        grid-column: span 2;
      }
    }

    &-title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: var(--color-white);

      @media (min-width: 1024px) {
        font-size: 18px;
      }

      @media (min-width: 1440px) {
        font-size: 22px;
        line-height: 24px;
      }
    }

    &-small-text {
      font-size: 12px;
      line-height: 22px;
      font-weight: 400;
      color: var(--color-white);

      @media (min-width: 1024px) {
        font-size: 16px;
        line-height: 24px;
      }
    }

    &-link {
      font-size: 12px;
      line-height: 22px;
      font-weight: 400;
      color: var(--color-orange);
      text-decoration: underline;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (min-width: 1024px) {
        font-size: 15px;
        line-height: 24px;
      }

      @media (min-width: 1440px) {
        font-size: 16px;
      }

      &_special {
        font-size: 16px;
        line-height: 22px;
        font-weight: 700;

        @media (min-width: 1024px) {
          font-size: 18px;
        }

        @media (min-width: 1440px) {
          font-size: 22px;
          line-height: 24px;
        }
      }
    }
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 90px;
  background-color: var(--color-orange);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: var(--color-black);

  @media (min-width: 1024px) {
    font-size: 16px;
    line-height: 16px;
  }

  @media (min-width: 1440px) {
    min-width: 135px;
  }

  &__text {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin-right: 6px;

    @media (min-width: 1024px) {
      font-size: 16px;
      line-height: 24px;
    }

    @media (min-width: 1440px) {
      font-size: 21px;
      line-height: 27px;
    }
  }
}

.container {
  @media (min-width: 1440px) {
    max-width: 1300px;
    margin: 0 auto;
  }
}
</style>
