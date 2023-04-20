<template>
  <ModalWrapper name="login" class-name="login__modal" @before-close="reset">
    <div class="login__wrapper">
      <Title
        class="login__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >вход в личный кабинет</Title
      >
      <Form v-slot="{ invalid }" class="registration__form">
        <div class="registration__inputs">
          <FormItem rules="required|phone">
            <Input
              v-model="form.phone"
              name="phone"
              placeholder="Телефон"
              :mask="'+7 (###) ###-##-##'"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('phone')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('phone')
              "
              >{{ errors["phone"][0] }}</span
            >
          </FormItem>
          <FormItem :rules="{ min: { length: 6 }, required: true }">
            <Input
              v-model="form.password"
              :mask="'######'"
              name="password"
              placeholder="Пароль"
              :isPassword="true"
              :max="6"
              :is-error="
                !!Object.keys(errors).length &&
                errors.hasOwnProperty('password')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length &&
                errors.hasOwnProperty('password')
              "
              >{{ errors["password"][0] }}</span
            >
          </FormItem>
        </div>
        <div class="login__links">
          <button class="login__link" @click="handleRestorePassword">
            Восстановить пароль
          </button>
          <button class="login__link" @click="handleRegistration">
            Зарегистрироваться
          </button>
        </div>
        <div class="login__captcha">
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="siteKey"
            @verify="handleVerifyCaptcha"
            @expired="handleExpiredCaptcha"
          ></vue-recaptcha>
        </div>
        <Button
          :is-loading="isLoading"
          class="login__button"
          @click="submit"
          :is-disabled="invalid || !isCaptchaVerify"
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

import { VueRecaptcha } from "vue-recaptcha";
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    Button,
    Title,
    ModalWrapper,
    Form,
    FormItem,
    Input,
    VueRecaptcha,
  },
  data: () => ({
    isLoading: false,
    isCaptchaVerify: false,
    siteKey: process.env.VUE_APP_CAPTCHA_KEY,
    errors: {},
    form: {
      phone: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions("userModule", ["login", "getUser"]),
    reset() {
      this.errors = {};
      this.isLoading = false;
      this.isCaptchaVerify = false;
      this.form = {
        phone: "",
        password: "",
      };
      this.$refs.recaptcha.reset();
    },
    async submit() {
      gtag("event", "authorization", { event_category: "click_button" }); // eslint-disable-line
      this.isLoading = true;
      await this.login({ ...this.form })
        .then((res) => {
          if (res.data.success) {
            this.$modal.hide("login");

            ym(92440067,'reachGoal','authorization') // eslint-disable-line
            gtag("event", "authorization", { event_category: "send_form" }); // eslint-disable-line
          }
        })
        .catch((e) => {
          if (e.response) {
            this.$toast.open({
              message: e.response.data.response.message,
              type: "error",
              duration: 6000,
            });
            this.errors = e.response.data.errors ? e.response.data.errors : {};
          }
        })
        .finally(() => (this.isLoading = false));
      await this.getUser();
    },
    handleRegistration() {
      this.$modal.hide("login");
      this.$modal.show("registration");
    },
    handleRestorePassword() {
      this.$modal.hide("login");
      this.$modal.show("restore");
    },
    handleVerifyCaptcha(value) {
      if (value) this.isCaptchaVerify = true;
    },
    handleExpiredCaptcha() {
      this.isCaptchaVerify = false;
      this.$refs.recaptcha.reset();
    },
  },
};
</script>

<style lang="scss">
.login {
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

  &__button {
    font-size: 14px;
    line-height: 17px;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    div:not(:last-of-type) {
      margin-bottom: 14px;
    }
  }

  &__links {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 24px;
  }

  &__link {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: var(--color-white);
    border-bottom: 0.5px solid var(--color-white);
  }

  &__captcha {
    margin-bottom: 14px;

    @media (min-width: 1024px) {
      margin-bottom: 24px;
    }
  }
}
</style>
