<template>
  <ModalWrapper
    name="success"
    class-name="success__modal"
    @before-open="handleBeforeOpen"
    @before-close="handleClose"
  >
    <div class="success__wrapper">
      <Title
        class="success__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >{{ title }}</Title
      >
      <p class="success__text">
        {{ text }}
      </p>
    </div>
  </ModalWrapper>
</template>

<script>
import Title from "@/packages/title/Title";
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "Success",
  components: {
    Title,
    ModalWrapper,
  },
  data: () => ({
    text: "",
    title: "",
    redirect: "",
  }),
  methods: {
    handleBeforeOpen(event) {
      console.log("Params:", event.params);
      const { text, title, redirect } = event.params;
      this.text = text;
      this.title = title;
      this.redirect = redirect;
    },
    handleClose() {
      if (this.redirect.length) {
        this.$router.push(this.redirect);
      }
    },
  },
};
</script>

<style lang="scss">
.success {
  &__wrapper {
    padding: 43px 30px;
    @media (min-width: 1024px) {
      padding: 60px 45px;
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

  &__text {
    font-weight: 400;
    font-size: 16px;
    color: var(--color-white);
    text-align: center;

    @media (min-width: 1024px) {
      font-size: 18px;
    }
  }
}
</style>
