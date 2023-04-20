<template>
  <ModalWrapper name="check" class-name="check__modal" @before-close="reset">
    <div class="check__wrapper">
      <Title
        class="check__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >загрузить чек</Title
      >
      <ul class="check__rules">
        <li class="check__rule" v-for="(rule, index) in rules" :key="index">
          {{ index + 1 }}. {{ rule }}
        </li>
      </ul>

      <div
        class="custom-dropdown-zone desktop"
        :class="{
          error:
            !!Object.keys(errors).length && errors.hasOwnProperty('files.0'),
        }"
      >
        <div
          class="dropzone-text"
          :class="{ loading: isFileLoading }"
          v-if="isFileLoading"
        >
          Чек загружается
          <Loader />
        </div>

        <div class="dropzone-text" v-if="files.length === 0 && !isFileLoading">
          Перетащить изображение чека
        </div>

        <div class="img-w" v-for="(image, index) in files" :key="index">
          <div @click.prevent="deleteImage(index)" class="delete-img">
            <img
              loading="lazy"
              :src="require('@/assets/img/svg/minus.svg')"
              alt="close"
              width="12"
              height="12"
            />
          </div>

          <img class="image" :src="image.src" alt="image" />
        </div>

        <vue-dropzone
          @vdropzone-complete="afterComplete"
          @vdropzone-sending="isFileLoading = true"
          id="dropImg"
          :options="dropOptions"
        >
        </vue-dropzone>
        <span
          class="formItem__error"
          v-if="
            !!Object.keys(errors).length && errors.hasOwnProperty('files.0')
          "
          >{{ errors["files.0"][0] }}</span
        >
      </div>

      <div class="mobile">
        <div class="content">
          <qrcode-stream @decode="onDecodeStream"></qrcode-stream>
        </div>

        <div
          v-if="qrText"
          style="text-align: center; margin-top: 20px; color: white"
        >
          <strong>Данные по</strong> QR-коду указаны ниже
        </div>

        <div
          style="
            text-align: center;
            margin: 25px 0;
            font-size: 13px;
            line-height: 16px;
            color: white;
          "
        >
          Если не удалось отсканировать QR-код — загрузите фото отдельным
          кадром. <br />
          Если фото окажется плохого качества — чек принят не будет
        </div>
        <div class="buttons-wrapper">
          <label class="">
            <input
              type="file"
              @change="onDecode"
              accept="image/jpeg, image/png, image/jpg"
            />

            <span class="scan">Загрузить фото чека</span>
          </label>
        </div>
      </div>

      <transition name="fade">
        <CheckForm
          v-if="showInputs"
          :errors="errors"
          :value="form"
          @submit="onSubmit"
          :isLoading="isSubmitLoading"
        />
      </transition>
    </div>
  </ModalWrapper>
</template>

<script>
import Title from "@/packages/title/Title";
import ModalWrapper from "@/components/modals/ModalWrapper";
import CheckForm from "@/components/forms/CheckForm";
import Loader from "@/packages/loader/Loader";
import QrScanner from "qr-scanner";
import vueDropzone from "vue2-dropzone";
import { mapActions } from "vuex";

export default {
  name: "Check",
  props: {},
  components: {
    CheckForm,
    Title,
    ModalWrapper,
    vueDropzone,
    Loader,
  },
  data: () => ({
    form: { fp: "", fn: "", fd: "", date: "", time: "", total: "" },
    rules: [
      "Нажмите на область “Перетащите фото чека или нажмите для выбора” и выберите фото чека",
      "Если чек длинный, сделайте несколько последовательных фото",
      "Если на чеке есть QR-код, сделайте фото отдельным кадром",
      "Если фото окажется плохого качества, чек принят не будет",
    ],
    dropOptions: {
      url: "https://httpbin.org/post",
      acceptedFiles: "image/png, image/jpg, image/jpeg, image/bmp",
      maxFilesize: 5, // MB
    },
    qrText: false,
    result: "",
    files: [],
    qrData: [],
    showInputs: false,
    t: "",
    isFileLoading: false,
    isSubmitLoading: false,
    errors: {},
  }),
  mounted() {},
  computed: {},
  methods: {
    ...mapActions("userModule", ["receipt"]),
    reset() {
      this.form = { fp: "", fn: "", fd: "", date: "", time: "", total: "" };
      this.t = "";
      this.qrText = false;
      this.showInputs = false;
      this.files = [];
      this.qrData = [];
      this.isFileLoading = false;
      this.isSubmitLoading = false;
      this.errors = {};
    },
    async onSubmit(form) {
      console.log(form);
      this.isSubmitLoading = true;

      const formData = new FormData();
      this.files.forEach((value, index) => {
        formData.append("files[" + index + "]", value.data);
      });
      formData.append("fp", form.fp);
      formData.append("fn", form.fn);
      formData.append("i", form.fd);
      formData.append("date", form.date);
      formData.append("time", form.time);
      formData.append("s", form.total);
      formData.append("t", this.t);

      await this.receipt(formData)
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            this.$toast.open({
              message: res.data.response.message,
              type: "success",
              duration: 6000,
            });

            gtag("event", "popup_receipt", { event_category: "button_send" }); // eslint-disable-line
            ar_callCounter("otpravit"); // eslint-disable-line
            ym(92440067, "reachGoal", "send_check"); // eslint-disable-line
            _tmr.push({ id: '3298833', type: 'reachGoal', goal: 'lead' }); // eslint-disable-line
            reachGoal('Y2xpZW50SWQ9MTk2MyZjb3VudGVySWQ9MTUzNSZnb2FsSWQ9ODUz'); // eslint-disable-line
            otmButtonOnSubmit() // eslint-disable-line
            // ADSPEND.onReady('retargeting', ['641db54998657b7269a8146a']) // eslint-disable-line

            this.$modal.hide("check");
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
        .finally(() => (this.isSubmitLoading = false));
    },
    onDecodeStream(decodedString) {
      this.result = decodedString;

      let newDate;
      this.qrData = decodedString.split("&");

      newDate = this.qrData.map((value) => {
        return value.split("=");
      });
      this.handleFormFromQr(newDate);
      this.qrText = true;
      this.showInputs = true;
    },
    afterComplete(file) {
      QrScanner.scanImage(file)
        .then((result) => {
          let newDate;
          this.qrData = result.split("&");
          newDate = this.qrData.map((value) => {
            return value.split("=");
          });
          this.handleFormFromQr(newDate);

          let reader = new FileReader();
          reader.onload = (e) => {
            this.files.push({
              src: e.target.result,
              correct: true,
              data: file,
            });
            this.isFileLoading = false;
          };
          reader.readAsDataURL(file);
        })
        .catch((error) => {
          console.log(error);
          let reader = new FileReader();
          reader.onload = (e) => {
            this.files.push({
              src: e.target.result,
              correct: false,
              data: file,
            });
          };
          reader.readAsDataURL(file);
        })
        .finally(() => {
          this.isFileLoading = false;
        });

      this.qrText = true;
      this.showInputs = true;
    },
    deleteImage(index) {
      this.files.splice(index, 1);
      if (this.files.length === 0) {
        this.showInputs = false;
      }
    },
    onDecode(event) {
      QrScanner.scanImage(event.target.files[0])
        .then((result) => {
          let newDate;

          this.qrData = result.split("&");

          newDate = this.qrData.map((value) => {
            return value.split("=");
          });
          this.handleFormFromQr(newDate);
          let reader = new FileReader();
          reader.onload = (e) => {
            this.files.push({
              src: e.target.result,
              correct: true,
              data: event.target.files[0],
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        })
        .catch((error) => {
          console.log(error);
          let reader = new FileReader();
          reader.onload = (e) => {
            this.files.push({
              src: e.target.result,
              correct: false,
              data: event.target.files[0],
            });
          };
          reader.readAsDataURL(event.target.files[0]);
        });

      this.qrText = true;
      this.showInputs = true;
    },
    handleFormFromQr(data) {
      data.forEach((value) => {
        if (value[0] === "fn") {
          this.form.fn = value[1];
        }
        if (value[0] === "fp") {
          this.form.fp = value[1];
        }
        if (value[0] === "i") {
          this.form.fd = value[1];
        }
        if (value[0] === "s") {
          this.form.total = value[1];
        }
        if (value[0] === "t") {
          this.t = value[1];
          let chDate = value[1].split("T")[0].split("");
          let chTime = value[1].split("T")[1].split("");

          this.form.date =
            chDate[6] +
            chDate[7] +
            "." +
            chDate[4] +
            chDate[5] +
            "." +
            chDate[0] +
            chDate[1] +
            chDate[2] +
            chDate[3];
          this.form.time = chTime[0] + chTime[1] + ":" + chTime[2] + chTime[3];
        }
      });
    },
  },
};
</script>

<style lang="scss">
.check {
  &__wrapper {
    padding: 50px 12px 24px;
    @media (min-width: 1024px) {
      padding: 40px 20px 32px;
    }
  }

  &__modal {
    margin: 0 auto;
    width: 320px;

    @media (min-width: 1024px) {
      width: 453px;
    }
  }

  &__title {
    margin-bottom: 16px;
    text-align: center;

    @media (min-width: 1024px) {
      font-size: 22px !important;
      line-height: 26px !important;
    }
  }

  &__rules {
    color: var(--color-white);
    display: flex;
    flex-direction: column;
    max-width: 280px;
    margin: 0 auto 48px;

    @media (min-width: 1024px) {
      max-width: none;
    }
  }
  &__rule {
    font-size: 13px;
    line-height: 16px;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  &__buttons {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;

    .button {
      font-size: 14px;
      line-height: 17px;
    }
  }
}

.scan {
  font-size: 19px;
  line-height: 23px;
  color: var(--color-orange);
  text-decoration-line: underline;
  display: block;
  text-align: center;
  margin-bottom: 20px;
}

.dropzone-info {
  height: 250px;
  display: flex;
  font-family: var(--font-regular);
  flex-direction: column;
  justify-content: space-between;
  padding-left: 25px;

  @media (max-width: 999px) {
    height: 200px;
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    height: auto;
    margin-bottom: 35px;

    div {
      font-size: 16px;
      text-align: center;
    }
  }

  div {
    line-height: 170%;

    @media (max-width: 768px) {
      line-height: 22px;
    }
  }
}

.custom-dropdown-zone {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto 40px;
  color: var(--color-white);
  font-size: 14px;
  line-height: 17px;

  width: 100%;
  min-height: 92px;
  background: rgba(0, 0, 0, 0.34);
  border: 1px dashed #e400a4;
  box-shadow: 0 0 8px rgba(232, 17, 116, 0.44);
  border-radius: 5px;
  transition: all 0.3s;

  &.error {
    border: 1px dashed var(--color-red);
    box-shadow: 0 0 8px var(--color-red);
  }

  .dropzone-text {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    transform: translate(-50%, -50%);
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    transition: all 0.3s;
    border-radius: 5px;

    &.loading {
      z-index: 11;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(9.5px);
    }
  }

  .vue-dropzone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .img-w {
    height: 50px;
    width: auto;
    min-width: 50px;
    margin: 5px;
    position: relative;
    z-index: 10;

    .delete-img {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: var(--color-white);
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;

      img {
        max-width: 20px;
      }
    }

    .image {
      height: 100%;
      width: auto;
    }
  }

  .dz-message {
    color: transparent;
  }

  .dz-preview {
    display: none;
  }
}

.info {
  font-family: var(--font-regular);
  margin-bottom: 50px;

  div {
    display: flex;
    align-items: center;

    span {
      &:first-of-type {
        font-weight: 900;
        display: block;
        width: 250px;
      }
    }
  }
}

.desktop {
  @media (max-width: 768px) {
    display: none !important;
  }
}

.mobile {
  display: none !important;

  @media (max-width: 768px) {
    display: block !important;
  }
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  height: 0;
}

.fake-button-blue {
  background-color: white;
  width: 100%;
  cursor: pointer;
  transition: 0.5s all;
  height: 64px;
  color: black;
  border-radius: 20px;
  font-family: var(--font-regular);
  font-size: 16px;
  padding: 0 25px;
  font-weight: 900;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: none;
  }

  &:hover {
    opacity: 0.9;
  }
}
</style>
