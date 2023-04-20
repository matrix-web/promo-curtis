<template>
  <div class="slider">
    <div ref="swiper" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in slides" :key="slide.id">
          <Card
            :image="slide.img"
            :title="slide.title"
            :text="slide.text"
            :points="slide.points"
            :color="colorBlur"
          />
        </div>
      </div>
      <!-- Navigation arrows -->
      <div
        :class="[
          'slider__nav-button',
          'slider__nav-button--next',
          { orange: colorNav ? colorNav : false },
        ]"
      >
        {{ `>` }}
      </div>
      <div
        :class="[
          'slider__nav-button',
          'slider__nav-button--prev',
          { orange: colorNav ? colorNav : false },
        ]"
      >
        {{ `<` }}
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Autoplay, Lazy } from "swiper";
import Card from "./Card.vue";

export default {
  name: "Slider",
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
    colorBlur: {
      type: String,
      validator: (value) => ["orange"].includes(value),
    },
    colorNav: {
      type: String,
      validator: (value) => ["orange"].includes(value),
    },
  },
  components: {
    Card,
  },
  data() {
    return {};
  },
  mounted() {
    new Swiper(this.$refs.swiper, {
      modules: [Navigation, Autoplay, Lazy],
      loop: true,
      lazy: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        320: {
          spaceBetween: 20,
          slidesOffsetBefore: 0,
        },
        480: {
          slidesOffsetBefore: 20,
        },
        768: {
          spaceBetween: 20,
          slidesOffsetBefore: 30,
        },
      },
      navigation: {
        nextEl: ".slider__nav-button--next",
        prevEl: ".slider__nav-button--prev",
      },
    });
  },
};
</script>

<style lang="scss">
@import "../../../node_modules/swiper/swiper-bundle.min.css";

.slider {
  max-width: 320px;
  width: 100%;
  overflow: hidden;

  @media (min-width: 376px) {
    max-width: 350px;
  }

  @media (min-width: 480px) {
    max-width: 450px;
  }

  @media (min-width: 768px) {
    max-width: 500px;
  }

  &__nav-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    background: linear-gradient(
      90deg,
      #701f99 6.77%,
      #76219d 17.26%,
      #8324a1 47.18%,
      #8c25a1 80.34%,
      #91259f 118.93%,
      #92269f 175.86%
    );
    box-shadow: 0 4px 12px rgba(232, 17, 116, 0.44);
    border-radius: 80px;
    z-index: 100;
    font-weight: 700;
    font-size: 16px;
    line-height: 17px;
    text-align: center;
    color: var(--color-white);
    cursor: pointer;

    &.orange {
      background-color: var(--color-orange);
      background-image: none;
      box-shadow: 0 4px 12px rgba(232, 17, 116, 0.44);
    }

    &--next {
      right: 10px;

      @media (min-width: 1024px) {
        right: 35px;
      }
    }

    &--prev {
      left: 10px;

      @media (min-width: 1024px) {
        right: 35px;
      }
    }
  }
}

.swiper {
  max-width: 100%;
  overflow: unset;
}

.swiper-slide {
  padding: 40px 0;
}
</style>
