<template>
  <ModalWrapper name="alert" class-name="alert__modal">
    <div class="alert__wrapper">
      <Title
        class="alert__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >для участия в акции необходимо</Title
      >
      <div class="alert__buttons">
        <Button @click="handleRegistration">Зарегистрироваться</Button>
        <Button :is-outlined="true" @click="handleLogin">авторизоваться</Button>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import Title from "@/packages/title/Title";
import Button from "@/packages/button/Button";
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "Alert",
  components: {
    Button,
    Title,
    ModalWrapper,
  },
  methods: {
    handleRegistration() {
      this.$modal.hide('alert');
      this.$modal.show("registration");
    },
    handleLogin() {
      this.$modal.hide('alert');
      this.$modal.show("login");
    },
  },
};
</script>

<style lang="scss">
.alert {
  &__wrapper {
    padding: 43px 30px 22px;
    @media (min-width: 1024px) {
      padding: 40px 13px 24px;
    }
  }

  &__modal {
    margin: 0 auto;
    width: 335px;

    @media (min-width: 1024px) {
      width: 500px;
    }
  }

  &__title {
    margin-bottom: 24px;
    text-align: center;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;

    .button {
      font-size: 14px;
      line-height: 17px;
    }

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
}
</style>
