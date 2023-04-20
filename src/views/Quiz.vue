<template>
  <div class="quiz">
    <Logo />
    <Container>
      <Title
        class="quiz__title"
        font="optima"
        :weight="700"
        :level="2"
        color="white"
        :is-uppercase="true"
        >Ответь на 10 простых вопросов и узнай, какие призы мы подготовили для
        тебя</Title
      >
      <Button @click="handleStartClick" :isRaised="true">выбрать призы</Button>
    </Container>
    <Test />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Logo from "@/packages/logo/Logo";
import Container from "@/components/common/Container";
import Title from "@/packages/title/Title";
import Button from "@/packages/button/Button";
import Test from "@/components/quiz/Test";

import Cookies from "js-cookie";

export default {
  name: "Home",
  components: { Test, Title, Container, Logo, Button },
  data: () => ({}),
  mounted() {
    if (this.user && this.user.tests >= 2) this.$router.push("/final");
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
  },
  watch: {
    user() {
      if (this.user && this.user.tests >= 2) {
        this.$router.push("/final");
      }
    },
  },
  methods: {
    handleStartClick() {
      gtag("event", "prize", { event_category: "click_button" }); // eslint-disable-line
      if (Cookies.get("token") && this.user && this.user.tests < 2) {
        this.$modal.show("test");
      } else {
        this.$modal.show("alert");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.quiz {
  display: flex;
  flex-direction: column;

  &__title {
    text-align: center;
    margin-bottom: 52px;
    padding: 0 16px;
    max-width: 1366px;

    @media (min-width: 1024px) {
      margin-bottom: 40px;
    }
  }
}
</style>
