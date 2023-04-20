<template>
  <div class="loading">
    <div
      class="loading__background"
      :class="{ 'm-opacity': isOpacity }"
      :style="`backgroundImage: url(${background})`"
    ></div>
    <div
      class="loading__thing"
      v-if="isPrizes"
      :style="`opacity: ${
        percent === 100 ? 1 : percent < 10 ? '0.0' + percent : '0.' + percent
      }`"
    >
      <Picture
        v-for="(image, index) in items"
        :key="index"
        :url="
          img(
            ['', require(`@/assets/img/things/${image}.png`), ''],
            ['', require(`@/assets/img/things/${image}.webp`), '']
          )
        "
        :className="`m-${image}`"
        :alt="image"
      />
    </div>
    <div class="content">
      <Title
        class="loading__title"
        font="optima"
        :weight="700"
        :level="1"
        color="orange"
        :is-uppercase="true"
        >{{ title }}</Title
      >
      <p class="loading__percent">{{ percent }}%</p>
      <div class="loading__progress">
        <div class="loading__progress-line" :style="`width: ${percent}%`"></div>
      </div>
    </div>
  </div>
</template>

<script>
import background from "@/assets/img/backgrounds/background.png";
import Title from "@/packages/title/Title";
import Picture from "@/components/common/Picture";
import { img } from "@/helpers/utils";

export default {
  name: "Loading",
  components: { Picture, Title },
  props: {
    isOpacity: {
      type: Boolean,
      default: true,
    },
    isPrizes: {
      type: Boolean,
      default: true,
    },
    ms: {
      type: Number,
      default: 3000,
    },
  },
  data: () => ({
    background,
    percent: 0,
    items: [
      "airpods",
      "ipad",
      "column",
      "suitcase",
      "headphones",
      "certificate",
    ],
  }),
  mounted() {
    if (this.ms) {
      let interval;

      interval = setInterval(() => {
        if (this.percent < 100) this.percent += 1;
      }, this.ms / 100);

      setTimeout(() => {
        clearInterval(interval);
        this.$emit("loaded");
      }, this.ms);
    }
  },
  computed: {
    title() {
      if (this.percent <= 24) return "Отправляем запрос в космос";
      if (this.percent <= 49) return "Ловим вдохновение";
      if (this.percent <= 74) return "Вдохновляемся твоими интересами";
      if (this.percent <= 98) return "Продумываем все до мелочей";
      if (this.percent >= 99) return "Готовимся удивлять";
      return "";
    },
  },
  methods: {
    img,
  },
};
</script>

<style lang="scss">
.loading {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    object-fit: cover;

    &.m-opacity {
      opacity: 0.4;
    }
  }

  &__title {
    max-width: 698px;
    text-align: center;
    margin: 0 auto 23px auto;

    @media (min-width: 1024px) {
      margin: 0 auto 54px auto;
    }
  }

  &__percent {
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    font-family: var(--font-optima);
    color: var(--color-orange);
    margin-bottom: 10px;

    @media (min-width: 1024px) {
      font-size: 32px;
      line-height: 32px;
    }
  }

  &__progress {
    position: relative;
    width: 335px;
    height: 16px;
    background: var(--color-white);
    border-radius: 50px;

    @media (min-width: 1024px) {
      width: 698px;
    }
  }
  &__progress-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 16px;
    background: #e81174;
    border-radius: 50px;
  }

  &__thing {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .m-airpods,
    .m-ipad,
    .m-column,
    .m-suitcase,
    .m-headphones,
    .m-certificate {
      position: absolute;
      filter: drop-shadow(0px 4px 23px rgba(252, 202, 11, 0.5));
    }

    .m-airpods {
      top: 76px;
      left: 0;
      width: 104px;
      transform: rotate(-10.26deg);

      @media (min-width: 1024px) {
        top: 182px;
        left: 50%;
        transform: translateX(-586px);
      }
    }
    .m-ipad {
      top: 8px;
      right: -44px;
      width: 188px;

      @media (min-width: 1024px) {
        width: 238px;
        top: 175px;
        left: 50%;
        transform: translateX(432px);
      }
    }
    .m-column {
      bottom: 109px;
      left: -25px;
      width: 126px;

      @media (min-width: 1024px) {
        width: 126px;
        bottom: 24px;
        left: 50%;
        transform: translateX(50px);
      }
    }
    .m-suitcase {
      display: none;

      @media (min-width: 1024px) {
        width: 306px;
        display: block;
        bottom: 22px;
        left: 50%;
        transform: translateX(-653px);
      }
    }
    .m-headphones {
      bottom: 79px;
      right: -79px;
      width: 236px;

      @media (min-width: 1024px) {
        right: unset;
        width: 244px;
        bottom: 31px;
        left: 50%;
        transform: translateX(318px);
      }
    }
    .m-certificate {
      bottom: -14px;
      left: 24%;
      width: 191px;

      @media (min-width: 1024px) {
        width: 300px;
        top: 23px;
        left: 50%;
        transform: translateX(-234px);
      }
    }
  }
}

.content {
  max-width: 1440px;
  margin: 0 auto;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
