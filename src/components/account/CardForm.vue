<template>
  <form class="card-form" @submit.prevent="handleSubmit">
    <p class="card-form__title">
      Номер карты
      <img src="@/assets/img/svg/magnit-white.svg" class="card-form__icon" alt="magnit" />
    </p>
    <div class="card-form__field">
      <Input
        v-model.trim="cardNumber"
        :variant="variant"
        :mask="'#### #### #### ####'"
        placeholder="1111 1111 1111 1111"
        :is-disabled="!isUpdate && user && user.card"
        is-text-center
      />
    </div>
    <button class="card-form__button" :disabled="isLoading">
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Input from "@/packages/forms/input/Input.vue";

export default {
  name: "CardForm",
  props: {
    variant: {
      type: String,
      default: "secondary",
      validate: (value) => ["primary", "secondary", "tertiary"].includes(value),
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  components: {
    Input,
  },
  data() {
    return {
      cardNumber: null,
      isLoading: false,
      isUpdate: false,
    };
  },
  watch: {
    user(val) {
      if (val) {
        this.cardNumber = val.card;
      }
    },
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
    innerValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    buttonText() {
      return this.user
        ? this.user.card && !this.isUpdate
          ? "Редактировать"
          : this.user.card && this.isUpdate
          ? "Сохранить"
          : "Добавить"
        : "";
    },
  },
  methods: {
    ...mapActions("userModule", ["update", "getUser"]),
    async handleSubmit() {
      gtag("event", "card update", { event_category: "click_button" }); // eslint-disable-line
      try {
        this.isLoading = true;
        if (!this.user.card) {
          await this.update({ card: this.cardNumber });
          await this.getUser();
          gtag("event", "card update", { event_category: "send_form" }); // eslint-disable-line
        } else {
          this.isUpdate = !this.isUpdate;
          if (this.cardNumber !== this.user.card) {
            await this.update({ card: this.cardNumber });
            await this.getUser();
            gtag("event", "card update", { event_category: "send_form" }); // eslint-disable-line
            this.isUpdate = false;
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    if (this.user) {
      this.cardNumber = this.user.card;
    }
  },
};
</script>

<style lang="scss" scoped>
.card-form {
  display: flex;
  flex-direction: column;
  text-align: center;

  &__title {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: var(--color-white);
    margin-bottom: 2px;

    @media (min-width: 1240px) {
      margin-bottom: 12px;
    }
  }

  &__field {
    margin-bottom: 2px;

    @media (min-width: 1240px) {
      margin-bottom: 12px;
    }
  }

  &__button {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    text-decoration-line: underline;
    color: var(--color-orange);

    @media (min-width: 768px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
}
</style>
