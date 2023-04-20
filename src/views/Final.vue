<template>
  <div>
    <transition name="fade">
      <Navigation v-if="!isLoading" />
    </transition>
    <div class="final" :class="{ 'm-loading': isLoading }">
      <transition name="fade">
        <Logo v-if="isLoading" />
      </transition>
      <transition name="fade">
        <Loading v-if="isLoading" @loaded="handleLoad" :ms="6000" />
        <Container
          v-else-if="user"
          :is-prizes="false"
          :is-opacity="false"
          :is-min-height="false"
          :is-bg="false"
        >
          <div :class="['final__head', { 'spaced-bottom': isTestCompleted }]">
            <template v-if="isTestCompleted">
              <div class="final__head--wrapper">
                <div class="final__category">
                  <Title
                    class="final__title"
                    font="optima"
                    :weight="700"
                    :level="4"
                    color="white"
                    :is-uppercase="true"
                    >твоя категория призов</Title
                  >
                  <Title
                    class="final__subtitle"
                    font="optima"
                    :weight="700"
                    :level="3"
                    color="orange"
                    :is-uppercase="true"
                  >
                    <img
                      :src="prizes[categoryNumber].icon"
                      :alt="prizes[categoryNumber].type"
                    />
                    <span>{{ prizes[categoryNumber].type }}</span></Title
                  >
                </div>
              </div>
              <div class="final__desctipion">
                <p class="final__text mb-30">
                  Копи баллы, обменивай их на призы и участвуй в крутых
                  розыгрышах.
                </p>
                <Button @click="handleClick" size="big" isRaised
                  >Участвовать</Button
                >
              </div>
            </template>
            <template v-else>
              <Title
                class="final__title"
                font="optima"
                :weight="700"
                :level="4"
                color="white"
                :is-uppercase="true"
                >твоя категория призов</Title
              >
              <p class="final__bonus">
                <span class="m-orange"
                  ><span class="m-bold">10</span> welcome баллов</span
                >
                твои!
              </p>
              <Title
                class="final__subtitle"
                font="optima"
                :weight="700"
                :level="3"
                color="orange"
                :is-uppercase="true"
              >
                <img
                  :src="prizes[categoryNumber].icon"
                  :alt="prizes[categoryNumber].type"
                />
                <span>{{ prizes[categoryNumber].type }}</span></Title
              >
              <p class="final__text">
                Возвращайся на сайт 1 марта, копи баллы, обменивай их на призы и
                участвуй в крутых розыгрышах.
              </p>
            </template>
          </div>
          <ul class="final__list">
            <li
              class="final__item"
              v-for="(item, index) in prizes[categoryNumber].prizes"
              :key="item.id"
            >
              <div class="final__image">
                <Picture
                  :url="img(['', item.img, ''], ['', item.webp, ''])"
                  :alt="item.name"
                />
              </div>
              <div class="final__content">
                <p class="m-white">
                  {{
                    index === 0
                      ? "Гарантированный приз"
                      : index === 1
                      ? "Еженедельный приз"
                      : "Главный приз"
                  }}
                </p>
                <p class="m-orange">{{ item.name }}</p>
              </div>
            </li>
          </ul>
          <div class="final__again" v-if="user.tests < 2">
            <p>Не согласен с результатом?</p>
            <RouterLink
              to="/"
              @click="gtag('event', 'test2', { event_category: 'click_link' })"
              ><p class="m-link">Пройди тест ещё раз</p></RouterLink
            >
          </div>
          <div class="final__buttons">
            <a href="/event.ics" v-if="!isTestCompleted">
              <Button
                @click="handleAddInCalendar"
                :is-outlined="true"
                :is-small="true"
                >добавить событие в календарь</Button
              ></a
            >
            <Button
              @click="handleShare"
              :is-small="true"
              :is-disabled="isShared"
              >поделиться результатом</Button
            >
          </div>
          <div class="final__footnote">
            *Некоторые из товаров, изображенных в качестве призов, отражают
            потенциальную возможность их приобретения, используя сертификаты
            призового фонда. Полный перечень призов и порядок их получения
            указан в
            <a class="link" href="/rules.pdf" target="_blank">Правилах акции</a
            >.
          </div>
        </Container>
      </transition>
    </div>
  </div>
</template>

<script>
import Logo from "@/packages/logo/Logo";
import Container from "@/components/common/Container";
import Title from "@/packages/title/Title";
import Button from "@/packages/button/Button";
import Loading from "@/components/common/Loading";
import Navigation from "@/components/common/Navigation";

import { prizes } from "@/mocks/prizes";
import { mapGetters, mapState } from "vuex";
import Picture from "@/components/common/Picture";
import { img } from "@/helpers/utils";

export default {
  name: "Final",
  components: {
    Picture,
    Title,
    Container,
    Logo,
    Button,
    Loading,
    Navigation,
  },
  data: () => ({
    prizes,
    isLoading: true,
    categoryNumber: 0,
  }),
  mounted() {
    if (this.user) {
      this.categoryNumber = prizes.findIndex(
        (item) => item.category === this.user.category
      );
      gtag("event", this.user.category, { event_category: "show" }); // eslint-disable-line
    }
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
    ...mapGetters("userModule", ["isShared"]),
    isTestCompleted() {
      return this.user?.tests >= 1;
    },
  },
  watch: {
    user() {
      if (this.user)
        this.categoryNumber = prizes.findIndex(
          (item) => item.category === this.user.category
        );
      gtag("event", this.user.category, { event_category: "show" }); // eslint-disable-line
    },
  },
  methods: {
    img,
    handleShare() {
      gtag("event", "vk_sher", { event_category: "click_button" }); // eslint-disable-line
      this.$modal.show("share");
    },
    handleAddInCalendar() {
      gtag("event", "calendar", { event_category: "click_button" }); // eslint-disable-line
    },
    handleLoad() {
      this.isLoading = false;
    },
    handleClick() {
      this.$router.push({ name: "promo-magnit", hash: "#mechanics" });
    },
  },
};
</script>

<style scoped lang="scss">
.final {
  display: flex;
  min-height: calc(100vh - 65px);
  flex-direction: column;
  padding-top: 86px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  background-image: url("@/assets/img/backgrounds/final-mobile.png");

  &__logo {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;

    @media (min-width: 1024px) {
      width: 100%;
      padding-right: 62px;
    }

    &-img {
      max-width: 110px;
      height: auto;
      object-fit: cover;
      object-position: center;
    }
  }

  &.m-loading {
    background-image: none;
  }

  @media (min-width: 768px) {
    background-image: url("@/assets/img/backgrounds/final.png");
  }

  @media (min-width: 1024px) {
    justify-content: center;
    padding-top: 40px;
    min-height: calc(100vh - 87px);
  }

  &__head {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 16px;

    &.spaced-bottom {
      margin-bottom: 170px;
    }

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 55px;
      padding: 16px;
      margin-bottom: 155px;
      row-gap: 24px;
      align-items: center;
    }
    @media (min-width: 1440px) {
      padding: 0;
      padding-left: 80px;
    }
  }

  &__desctipion {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1024px) {
      align-items: flex-start;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 8px;
    padding: 0 16px;
    width: 100%;

    @media (min-width: 1024px) {
      text-align: start;
      font-size: 32px;
      line-height: 68px;
      padding: 0;
      margin-bottom: 0;
    }
  }

  &__bonus {
    font-weight: 400;
    font-size: 16px;
    color: var(--color-white);
    white-space: nowrap;

    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 1024px) {
      font-size: 32px;
    }
    @media (min-width: 1440px) {
      font-size: 38px;
      line-height: 34px;
    }

    .m-bold {
      font-weight: 700;
      color: inherit;
    }

    .m-orange {
      font-weight: 400;
      font-size: 16px;
      color: var(--color-black);
      padding: 7px 20px;
      background-color: var(--color-orange);
      border-radius: 185px;

      @media (min-width: 768px) {
        font-size: 20px;
      }

      @media (min-width: 1024px) {
        font-size: 32px;
      }
      @media (min-width: 1440px) {
        font-size: 38px;
        line-height: 34px;
      }
    }
  }

  &__subtitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 24px 16px;
    font-size: 32px;
    line-height: 34px;
    padding: 10px 20px;
    max-height: 47px;
    background-color: var(--color-purple);
    border-radius: 47px;

    @media (min-width: 1024px) {
      font-size: 60px;
      line-height: 68px;
      margin: 0;
      padding: 10px 24px 10px 18px;
      max-height: 80px;
      width: fit-content;
    }

    img {
      height: 30px;
      margin-right: 24px;

      @media (min-width: 1024px) {
        height: 50px;
        margin-right: 30px;
      }
    }
  }

  &__text {
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: var(--color-white);
    padding: 0 24px;
    margin-bottom: 92px;
    text-align: center;
    max-width: 507px;

    &.mb-30 {
      margin-bottom: 30px;
    }

    @media (min-width: 1024px) {
      font-size: 24px;
      line-height: 32px;
      text-align: start;
      margin-bottom: 0;
      padding: 0;
      max-width: 654px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 93px;
    width: 100%;
    padding-right: 16px;
    margin-bottom: 100px;

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding-right: 0;
      gap: 0;
    }

    @media (min-width: 1440px) {
      justify-content: space-between;
      padding-left: 129px;
    }
  }
  &__item {
    position: relative;
    @media (min-width: 1024px) {
      padding-left: 145px;
    }
    @media (min-width: 1440px) {
      padding-left: 220px;
      max-width: 218px;
      min-width: 218px;
    }
  }
  &__image {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0;
    left: 50%;
    transform: translateX(-112%);
    height: 100%;
    width: 170px;
    max-width: 170px;

    @media (min-width: 1440px) {
      top: -50%;
      left: 0;
      transform: translateX(0%);
      height: 100%;
      width: 250px;
      max-width: 266px;
    }

    img {
      max-width: 170px;
      max-height: 170px;

      @media (min-width: 1440px) {
        max-width: 250px;
        max-height: 250px;
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 17px;
    max-width: 50%;
    margin-left: auto;
    z-index: 2;
    position: relative;

    @media (min-width: 1024px) {
      max-width: 218px;
      min-width: 218px;
    }

    .m-white {
      font-size: 17px;
      line-height: 21px;
      letter-spacing: -0.03em;
      color: var(--color-white);
    }
    .m-orange {
      font-size: 23px;
      color: var(--color-orange);
    }
  }

  &__again {
    font-weight: 400;
    font-size: 18px;
    color: var(--color-white);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    margin-bottom: 86px;

    @media (min-width: 1024px) {
      font-size: 24px;
      line-height: 30px;
      flex-direction: row;
    }

    .m-link {
      color: var(--color-orange);
      border-bottom: 0.5px solid var(--color-orange);
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 7px;
    align-items: center;
    margin-bottom: 40px;

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }

  &__footnote {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--color-white);
    max-width: 1060px;
    margin: 0 auto;
    padding: 0 16px 19px;

    .link {
      color: var(--color-white);
      border-bottom: 1px solid var(--color-white);
    }
  }
}
</style>
