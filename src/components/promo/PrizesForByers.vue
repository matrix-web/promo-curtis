<template>
  <section class="prizes-for-byers">
    <div class="header">
      <div class="header__title">
        <Title color="orange" :level="3" font="optima" :weight="700" is-uppercase
          >Вау-призы только для покупателей<br />
          сети магнит</Title
        >
      </div>
    </div>
    <div class="prizes">
      <div class="container">
        <div class="prizes__wrapper">
          <div class="prizes__card-wrapper">
            <BlurContainer is-small-circle>
              <Card
                :image="guaranteePrize.img"
                :title="guaranteePrize.title"
                :text="guaranteePrize.text"
                color="orange"
              />
            </BlurContainer>
          </div>
          <BlurContainer is-small-circle>
            <Slider :slides="slides" colorBlur="orange" colorNav="orange" />
            <div class="description">
              <p class="description__title">{{ item.title }}</p>
              <p class="description__text">{{ item.text }}</p>
            </div>
          </BlurContainer>
          <div class="prizes__card-wrapper">
            <BlurContainer is-small-circle>
              <Card
                color="orange"
                :image="mainPrize.img"
                :title="mainPrize.title"
                :text="mainPrize.text"
              />
            </BlurContainer>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "@/packages/title/Title.vue";
import Card from "./Card.vue";
import Slider from "./Slider.vue";
import BlurContainer from "../common/BlurContainer.vue";

export default {
  name: "PrizesForByers",
  props: {
    guaranteePrize: {
      type: Object,
      default: () => ({}),
    },
    mainPrize: {
      type: Object,
      default: () => ({}),
    },
    slides: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Title,
    Card,
    Slider,
    BlurContainer,
  },
  data() {
    return {
      isMobile: false,
      isDesktop: false,
      item: {
        title: "Еженедельный розыгрыш",
        text: "Серия крутого мерча от Curtis",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.prizes-for-byers {
  padding: 0 0 50px;
}

.prizes__card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1440px) {
    &:last-child {
      margin-top: -10px;
    }
  }
}

.description {
  position: relative;
  transform: translateY(-39px);

  &__title {
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    font-family: var(--font-walsheim);
    line-height: 34px;
    text-align: center;
    color: var(--color-orange);
  }

  &__text {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: var(--color-white);
  }
}

.header {
  padding: 0 20px;
  margin-bottom: 30px;

  @media (min-width: 1024px) {
    padding: 0;
  }

  &__title {
    text-align: center;
    max-width: 850px;
    margin: 0 auto;
  }
}

.prizes__wrapper {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  @media (min-width: 1440px) {
    justify-items: initial;
    grid-template-columns: repeat(3, 1fr);
  }
}

.container {
  max-width: 1500px;
  margin: 0 auto;
}
</style>
