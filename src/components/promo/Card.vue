<template>
  <div :class="['card', `${variant}`]">
    <div class="card__content">
      <Picture
        loading="lazy"
        :url="img(['', image.img, ''], ['', image.webp, ''])"
        :alt="title || ''"
      />
      <div class="card__badge" v-if="points">
        <span class="card__badge-count">{{ points }}</span>
        баллов
      </div>
    </div>
    <div class="card__description">
      <p class="card__title" v-if="title">{{ title }}</p>
      <p v-if="text" class="card__text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import Picture from "@/components/common/Picture";
import { img } from "@/helpers/utils";

export default {
  name: "TheCard",
  components: { Picture },
  methods: {
    img,
  },
  props: {
    image: {
      type: Object,
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
    },
    points: {
      type: Number,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary"].includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
.card__content {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    max-width: 100%;
    max-height: 330px;
    object-fit: cover;
    object-position: center;
    margin: 0 auto;
  }
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;

  &.primary {
    max-width: 424px;
    height: 100%;
    max-height: 565px;
    justify-content: space-between;

    .card__title {
      font-size: 26px;
      line-height: 34px;
      margin-bottom: 14px;
    }

    .card__text {
      font-size: 18px;
      line-height: 22px;
    }

    .card__content {
      min-height: 310px;
    }
  }

  &.secondary {
    flex-direction: row;

    @media (min-width: 768px) {
      .card__content {
        margin-bottom: 15px;
      }
    }

    @media (min-width: 1024px) {
      flex-direction: column;
    }

    @media (min-width: 1240px) {
      flex-direction: column;

      &:nth-child(2) {
        .card__description {
          padding-left: 0;
        }
      }
    }

    .card__title {
      font-weight: 500;
      font-size: 16px;
      text-align: left;
      margin-top: 14px;
      font-family: var(--font-regular);

      @media (min-width: 768px) {
        font-size: 23px;
        line-height: 27px;
      }

      @media (min-width: 1024px) {
        font-size: 24px;
        line-height: 28px;
        text-align: center;
      }
    }

    .card__text {
      font-weight: 500;
      font-size: 14px;
      text-align: left;

      @media (min-width: 768px) {
        font-size: 17px;
        line-height: 21px;
      }

      @media (min-width: 1024px) {
        font-size: 21px;
        line-height: 22px;
        text-align: center;
      }
    }

    .card__description {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;

      @media (min-width: 1240px) {
        justify-content: initial;
      }
    }

    .card__content {
      position: relative;
      min-height: 160px;
      min-width: 180px;
      z-index: 100;

      &::after {
        position: absolute;
        content: "";
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 160px;
        height: 160px;
        background: var(--color-purple);
        filter: blur(24.5px);
        z-index: -1;
      }

      @media (min-width: 1240px) {
        min-height: 250px;
        min-width: initial;
        z-index: initial;

        &::after {
          display: none;
        }
      }

      img {
        max-height: 225px;
      }
    }
  }

  &__badge {
    position: absolute;
    right: 55px;
    top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    transform: rotate(9.24deg);
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
    background: var(--color-orange);

    @media (min-width: 480px) {
      right: 100px;
    }
  }
  &__badge-count {
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 24px;
    text-align: center;
  }

  &__description {
    position: relative;
    max-width: 316px;
    width: 100%;
    margin: 0 auto;
    z-index: 101;
  }

  &__title {
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 500;
    font-family: var(--font-walsheim);
    text-align: center;
    color: var(--color-orange);
  }

  &__text {
    font-style: normal;
    font-weight: 400;
    text-align: center;
    color: var(--color-white);
  }
}
.card__circle {
  max-width: 424px;
  min-height: 424px;
  width: 100%;
  margin: 0 auto;
  border-radius: 50%;
  background: linear-gradient(180deg, #3c0d59 0%, #370c37 100%);
  filter: blur(24.5px);
  transform: translateY(50px);

  &.orange {
    background: #7e4110;
    filter: blur(24.5px);
  }
}
</style>
