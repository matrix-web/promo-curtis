<template>
  <div>
    <Container
      :is-prizes="false"
      :is-opacity="false"
      :is-min-height="true"
      :is-bg="true"
    >
      <div class="modal" v-if="isDrop">
        <Title
          class="delivery__title"
          font="optima"
          :weight="700"
          :level="4"
          color="white"
          :is-uppercase="true"
          >Данные для доставки</Title
        >
        <Form class="delivery-form-wrapper" v-slot="{ invalid }">
          <form class="delivery-form">
            <div class="delivery-form__inputs">
              <FormItem
                v-for="field in fields"
                :key="field.id"
                :rules="field.rules"
              >
                <Input
                  v-model="form[field.name]"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  :mask="field?.mask"
                  :is-error="
                    !!Object.keys(errors).length &&
                    errors.hasOwnProperty(field.name)
                  "
                />
                <span
                  class="formItem__error"
                  v-if="
                    !!Object.keys(errors).length &&
                    errors.hasOwnProperty(field.name)
                  "
                  >{{ errors[field.name][0] }}</span
                >
              </FormItem>
            </div>
            <div class="delivery-form__checkboxes">
              <FormItem rules="checkbox">
                <Checkbox v-model="agreements"
                  >Я согласен с
                  <a
                    href="/rules.pdf"
                    target="_blank"
                    class="delivery-form__link"
                    >правилами aкции</a
                  >
                  и подтверждаю согласие на обработку персональных
                  данных</Checkbox
                >
              </FormItem>
            </div>
            <div class="modal__captcha">
              <vue-recaptcha
                ref="recaptcha"
                :sitekey="siteKey"
                @verify="handleVerifyCaptcha"
                @expired="handleExpiredCaptcha"
              ></vue-recaptcha>
            </div>
            <div class="delivery-form__action">
              <Button
                @click="submit"
                :is-loading="isLoading"
                :is-disabled="invalid || !isCaptchaVerify"
                >отправить</Button
              >
            </div>
          </form>
        </Form>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "@/components/common/Container";
import Title from "@/packages/title/Title";
import FormItem from "@/packages/forms/formItem/FormItem";
import Form from "@/packages/forms/form/Form";
import Input from "@/packages/forms/input/Input";
import Checkbox from "@/packages/forms/checkbox/Checkbox";
import Button from "@/packages/button/Button";
import { VueRecaptcha } from "vue-recaptcha";
import api from "@/api";

export default {
  name: "Drop",
  components: {
    Container,
    Title,
    FormItem,
    Form,
    Input,
    Checkbox,
    Button,
    VueRecaptcha,
  },
  data: () => ({
    fields: [
      {
        id: 1,
        name: "fio",
        placeholder: "ФИО",
        rules: "required",
      },
      {
        id: 2,
        name: "email",
        placeholder: "E-mail",
        rules: "required|email",
      },
      {
        id: 3,
        name: "phone",
        placeholder: "Телефон",
        rules: "required|phone",
        mask: "+7 (###) ###-##-##",
      },
      {
        id: 4,
        name: "address",
        placeholder: "Почтовый адрес",
        rules: "required",
      },
      {
        id: 5,
        name: "code",
        placeholder: "Код из пачки",
        rules: "required",
      },
    ],
    isCaptchaVerify: false,
    siteKey: process.env.VUE_APP_CAPTCHA_KEY,
    form: {},
    agreements: false,
    errors: {},
    isLoading: false,
    isDrop: true,
  }),
  mounted() {},
  methods: {
    handleVerifyCaptcha(value) {
      if (value) this.isCaptchaVerify = true;
    },
    handleExpiredCaptcha() {
      this.isCaptchaVerify = false;
      this.$refs.recaptcha.reset();
    },
    reset() {
      this.form = {};
      this.isLoading = false;
      this.agreements = false;
      this.handleExpiredCaptcha();
    },
    submit() {
      this.isLoading = true;
      const { fio, email, phone, address, code } = this.form;
      const payload = {
        name: fio,
        email,
        phone,
        address,
        code,
      };
      api.user
        .drops(payload)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$modal.show("success", {
              title: "Спасибо!",
              text: `Данные для доставки приза ${res.data.response.prize} получены. Если каких-то данных будет не хватать, мы свяжемся дополнительно.`,
              redirect: "/",
            });

            this.reset();
            this.isDrop = false;
          }
        })
        .catch((e) => {
          console.error("e", e.response);
          this.$toast.open({
            message: e.response.data.response.message,
            type: "error",
            duration: 6000,
          });
          this.errors = e.response.data.errors ? e.response.data.errors : {};
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  padding: 50px 12px 18px;
  width: 100%;
  max-width: 335px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/img/backgrounds/gradient-mobile.png");
  box-shadow: 0 4px 23px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    max-width: 400px;
    padding: 40px 20px 20px;
    background-image: url("@/assets/img/backgrounds/gradient.png");
  }

  .delivery__title {
    margin-bottom: 24px;
  }

  &__captcha {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }
}
</style>
