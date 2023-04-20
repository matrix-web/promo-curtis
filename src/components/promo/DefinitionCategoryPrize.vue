<template>
  <section class="definition-category" id="prizes">
    <div class="container">
      <div class="wrapper">
        <BlurContainer
          :is-raised-big="isRaisedBig"
          :is-raised-small="isRaisedSmall"
          :color="color"
        >
          <Slider :slides="slides" colorBlur="orange" />
        </BlurContainer>
        <div class="description">
          <div class="definition-category__subtitle">
            <Title
              :level="4"
              :weight="700"
              font="optima"
              is-uppercase
              color="white"
              >Прислушайся к своим желаниям</Title
            >
          </div>
          <Title
            :level="2"
            :weight="700"
            font="optima"
            is-uppercase
            color="orange"
            >пройди тест<br />
            и определи свою<br />
            категорию призов</Title
          >
          <div class="description__button">
            <Button @click="handleTest" size="big" isRaised>Пройти тест</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Title from "@/packages/title/Title.vue";
import Slider from "./Slider.vue";
import Button from "@/packages/newButton/Button.vue";
import BlurContainer from "../common/BlurContainer.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DefinitionCategoryPrize",
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
    isRaisedBig: {
      type: Boolean,
      default: true
    },
    isRaisedSmall: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "orange",
      valudator: (value) => ["orange", "purple"].includes(value)
    }
  },
  components: {
    Slider,
    Title,
    Button,
    BlurContainer,
  },
  computed: {
    ...mapGetters("userModule", ["isCanQuiz", "isAuth"]),
  },
  methods: {
    ...mapActions("userModule", ["goToTest"]),
    handleTest() {
      if (!this.isAuth) {
        this.$modal.show("login");
      } else {
        this.goToTest()
      }
      gtag('event', 'pass_the_test', {'event_category' : 'click_button'}) // eslint-disable-line
    }
  },
};
</script>

<style lang="scss" scoped>
.definition-category {
  background-image: url("@/assets/img/backgrounds/color-blur-1.png");
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;

  &__subtitle {
    margin-bottom: 12px;

    @media (min-width: 1024px) {
      max-width: 623px;
      margin-bottom: 60px;
    }
  }
}

.description {
  order: -1;
  text-align: center;
  margin-top: 12px;

  @media (min-width: 1024px) {
    order: 0;
    text-align: left;
    margin: 0;
  }

  &__button {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    @media (min-width: 1024px) {
      margin-top: 28px;
      justify-content: flex-start;
    }
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 47px 0 0;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 64px 0 0;
  }
}
</style>
