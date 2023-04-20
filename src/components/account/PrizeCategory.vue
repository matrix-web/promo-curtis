<template>
  <div class="prize-category">
    <div class="prize-category__title">Твоя категория призов</div>
    <div :class="['prize-category__badge', { 'is-category': isUnknown }]">
      <div class="prize-category__icon">
        <img :src="category.imgPath" :alt="category.title" />
      </div>
      <div class="prize-category__name">{{ category.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrizeCategory",
  props: {
    category: {
      type: Object,
      default: () => ({
        imgPath: require("@/assets/img/svg/unknown.svg"),
        title: "Неизвестна",
      }),
    },
    isUnknown: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.prize-category {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 1;
}

.prize-category__title {
  font-family: var(--font-optima);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-white);
  margin-bottom: 15px;

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 30px;
  }
}
.prize-category__badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 18px;
  background: var(--color-gray);
  border-radius: 58px;

  @media (min-width: 1240px) {
    padding: 7px 18px;
  }

  &.is-category {
    background-color: var(--color-purple);

    .prize-category__name {
      color: var(--color-orange);
    }
  }
}
.prize-category__icon {
  margin-right: 20px;
}
.prize-category__name {
  font-family: var(--color-optima);
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-light-gray);

  @media (min-width: 768px) {
    font-size: 36px;
    line-height: 36px;
  }

  @media (min-width: 1240px) {
    font-size: 43px;
    line-height: 43px;
  }
}
</style>
