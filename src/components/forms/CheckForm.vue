<template>
  <div class="checkForm">
    <Title
      class="checkForm__title"
      font="optima"
      :weight="700"
      :level="4"
      color="white"
      :is-uppercase="true"
      >введите данные вручную</Title
    >
    <Form class="checkForm__form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="checkForm__inputs">
          <FormItem rules="required|numeric">
            <Input
              v-model="form.fp"
              name="fp"
              placeholder="ФП"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('fp')
              "
            />
            <span
              class="formItem__error"
              v-if="!!Object.keys(errors).length && errors.hasOwnProperty('fp')"
              >{{ errors["fp"][0] }}</span
            >
          </FormItem>
          <FormItem rules="required|numeric">
            <Input
              v-model="form.fn"
              name="fn"
              placeholder="ФН"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('fn')
              "
            />
            <span
              class="formItem__error"
              v-if="!!Object.keys(errors).length && errors.hasOwnProperty('fn')"
              >{{ errors["fn"][0] }}</span
            >
          </FormItem>
          <FormItem rules="required|numeric">
            <Input
              v-model="form.fd"
              name="fd"
              placeholder="ФД"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('i')
              "
            />
            <span
              class="formItem__error"
              v-if="!!Object.keys(errors).length && errors.hasOwnProperty('i')"
              >{{ errors["i"][0] }}</span
            >
          </FormItem>
          <FormItem rules="required|date|max-date">
            <Input
              v-model="form.date"
              name="date"
              placeholder="Дата"
              :mask="'##.##.####'"
              :is-error="
                !!Object.keys(errors).length && errors.hasOwnProperty('date')
              "
            />
            <span
              class="formItem__error"
              v-if="
                !!Object.keys(errors).length && errors.hasOwnProperty('date')
              "
              >{{ errors["date"][0] }}</span
            >
          </FormItem>
          <div class="checkForm__row">
            <FormItem rules="required|time">
              <Input
                v-model="form.time"
                name="time"
                :mask="timeMask"
                :max="5"
                placeholder="Время"
                :is-error="
                  !!Object.keys(errors).length && errors.hasOwnProperty('time')
                "
              />
              <span
                class="formItem__error"
                v-if="
                  !!Object.keys(errors).length && errors.hasOwnProperty('time')
                "
                >{{ errors["time"][0] }}</span
              >
            </FormItem>
            <FormItem rules="required">
              <Input
                v-model="form.total"
                name="total"
                placeholder="Сумма"
                :mask="currencyMask"
                :is-error="
                  !!Object.keys(errors).length && errors.hasOwnProperty('s')
                "
              />
              <span
                class="formItem__error"
                v-if="
                  !!Object.keys(errors).length && errors.hasOwnProperty('s')
                "
                >{{ errors["s"][0] }}</span
              >
            </FormItem>
          </div>
        </div>
        <Button :is-loading="isLoading" class="checkForm__button" type="submit"
          >отправить</Button
        >
      </form>
    </Form>
  </div>
</template>

<script>
import Form from "@/packages/forms/form/Form";
import FormItem from "@/packages/forms/formItem/FormItem";
import Input from "@/packages/forms/input/Input";
import Title from "@/packages/title/Title";
import Button from "@/packages/button/Button";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const currencyMask = createNumberMask({
  prefix: "",
  suffix: "",
  allowDecimal: true,
  includeThousandsSeparator: false,
  allowNegative: false,
});
export default {
  name: "CheckForm",
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Object,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  components: { Form, FormItem, Input, Title, Button },
  data: () => ({
    form: {},
    currencyMask,
  }),
  computed: {},
  mounted() {
    this.form = this.value;
  },
  methods: {
    timeMask(value) {
      const hours = [/[0-2]/, value.charAt(0) === "2" ? /[0-3]/ : /[0-9]/];
      const minutes = [/[0-5]/, /[0-9]/];
      return value.length > 2 ? [...hours, ":", ...minutes] : hours;
    },
    onSubmit() {
      this.$emit("submit", this.form);
    },
  },
  watch: {
    value() {
      this.form = this.value;
    },
  },
};
</script>

<style lang="scss">
.checkForm {
  &__title {
    margin-bottom: 24px;
    text-align: center;

    @media (min-width: 1024px) {
      font-size: 22px !important;
      line-height: 26px !important;
    }
  }

  &__form {
  }
  &__inputs {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    div:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
  &__row {
    display: flex;
    gap: 8px;
  }
  &__button {
    margin: 0 auto;
  }
}
</style>
