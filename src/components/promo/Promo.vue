<template>
  <section class="promo">
    <Picture
      :url="background"
      :mobile-url="mobileBackground"
      :is-mobile="true"
      class-name="promo__back"
      alt="background"
    />
    <div class="promo__back-wrapper">
      <Button
        @click="$emit('onMainPage')"
        :variant="isMagnit ? 'pink' : 'red'"
        size="middle"
        isRaised
      >
        {{ isMagnit ? "Вернуться на главную страницу" : "Wow-призы в " }}
        <img
          v-if="!isMagnit"
          loading="lazy"
          :src="require('@/assets/img/svg/magnit-white.svg')"
          alt="magnit"
          width="82"
          height="14"
        />
      </Button>
    </div>
    <div class="promo-title-wrapper">
      <h1 class="promo__title">
        <span class="promo__title-count">80 000</span>
        <span class="promo__title-text"
          >призов<br />
          уже ждут тебя</span
        >
      </h1>
    </div>
    <div class="promo-content">
      <div
        :class="['promo__block-left', { isMagnit: isMagnit }]"
        :style="isOpenMenu ? styleIndex : {}"
      >
        <Title
          color="orange"
          font="optima"
          :level="2"
          :weight="700"
          is-uppercase
          >Прислушайся к себе</Title
        >
        <Button
          @click="handlePrize"
          v-scroll-to="'#prizes'"
          variant="orange"
          size="big"
          isRaised
          >Выбрать призы</Button
        >
      </div>
      <div class="promo__img">
        <Picture
          :url="
            img(
              ['', require('@/assets/img/packs/curtis-packs.png'), ''],
              ['', require('@/assets/img/packs/curtis-packs.webp'), '']
            )
          "
          :sizes="{
            mobile: '280px',
            tablet: '350px',
            laptop: '',
            desktop: '503px',
          }"
          alt="curtis"
        />
      </div>
      <div class="promo__block-right" :style="isOpenMenu ? styleIndex : {}">
        <Title
          class="promo__block-right-title"
          color="orange"
          font="optima"
          :level="2"
          :weight="700"
          is-uppercase
        >
          Осуществи<br />
          свои желания<br />
          <template v-if="isMagnit">
            с
            <img src="@/assets/img/svg/magnit-text.svg" alt="магнит" />
          </template>
        </Title>
        <Button
          @click="handleRegisterCheck"
          variant="orange"
          size="big"
          isRaised
          >Зарегистрировать чек</Button
        >
      </div>
    </div>
    <div class="promo__line">
      <Picture
        :url="
          img(
            ['', require('@/assets/img/backgrounds/line-promo.png'), ''],
            ['', require('@/assets/img/backgrounds/line-promo.webp'), '']
          )
        "
        alt="line"
      />
    </div>
  </section>
</template>

<script>
import Title from "@/packages/title/Title.vue";
import Button from "@/packages/newButton/Button.vue";
import Picture from "@/components/common/Picture";
import { img } from "@/helpers/utils";

export default {
  name: "Promo",
  props: {
    isOpenMenu: {
      type: Boolean,
      default: false,
    },
    isMagnit: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Picture,
    Button,
    Title,
  },
  data() {
    return {
      styleIndex: {
        zIndex: 0,
      },
    };
  },
  mounted() {},
  computed: {
    mobileBackground() {
      if (this.isMagnit) {
        return img(
          [
            "",
            require("@/assets/img/backgrounds/background-red-mobile.png"),
            "",
          ],
          [
            "",
            require("@/assets/img/backgrounds/background-red-mobile.webp"),
            "",
          ]
        );
      }

      return img(
        ["", require("@/assets/img/backgrounds/background-mobile.png"), ""],
        ["", require("@/assets/img/backgrounds/background-mobile.webp"), ""]
      );
    },
    background() {
      if (this.isMagnit) {
        return img(
          ["", require("@/assets/img/backgrounds/background-red.png"), ""],
          ["", require("@/assets/img/backgrounds/background-red.webp"), ""]
        );
      }

      return img(
        ["", require("@/assets/img/backgrounds/background.png"), ""],
        ["", require("@/assets/img/backgrounds/background.webp"), ""]
      );
    },
  },
  methods: {
    img,
    handlePrize() {
      gtag("event", "choose_prize", { event_category: "click_button" }); // eslint-disable-line
    },
    handleRegisterCheck() {
      gtag("event", "register_check", { event_category: "click_button" }); // eslint-disable-line
      this.$emit("onRegisterCheck");
    },
  },
};
</script>

<style lang="scss">
.promo {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 1024px) {
    height: 610px;
  }

  @media (min-width: 1440px) {
    height: 700px;
    background-image: url("@/assets/img/backgrounds/elements-top.png");
  }

  &__back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;

    &.img {
      width: 100%;
      height: 100%;
    }
  }

  &__back-wrapper {
    position: absolute;
    top: 20px;
    padding: 0 10px;
    right: 0;

    @media (min-width: 1024px) {
      right: 132px;
      z-index: 10;
    }
  }

  &-title-wrapper {
    padding: 70px 0 0;
    display: flex;
    justify-content: center;

    @media (min-width: 1024px) {
      padding: 90px 0 0;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-family: var(--font-optima);
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    color: var(--color-white);

    @media (min-width: 1024px) {
      font-size: 34px;
      line-height: 35px;
    }

    span {
      display: block;
    }

    &-count {
      font-size: 36px;
      line-height: 52px;
      font-weight: 700;
      color: var(--color-orange);
      margin-right: 8px;

      @media (min-width: 1024px) {
        font-size: 70px;
        line-height: 62px;
        margin-right: 26px;
      }

      @media (min-width: 1440px) {
        font-size: 87px;
        line-height: 88px;
      }
    }

    &-text {
      max-width: 276px;
    }
  }

  &__title-2 {
    font-family: var(--font-optima);
    font-style: normal;
    font-weight: 700;
    font-size: 42px;
    line-height: 43px;
    text-transform: uppercase;
    color: var(--color-orange);
  }

  &__block-left {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
    padding-top: 18px;

    .title {
      margin-bottom: 20px;
    }

    &.isMagnit {
      padding-top: 27px;

      @media (min-width: 1440px) {
        padding-top: 60px;
      }
    }

    @media (min-width: 1024px) {
      text-align: right;
      align-items: flex-end;
      max-width: 250px;
    }

    @media (min-width: 1440px) {
      max-width: 327px;
    }
  }

  &__img {
    order: 1;
    max-width: 350px;

    @media (min-width: 1024px) {
      transform: translateY(70px);
      order: 0;
    }

    @media (min-width: 1440px) {
      order: 0;
      max-width: 503px;
      transform: initial;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;

      @media (min-width: 1024px) {
        width: 100%;
        height: auto;
      }
    }
  }

  &__block-right {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    z-index: 1;
    margin-bottom: 45px;
    max-width: 348px;
    text-align: center;

    .title {
      margin-bottom: 24px;

      @media (min-width: 1440px) {
        margin-bottom: 28px;
      }
    }

    @media (min-width: 1024px) {
      padding-top: 55px;
      text-align: left;
      align-items: flex-start;
    }

    @media (min-width: 1440px) {
      padding-top: 10px;
      text-align: left;
      align-self: initial;
    }

    &-title {
      img {
        max-width: 132px;

        @media (min-width: 1440px) {
          max-width: initial;
        }
      }
    }
  }

  &__line {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    z-index: 0;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    @media (min-width: 480px) {
      bottom: -14px;
    }

    @media (min-width: 800px) {
      bottom: -35px;
    }

    @media (min-width: 1024px) {
      bottom: 0;
    }

    @media (min-width: 1440px) {
      bottom: -22px;
    }
  }
}

.promo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    padding: 0;

    div:not(:last-of-type) {
      margin-right: 30px;
    }
  }

  @media (min-width: 1440px) {
    justify-content: center;
    align-items: stretch;
    margin-top: 28px;

    div:not(:last-of-type) {
      margin-right: 46px;
    }
  }
}
</style>
