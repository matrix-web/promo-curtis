<template>
  <section class="mechanics-action" id="mechanics">
    <div class="mechanics-action__title">
      <Title :level="2" color="orange" font="optima" :weight="700" is-uppercase
        >Механика акции</Title
      >
    </div>
    <div class="mechanics-action__container">
      <div class="steps">
        <div class="steps__step">
          <div class="steps__step-img">
            <img src="@/assets/img/svg/cart.svg" alt="cart" />
          </div>
          <div class="steps__step-content">
            <p class="steps__step-title">1. Покупай чай Curtis</p>
            <p class="steps__step-text">
              {{ isMagnit ? `с картой лояльности "Магнит" с 01 марта` : `с 13 марта по 15 мая 2023г`}}
            </p>
          </div>
        </div>
        <div class="steps__step">
          <div class="steps__step-img">
            <img src="@/assets/img/svg/laptop.svg" alt="register" />
          </div>
          <div class="steps__step-content">
            <p class="steps__step-title">2. Регистрируй</p>
            <p class="steps__step-text">
              чек на сайте,<br />
              получай баллы и гарантированные призы
            </p>
          </div>
        </div>
        <div class="steps__step">
          <div class="steps__step-img">
            <img src="@/assets/img/svg/collect.svg" alt="collect" />
          </div>
          <div class="steps__step-content">
            <p class="steps__step-title">3. Копи</p>
            <p class="steps__step-text">
              <button class="steps__step-link" v-scroll-to="'#points'">баллы</button> и
              обменивай их на<br />
              <button class="steps__step-link" v-scroll-to="'#prizes'"
                >призы в разных категориях</button
              >
            </p>
          </div>
        </div>
        <div class="steps__step">
          <div class="steps__step-img">
            <img src="@/assets/img/svg/gift.svg" alt="gift" />
          </div>
          <div class="steps__step-content">
            <p class="steps__step-title">4. Участвуй</p>
            <p class="steps__step-text">в розыгрыше призов</p>
            <p class="steps__step-text steps__step-text_special">
              БОЛЬШЕ ЧЕКОВ –– БОЛЬШЕ ШАНСОВ
            </p>
          </div>
        </div>
      </div>
      <div class="mechanics-action__button-wrapper">
        <Button @click="handleTest" size="big" isRaised>участвовать</Button>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "@/packages/title/Title.vue";
import Button from "@/packages/newButton/Button.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MechanicsAction",
  props: {
    isMagnit: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Button,
    Title,
  },
  computed: {
    ...mapGetters("userModule", ["isAuth", "isNotQuiz"]),
  },
  methods: {
    ...mapActions("userModule", ["goToTest"]),
    handleTest() {
      if (!this.isAuth) {
        this.$modal.show("login");
      } else {
        if (this.isNotQuiz) this.$router.push("/quiz");
        if (!this.isNotQuiz) this.$modal.show("check");
      }
      gtag('event', ' participate', {'event_category' : 'click_button'}) // eslint-disable-line
    },
  },
};
</script>

<style lang="scss" scoped>
.mechanics-action {
  padding: 60px 0 78px 0;
  background-image: url("@/assets/img/backgrounds/color-blur.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 1024px) {
    padding: 64px 0 63px 0;
  }

  @media (min-width: 1440px) {
    padding: 120px 0 63px 0;
  }

  &__title {
    text-align: center;
    margin-bottom: 54px;

    @media (min-width: 1024px) {
      margin-bottom: 94px;
    }
  }

  &__container {
    max-width: 1152px;
    margin: 0 auto;
  }

  &__button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 42px;

    @media (min-width: 1024px) {
      margin-top: 57px;
    }
  }
}

.steps {
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }

  @media (min-width: 1440px) {
    padding: 0;
    flex-direction: row;
    align-items: stretch;
  }

  &__step {
    display: grid;
    grid-template-columns: 50px 1fr;

    &:not(:last-child) {
      margin-bottom: 32px;
    }

    @media (min-width: 576px) {
      grid-template-columns: 80px 1fr;
    }

    @media (min-width: 1024px) {
      max-width: 281px;
      grid-template-columns: 1fr;

      &:nth-child(2) {
        .steps__step-img {
          margin-bottom: 17px;
        }
      }

      &:nth-child(3) {
        margin-top: -30px;
        .steps__step-text {
          max-width: 250px;
        }
        .steps__step-img {
          margin-bottom: 20px;
        }
      }

      &:nth-child(4) {
        .steps__step-img {
          margin-bottom: 2px;
        }
      }
    }

    @media (min-width: 1440px) {
      &:nth-child(1) {
        .steps__step-img {
          margin-bottom: 25px;
        }
      }
    }

    &-content {
      @media (min-width: 1024px) {
        text-align: center;
      }

      @media (min-width: 1440px) {
        min-height: 120px;
      }
    }

    &-img {
      max-width: 50px;
      margin-right: 20px;

      @media (min-width: 576px) {
        max-width: 80px;
      }

      @media (min-width: 1024px) {
        max-width: initial;
        margin: 0 auto;
        margin-bottom: -1px;
      }

      img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
        object-position: center;

        @media (min-width: 1024px) {
          width: initial;
          height: initial;
        }
      }
    }

    &-title {
      font-style: normal;
      font-weight: 400;
      font-size: 21px;
      line-height: 26px;
      text-transform: uppercase;
      color: var(--color-orange);

      @media (min-width: 1024px) {
        font-size: 22px;
        line-height: 24px;
      }

      @media (min-width: 1440px) {
        font-size: 27px;
        line-height: 33px;
      }
    }

    &-text {
      margin-top: 6px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: var(--color-white);

      @media (min-width: 1024px) {
        font-size: 16px;
        line-height: 23px;
      }

      &_special {
        max-width: 230px;
        text-transform: uppercase;
        color: var(--color-orange);
        margin-top: 20px;
      }
    }

    &-link {
      display: inline;
      font-weight: 400;
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      text-decoration-line: underline;
      color: var(--color-orange);
    }
  }
}
</style>
