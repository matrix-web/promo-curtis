<template>
  <ModalWrapper
    name="restore"
    class-name="restore__modal"
    @before-close="reset"
  >
    <div class="restore__wrapper">
      <Title
        class="restore__title"
        :class="{ 'm-space': isCodeSend }"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >{{ title }}</Title
      >
      <p v-if="!isCodeSend" class="restore__text">
        Укажите свой номер телефона:
      </p>
      <Form v-slot="{ invalid }" class="registration__form">
        <div class="registration__inputs">
          <FormItem v-if="!isCodeSend" rules="required|phone">
            <Input
              v-model="phone"
              name="phone"
              placeholder="Телефон"
              :mask="'+7 (###) ###-##-##'"
            />
          </FormItem>
          <FormItem
            v-if="isCodeSend"
            :rules="{ min: { length: 6 }, required: isCodeSend }"
          >
            <Input
              v-model="password"
              :mask="'######'"
              name="password"
              placeholder="Пароль"
              inputmode="numeric"
              pattern="[0-9]"
              autocomplete="one-time-code"
              :isPassword="true"
              :max="6"
              :is-focus="isCodeSend"
            />
          </FormItem>
        </div>
        <Button
          class="restore__button"
          @click="handleSubmit"
          :is-disabled="invalid"
          :is-loading="isLoading"
          >отправить</Button
        >
      </Form>
    </div>
  </ModalWrapper>
</template>

<script>
import Title from "@/packages/title/Title";
import Button from "@/packages/button/Button";
import ModalWrapper from "@/components/modals/ModalWrapper";
import Form from "@/packages/forms/form/Form";
import FormItem from "@/packages/forms/formItem/FormItem";
import Input from "@/packages/forms/input/Input";
import { mapActions } from "vuex";

export default {
  name: "Restore",
  components: {
    Button,
    Title,
    ModalWrapper,
    Form,
    FormItem,
    Input,
  },
  data: () => ({
    isLoading: false,
    phone: "",
    password: "",
    isCodeSend: false,
  }),
  methods: {
    ...mapActions("userModule", ["resetPassword", "login", "getUser"]),
    reset() {
      this.phone = "";
      this.password = "";
      this.isCodeSend = false;
    },
    handleSubmit() {
      gtag("event", "reestablish", { event_category: "click_button" }); // eslint-disable-line
      this.isCodeSend ? this.submit() : this.sendCode();
    },
    sendCode() {
      this.isLoading = true;
      this.resetPassword({ phone: this.phone })
        .then((res) => {
          if (res && res.data.success) {
            this.isCodeSend = true;
          }
        })
        .finally(() => (this.isLoading = false));
    },
    async submit() {
      const { phone, password } = this;
      this.isLoading = true;
      await this.login({ phone, password })
        .then((res) => {
          if (res.data.success) this.$modal.hide("restore");
        })
        .catch((e) => {
          this.$toast.open({
            message: e.response.data.response.message,
            type: "error",
            duration: 6000,
          });
          console.error(e.response);
        })
        .finally(() => (this.isLoading = false));
      await this.getUser();
    },
  },
  computed: {
    title() {
      return this.isCodeSend
        ? "на указанный номер телефона был отправлен пароль"
        : "восстановление пароля";
    },
  },
};
</script>

<style lang="scss">
.restore {
  &__wrapper {
    padding: 50px 12px 24px;
    @media (min-width: 1024px) {
      padding: 40px 20px 32px;
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
    margin-bottom: 7px;
    text-align: center;

    &.m-space {
      margin-bottom: 32px;
    }
  }

  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: var(--color-white);
    margin-bottom: 30px;
  }

  &__button {
    font-size: 14px;
    line-height: 17px;
  }

  &__inputs {
    margin-bottom: 32px;
  }
}
</style>
