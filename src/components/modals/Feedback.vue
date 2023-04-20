<template>
  <ModalWrapper
    name="feedback"
    class-name="feedback__modal"
    @before-close="reset"
  >
    <div class="feedback__wrapper">
      <Title
        class="feedback__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >обратная связь</Title
      >
      <Form v-slot="{ invalid }" class="registration__form">
        <div class="registration__inputs">
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
          <FormItem rules="required">
            <Dropdown
              placeholder="Выберите тему обращения"
              v-model="form.subject"
              :options="options"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('subject')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('subject')
              "
              >{{ errors["subject"][0] }}</span
            >
          </FormItem>
          <FormItem rules="required">
            <Textarea
              v-model="form.message"
              name="message"
              placeholder="Текст"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('message')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('message')
              "
              >{{ errors["message"][0] }}</span
            >
          </FormItem>
        </div>
        <div class="feedback__captcha">
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="siteKey"
            @verify="handleVerifyCaptcha"
            @expired="handleExpiredCaptcha"
          ></vue-recaptcha>
        </div>
        <Button
          :is-loading="isLoading"
          class="feedback__button"
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
import Textarea from "@/packages/forms/textarea/Textarea";
import Dropdown from "@/packages/dropdown/Dropdown";

export default {
  name: "Feedback",
  components: {
    Dropdown,
    Textarea,
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
    options: [
      { title: "Не могу зарегистрироваться/авторизоваться" },
      { title: "Не могу загрузить чек" },
      { title: "Вопросы по Правилам акции" },
      { title: "Вопросы по Призам" },
      { title: "Другое" },
    ],
    form: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  }),
  methods: {
    ...mapActions("userModule", ["feedback"]),
    reset() {
      this.errors = {};
      this.isLoading = false;
      this.isCaptchaVerify = false;
      this.form = {
        name: "",
        email: "",
        subject: "",
        message: "",
      };
      this.$refs.recaptcha.reset();
    },
    async submit() {
      this.isLoading = true;
      await this.feedback({ ...this.form, subject: this.form.subject.title })
        .then((res) => {
          if (res.data.success) {
            this.$toast.open({
              message: res.data.response.message,
              type: "success",
              duration: 6000,
            });
            this.$modal.hide("feedback");

            gtag("event", "feedback", { event_category: "send_form" }); // eslint-disable-line
            ym(92440067, "reachGoal", " feedback"); // eslint-disable-line
          }
        })
        .catch((e) => {
          if (e.response) {
            this.$toast.open({
              message: e.response.data.message,
              type: "error",
              duration: 6000,
            });
            this.errors = e.response.data.errors ? e.response.data.errors : {};
          }
          console.error(e.response);
        })
        .finally(() => (this.isLoading = false));
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
.feedback {
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
      width: 452px;
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
    margin-bottom: 24px;

    div:not(:last-of-type) {
      margin-bottom: 12px;
    }

    @media (min-width: 1024px) {
      margin-bottom: 32px;
    }
  }

  &__captcha {
    margin-bottom: 24px;
  }
}
</style>
