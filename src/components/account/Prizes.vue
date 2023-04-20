<template>
  <div class="prizes">
    <div class="prizes__list">
      <Card
        v-for="(prize, index) in prizes"
        :key="index"
        :image="{ img: prize.img, webp: prize.webp }"
        :title="prize.name"
        :text="prizeType(index)"
        variant="secondary"
      />
    </div>
    <div class="prizes__action" v-if="isCategory && isAuth">
      <Button
        variant="orange"
        isOutline
        isBoldOutline
        size="small"
        @click="handleTest"
        >Пройти тест</Button
      >
      <Button
        variant="orange"
        size="small"
        @click="handleShare"
        :disabled="isShared"
        >Поделиться результатом</Button
      >
    </div>
  </div>
</template>

<script>
import Card from "@/components/promo/Card.vue";
import Button from "@/packages/newButton/Button.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Prizes",
  components: {
    Card,
    Button,
  },
  props: {
    prizes: {
      type: Array,
      required: true,
    },
    isCategory: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("userModule", ["goToTest"]),
    handleTest() {
      if (!this.isAuth) {
        this.$modal.show("login");
      } else {
        this.goToTest();
      }
    },
    prizeType(index) {
      return index === 0
        ? "Гарантированный приз"
        : index === 1
        ? "Еженедельный приз"
        : "Главный приз";
    },
    handleShare() {
      gtag("event", "vk_sher", { event_category: "click_button" }); // eslint-disable-line
      this.$modal.show("share");
    },
  },
  computed: {
    ...mapGetters("userModule", ["isAuth", "isCanQuiz", "isShared"]),
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
  },
};
</script>

<style lang="scss" scoped>
.prizes {
  display: flex;
  flex-direction: column;
  max-width: 850px;
  margin: 0 auto;

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    margin-bottom: 30px;

    div:not(:last-of-type) {
      @media (min-width: 1240px) {
        margin-right: 40px;
        margin-bottom: 0;
      }
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);

      &:last-child {
        margin-top: 10px;
      }
    }

    @media (min-width: 1240px) {
      max-width: 850px;
      justify-items: initial;

      &:last-child {
        margin-top: 0;
      }
    }
  }

  &__action {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    button:not(:last-child) {
      margin-bottom: 12px;
    }

    @media (min-width: 1240px) {
      flex-direction: row;
      align-items: initial;

      button:not(:last-child) {
        margin-bottom: 0;
        margin-right: 40px;
      }
    }
  }
}
</style>
