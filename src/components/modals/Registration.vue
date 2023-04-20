<template>
  <ModalWrapper
    name="registration"
    class-name="registration__modal"
    @before-close="reset"
  >
    <div class="registration__wrapper">
      <Title
        class="registration__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >регистрация</Title
      >
      <Form v-slot="{ invalid }" class="registration__form">
        <div class="registration__inputs">
          <FormItem rules="required">
            <Input
              v-model="form.surname"
              name="surname"
              placeholder="Фамилия"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('surname')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('surname')
              "
              >{{ errors["surname"][0] }}</span
            >
          </FormItem>
          <FormItem rules="required">
            <Input
              v-model="form.name"
              name="name"
              placeholder="Имя"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('name')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('name')
              "
              >{{ errors["name"][0] }}</span
            >
          </FormItem>
          <FormItem rules="required|email">
            <Input
              v-model="form.email"
              name="email"
              placeholder="E-mail"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('email')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('email')
              "
              >{{ errors["email"][0] }}</span
            >
          </FormItem>
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
          <FormItem rules="required">
            <Input
              v-model="form.city"
              name="city"
              placeholder="Город"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('city')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('city')
              "
              >{{ errors["city"][0] }}</span
            >
          </FormItem>
          <FormItem rules="required|date|max-date">
            <Input
              v-model="form.bdate"
              name="bdate"
              placeholder="Дата рождения"
              :mask="'##.##.####'"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('bdate')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('bdate')
              "
              >{{ errors["bdate"][0] }}</span
            >
          </FormItem>
        </div>
        <div class="registration__checkboxes">
          <FormItem rules="checkbox">
            <Checkbox v-model="form.agreements"
              >Я согласен с
              <a href="/rules.pdf" target="_blank" class="registration__link"
                >правилами aкции</a
              >
              и подтверждаю согласие на обработку персональных данных</Checkbox
            >
          </FormItem>
        </div>
        <div class="registration__captcha">
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="siteKey"
            @verify="handleVerifyCaptcha"
            @expired="handleExpiredCaptcha"
          ></vue-recaptcha>
        </div>
        <Button
          @click="submit"
          :is-loading="isLoading"
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
import Form from "@/packages/forms/form/Form";
import FormItem from "@/packages/forms/formItem/FormItem";
import Input from "@/packages/forms/input/Input";
import Checkbox from "@/packages/forms/checkbox/Checkbox";
import ModalWrapper from "@/components/modals/ModalWrapper";

import api from "@/api";
import { VueRecaptcha } from "vue-recaptcha";
import { meta } from "@/helpers/meta";

export default {
  name: "Registration",
  components: {
    Checkbox,
    Input,
    Button,
    Title,
    Form,
    FormItem,
    ModalWrapper,
    VueRecaptcha,
  },
  data: () => ({
    isLoading: false,
    isCaptchaVerify: false,
    errors: {},
    siteKey: process.env.VUE_APP_CAPTCHA_KEY,
    form: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      city: "",
      bdate: "",
      agreements: false,
    },
  }),
  methods: {
    reset() {
      this.$refs.recaptcha.reset();
      this.isCaptchaVerify = false;
      this.isLoading = false;
      this.errors = {};
      this.form = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        city: "",
        bdate: "",
        agreements: false,
      };
    },
    handleVerifyCaptcha(value) {
      if (value) this.isCaptchaVerify = true;
    },
    handleExpiredCaptcha() {
      this.isCaptchaVerify = false;
      this.$refs.recaptcha.reset();
    },
    submit() {
      gtag("event", "registration", { event_category: "click_button" }); // eslint-disable-line
      this.isLoading = true;
      const { name, surname, city, email, phone, bdate } = this.form;
      const [day, month, year] = bdate.split(".");
      const payload = {
        name,
        surname,
        city,
        email,
        phone,
        bdate: `${year}-${month}-${day}`,
      };
      const { referral_code, twitch } = this.$route.query;
      api.auth
        .register({
          ...payload,
          ...meta(this.$route.query),
          referral_code,
          twitch: twitch && !!twitch.length,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$toast.open({
              message: `Регистрация прошла успешна!<br /> Ваш пароль в смс`,
              type: "success",
              duration: 6000,
            });
            this.$modal.hide("registration");
            this.$modal.show("login");

            ym(92440067, "reachGoal", "registration"); // eslint-disable-line
            gtag("event", "registration", { event_category: "send_form" }); // eslint-disable-line
            _tmr.push({ id: '3298833', type: 'reachGoal', goal: 'registered' }); // eslint-disable-line
            reachGoal('Y2xpZW50SWQ9MTk2MyZjb3VudGVySWQ9MTUzNSZnb2FsSWQ9ODUy'); // eslint-disable-line
          }
        })
        .catch((e) => {
          this.$toast.open({
            message: e.response.data.message,
            type: "error",
            duration: 6000,
          });
          this.errors = e.response.data.errors;
          console.error(e.response);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style lang="scss">
.registration {
  &__wrapper {
    padding: 50px 12px 22px;
    @media (min-width: 1024px) {
      padding: 40px 20px 24px;
    }
  }

  &__modal {
    margin: 0 auto;
    width: 335px;

    @media (min-width: 1024px) {
      width: 453px;
    }
  }

  &__title {
    margin-bottom: 24px;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 24px;

    div:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }

  &__checkboxes {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin-bottom: 12px;

    @media (min-width: 1024px) {
      margin-bottom: 32px;
    }
  }

  &__link {
    color: var(--color-orange);
    border-bottom: 0.5px solid var(--color-orange);
  }

  &__captcha {
    margin-bottom: 14px;

    @media (min-width: 1024px) {
      margin-bottom: 24px;
    }
  }
}
</style>
