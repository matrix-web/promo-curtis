<template>
  <div class="cat-def">
    <p class="cat-def__title">
      Пройдите тест, чтобы узнать свою категорию призов
    </p>
    <Button
      class="cat-def__button"
      variant="orange"
      isOutline
      isBoldOutline
      size="small"
      @click="$emit('click')"
      >пройти тест</Button
    >
  </div>
</template>

<script>
import Button from "@/packages/newButton/Button.vue";

export default {
  name: "Category-difinition",
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
.cat-def {
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1240px) {
    align-items: flex-start;
  }
}
.cat-def__title {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: var(--color-white);
  text-align: center;
  margin-bottom: 24px;

  @media (min-width: 1240px) {
    text-align: left;
    font-size: 23px;
    line-height: 24px;
    margin-bottom: 16px;
  }
}
</style>
