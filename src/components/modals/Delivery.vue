<template>
  <ModalWrapper
    name="delivery"
    class-name="delivery"
    @before-close="resetForm"
    @before-open="handleBeforeOpen"
  >
    <div class="delivery__wrapper">
      <Title
        class="delivery__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >Данные для доставки
      </Title>
      <p class="delivery__subtitle">{{ this.prizeName }}</p>
      <Form class="delivery-form-wrapper" v-slot="{ invalid }">
        <form class="delivery-form">
          <div class="delivery-form__inputs">
            <FormItem
              v-for="(field, index) in forms[type].fields"
              :key="index"
              :rules="field.rules"
            >
              <Input
                v-model="forms[type].form[field.name]"
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
          <div class="delivery-form__files" v-if="type === 'special'">
            <file-upload
              :is-file="!!files.length"
              :max-size="5"
              name="file-passport-first"
              label="скан/фото паспорта (первый разворот)"
              @upload="handleUpload"
            />
            <file-upload
              :is-file="!!files.length"
              :max-size="5"
              name="file-passport-second"
              label="скан/фото паспорта (разворот с пропиской)"
              @upload="handleUpload"
            />
            <file-upload
              :is-file="!!files.length"
              :max-size="5"
              name="file-inn"
              label="скан/фото ИНН"
              @upload="handleUpload"
            />
          </div>
          <div class="delivery-form__action">
            <Button
              @click="submit"
              :is-loading="isLoading"
              :is-disabled="invalid"
              >отправить</Button
            >
          </div>
        </form>
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
import FileUpload from "@/packages/file-upload/FileUpload.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Delivery",
  components: {
    Button,
    Title,
    ModalWrapper,
    Form,
    FormItem,
    Input,
    FileUpload,
  },
  data: () => ({
    type: "default",
    files: [],
    params: {},
    prizeName: "",
    winner_id: null,
    isLoading: false,
    errors: {},
    forms: {
      default: {
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
        ],
        form: {},
      },
      special: {
        fields: [
          {
            id: 1,
            name: "fio",
            placeholder: "ФИО",
            rules: "required",
          },
          {
            id: 2,
            name: "date",
            placeholder: "Дата рождения",
            mask: "##.##.####",
            rules: "required|date|max-date",
          },
          {
            id: 3,
            name: "passport",
            placeholder: "Паспорт серия и номер",
            rules: "required",
            mask: "#### #######",
          },
          {
            id: 4,
            name: "issued_at",
            placeholder: "Когда выдан паспорт",
            mask: "##.##.####",
            rules: "required|date|max-date",
          },
          {
            id: 4,
            name: "issued_by",
            placeholder: "Кем выдан паспорт",
            rules: "required",
          },
          {
            id: 5,
            name: "address",
            placeholder: "Адрес прописки с индексом",
            rules: "required",
          },
          {
            id: 6,
            name: "inn",
            placeholder: "ИНН",
            rules: "required|numeric",
          },
        ],
        form: {},
      },
    },
  }),
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions("userModule", ["delivery"]),
    updateUserData() {
      if (this.user) {
        const [year, mouth, day] = this.user.bdate.split("-");
        this.forms[this.type].form = {
          phone: this.user.phone,
          email: this.user.email,
          fio: `${this.user.surname} ${this.user.name}`,
          date: `${day}.${mouth}.${year}`,
        };
      }
    },
    handleBeforeOpen(event) {
      console.log("Params:", event.params);
      const { index, modals } = event.params;
      this.params = event.params;
      this.type = modals[index].type;
      this.winner_id = modals[index].winner_id;
      this.prizeName = modals[index].prize;
      this.updateUserData();
    },
    async submit() {
      this.isLoading = true;
      const { phone: userPhone, city, email: userEmail } = this.user;
      const {
        fio,
        phone,
        email,
        address,
        passport,
        issued_at,
        issued_by,
        inn,
      } = this.forms[this.type].form;
      const formData = new FormData();

      if (this.type === "default") {
        formData.append("email", email);
        formData.append("phone", phone);
      } else {
        this.files.forEach((value, index) => {
          formData.append("files[" + index + "]", value);
        });

        formData.append(
          "phone",
          userPhone
            .replace(/\D+/g, "")
            .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
        );
        formData.append("email", userEmail);
        formData.append("series", passport.substr(0, 4));
        formData.append("number", passport.substr(-7, 7));
        formData.append("issued_at", issued_at);
        formData.append("issued_by", issued_by);
        formData.append("inn", inn);
      }

      formData.append("winner_id", this.winner_id);
      formData.append("city", city);
      formData.append("name", fio);
      formData.append("address", address);

      await this.delivery(formData)
        .then((res) => {
          if (res.data.success) {
            this.$toast.open({
              message: res.data.response.message,
              type: "success",
              duration: 6000,
            });
            this.reset();
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
    handleUpload(file) {
      this.files = [...this.files, file];
    },
    resetForm() {
      this.forms.default.form = {};
      this.forms.special.form = {};
      this.files = [];
      this.isLoading = false;
      this.errors = {};
    },
    reset() {
      this.resetForm();

      if (this.params.index + 1 < this.params.modals.length) {
        this.params.index += 1;
        this.type = this.params.modals[this.params.index].type;
        this.winner_id = this.params.modals[this.params.index].winner_id;
        this.prizeName = this.params.modals[this.params.index].prize;
        this.updateUserData();

        this.$toast.open({
          message: `Необходимо заполнить форму для следующего приза`,
          type: "info",
          duration: 3000,
        });
      } else {
        this.$modal.hide("delivery");
      }
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.updateUserData();
      }
    },
  },
};
</script>

<style lang="scss">
.delivery {
  &__wrapper {
    padding: 43px 30px 22px;
    @media (min-width: 1024px) {
      padding: 40px 13px 24px;
    }
  }

  &__modal {
    margin: 0 auto;
    width: 335px;

    &::-webkit-scrollbar {
      width: 0;
    }

    @media (min-width: 1024px) {
      width: 500px;
    }
  }

  &__title {
    margin-bottom: 4px;
    text-align: center;
    font-size: 22px !important;
    line-height: 26px !important;
  }

  &__subtitle {
    font-size: 14px;
    font-family: var(--font-optima);
    color: var(--color-white);
    text-align: center;
    margin-bottom: 24px;
  }

  &__button {
    font-size: 14px;
    line-height: 17px;
  }

  &-form {
    &__inputs {
      display: flex;
      flex-direction: column;
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
      margin-bottom: 24px;

      @media (min-width: 1024px) {
        margin-bottom: 32px;
      }
    }

    &__files {
      margin-bottom: 28px;

      div:not(:last-of-type) {
        margin-bottom: 12px;
      }
    }

    &__link {
      color: var(--color-orange);
      border-bottom: 0.5px solid var(--color-orange);
    }

    &__action {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  &__links {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 24px;
  }

  &__captcha {
    margin-bottom: 14px;

    @media (min-width: 1024px) {
      margin-bottom: 24px;
    }
  }
}
</style>
