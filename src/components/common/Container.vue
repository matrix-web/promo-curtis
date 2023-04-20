<template>
  <div
    class="containerPage"
    :style="`min-height: ${isMinHeight ? '100vh' : 'none'}`"
  >
    <div
      class="containerPage__background"
      :class="{ 'm-opacity': isOpacity }"
      :style="isBg ? `backgroundImage: url(${background})` : null"
    ></div>
    <div class="containerPage__thing" v-if="isPrizes">
      <Picture
        v-for="(image, index) in items"
        :key="index"
        :url="
          img(
            ['', require(`@/assets/img/things/${image.imageName}.png`), ''],
            ['', require(`@/assets/img/things/${image.imageName}.webp`), '']
          )
        "
        :className="`m-${image.name}`"
        :alt="image.name"
      />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import backgroundFinal from "@/assets/img/backgrounds/final.png";
import background from "@/assets/img/backgrounds/background.png";
import Picture from "@/components/common/Picture";
import { img } from "@/helpers/utils";

export default {
  name: "containerPage",
  components: { Picture },
  props: {
    isOpacity: {
      type: Boolean,
      default: true,
    },
    isPrizes: {
      type: Boolean,
      default: true,
    },
    isMinHeight: {
      type: Boolean,
      default: true,
    },
    isBg: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    background,
    backgroundFinal,
    items: [
      {
        name: "airpods",
        imageName: "airpods-opacity",
      },
      {
        name: "ipad",
        imageName: "ipad-opacity",
      },
      {
        name: "column",
        imageName: "column-opacity",
      },
      {
        name: "watch",
        imageName: "watch-opacity",
      },
    ],
  }),
  methods: {
    img,
  },
};
</script>

<style lang="scss">
.containerPage {
  overflow: hidden;
  display: flex;
  flex-direction: column;

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

  &__thing {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .m-airpods {
      position: absolute;
      top: 174px;
      left: 20px;
      width: 53px;
      height: 90px;

      @media (min-width: 1024px) {
        top: 209px;
        left: 50%;
        transform: translateX(-800%);
      }
    }
    .m-ipad {
      position: absolute;
      top: 174px;
      right: -30px;
      width: 122px;
      height: 155px;

      @media (min-width: 1024px) {
        width: 167px;
        height: 213px;
        top: 209px;
        left: 50%;
        transform: translateX(200%);
      }
    }
    .m-column {
      position: absolute;
      bottom: 29px;
      left: 27px;
      width: 77px;
      height: 122px;

      @media (min-width: 1024px) {
        width: 119px;
        height: 189px;
        bottom: 97px;
        left: 50%;
        transform: translateX(-350%);
      }
    }
    .m-watch {
      position: absolute;
      bottom: 70px;
      right: 37px;
      width: 64px;
      height: 68px;

      @media (min-width: 1024px) {
        width: 101px;
        height: 107px;
        bottom: 94px;
        left: 50%;
        transform: translateX(235%);
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
