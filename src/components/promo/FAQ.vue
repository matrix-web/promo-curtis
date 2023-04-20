<template>
  <section class="faq">
    <div class="container">
      <div class="header faq__header">
        <Title color="orange" :level="2" font="optima" :weight="700" is-uppercase
          >Faq</Title
        >
      </div>
      <Accordion :items="faqDataList" is-multiple />
      <p class="faq__info">
        Общий срок проведения акции с 15 февраля по 15 июня 2023 года, включая срок выдачи
        призов. Срок приобретения продукции и регистрации чеков с 1 марта по 15 мая
        2023 г. Подробная информация об организаторе акции, о правилах ее проведения,
        количестве призов, сроках, месте и порядке их получения размещена на сайте
        curtistea.com. Количество призов ограничено. Внешний вид призов может отличаться
        от их изображений, размещаемых в рекламных материалах акции.
      </p>
    </div>
  </section>
</template>

<script>
import Title from "@/packages/title/Title.vue";
import Accordion from "@/packages/accordion/Accordion.vue";
import { faqDataList } from "@/mocks/faq";

export default {
  name: "FAQ",
  components: {
    Title,
    Accordion,
  },
  data() {
    return {
      faqDataList
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.faq {
  padding: 30px 0 36px 0;
  background-image: url("@/assets/img/backgrounds/color-blur-1.png");
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;

  @media (min-width: 1024px) {
    padding: 63px 0 60px 0;
  }

  &__header {
    margin-bottom: 45px;

    @media (min-width: 1024px) {
      margin-bottom: 70px;
    }
  }

  &__info {
    margin-top: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--color-white);

    @media (min-width: 768px) {
      font-size: 14px;
      line-height: 16px;
    }
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
