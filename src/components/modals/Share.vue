<template>
  <ModalWrapper name="share" class-name="share__modal">
    <div class="share__wrapper">
      <Title
        class="share__title"
        font="optima"
        :weight="700"
        :level="4"
        color="white"
        :is-uppercase="true"
        >Поздравляем!<br />
        Вы ответили на все вопросы. поделитесь результатом с друзьями:</Title
      >
      <div class="share__buttons">
        <div>
          <svg
            width="120"
            height="25"
            viewBox="0 0 120 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.68706 2.68706C0 4.37413 0 7.08942 0 12.52V13.48C0 18.9106 0 21.6259 1.68706 23.3129C3.37413 25 6.08942 25 11.52 25H12.48C17.9106 25 20.6259 25 22.3129 23.3129C24 21.6259 24 18.9106 24 13.48V12.52C24 7.08942 24 4.37413 22.3129 2.68706C20.6259 1 17.9106 1 12.48 1H11.52C6.08942 1 3.37413 1 1.68706 2.68706ZM4.05004 8.30005C4.18004 14.54 7.30001 18.29 12.77 18.29H13.0801V14.72C15.0901 14.92 16.61 16.39 17.22 18.29H20.06C19.28 15.45 17.2299 13.88 15.9499 13.28C17.2299 12.54 19.0299 10.74 19.4599 8.30005H16.8799C16.3199 10.28 14.6601 12.08 13.0801 12.25V8.30005H10.5V15.22C8.89999 14.82 6.88003 12.88 6.79003 8.30005H4.05004Z"
              fill="white"
            />
            <path
              d="M38.0271 13.14C38.8371 12.762 39.3591 12.132 39.3591 11.16C39.3591 9.684 38.0091 8.64 36.0651 8.64H31.5831V18H36.2631C38.2791 18 39.6831 16.902 39.6831 15.408C39.6831 14.274 38.9451 13.428 38.0271 13.14ZM36.0651 10.35C36.7851 10.35 37.2891 10.782 37.2891 11.376C37.2891 11.97 36.7851 12.384 36.0651 12.384H33.6531V10.35H36.0651ZM33.6531 16.29V14.004H36.2631C37.0731 14.004 37.6131 14.472 37.6131 15.156C37.6131 15.84 37.0731 16.29 36.2631 16.29H33.6531ZM50.0995 18L45.7975 13.14L49.7395 8.64H47.2735L44.1415 12.276H43.6375V8.64H41.5675V18H43.6375V14.274H44.1415L47.3815 18H50.0995ZM55.383 18.18C58.317 18.18 60.387 16.164 60.387 13.32C60.387 10.476 58.317 8.46 55.383 8.46C52.449 8.46 50.379 10.476 50.379 13.32C50.379 16.164 52.449 18.18 55.383 18.18ZM55.383 16.29C53.691 16.29 52.539 15.084 52.539 13.32C52.539 11.556 53.691 10.35 55.383 10.35C57.075 10.35 58.227 11.556 58.227 13.32C58.227 15.084 57.075 16.29 55.383 16.29ZM68.4506 12.33H64.2566V8.64H62.1866V18H64.2566V14.22H68.4506V18H70.5206V8.64H68.4506V12.33ZM77.2665 18V10.53H80.5065V8.64H71.9565V10.53H75.1965V18H77.2665ZM85.4089 8.46C83.5909 8.46 81.9889 9.396 81.5209 11.016L83.4289 11.34C83.7169 10.764 84.3649 10.224 85.3009 10.224C86.4349 10.224 87.1009 11.034 87.1909 12.258H85.1749C82.4209 12.258 81.0529 13.464 81.0529 15.192C81.0529 16.938 82.4029 18.18 84.3109 18.18C85.8409 18.18 86.8669 17.298 87.3169 16.524L87.7489 18H89.2789V12.744C89.2789 10.026 87.8029 8.46 85.4089 8.46ZM84.7969 16.434C83.7889 16.434 83.1409 15.912 83.1409 15.102C83.1409 14.382 83.6629 13.878 85.2469 13.878H87.2089C87.2089 15.408 86.2369 16.434 84.7969 16.434ZM100.056 18L95.7545 13.14L99.6965 8.64H97.2305L94.0985 12.276H93.5945V8.64H91.5245V18H93.5945V14.274H94.0985L97.3385 18H100.056ZM105.638 18V10.53H108.878V8.64H100.328V10.53H103.568V18H105.638ZM119.144 13.212C119.144 10.512 117.128 8.46 114.284 8.46C111.44 8.46 109.424 10.494 109.424 13.32C109.424 16.146 111.44 18.18 114.284 18.18C116.228 18.18 118.064 17.262 118.766 15.48L116.822 15.156C116.372 15.822 115.508 16.29 114.41 16.29C112.826 16.29 111.782 15.318 111.584 13.878H119.108C119.126 13.68 119.144 13.464 119.144 13.212ZM114.284 10.26C115.58 10.26 116.552 11.088 116.894 12.258H111.71C112.052 11.052 113.024 10.26 114.284 10.26Z"
              fill="white"
            />
          </svg>
        </div>
        <a target="_blank" :href="shareUrl">
          <Button @click="handleShare" :is-disabled="!category || isShared"
            >поделиться</Button
          >
        </a>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import Title from "@/packages/title/Title";
import Button from "@/packages/button/Button";
import ModalWrapper from "@/components/modals/ModalWrapper";
import api from "@/api";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Share",
  props: {
    category: {
      type: String,
    },
  },
  components: {
    Button,
    Title,
    ModalWrapper,
  },
  computed: {
    ...mapGetters("userModule", ["isShared"]),
    shareUrl() {
      const baseUrl = "https://vk.com/share.php?";
      const url = "https://yourdesire.curtistea.com";
      const title =
        "%D0%9E%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B8%20%D1%81%D0%B2%D0%BE%D0%B8%20%D0%B6%D0%B5%D0%BB%D0%B0%D0%BD%D0%B8%D1%8F%20%D1%81%20%D1%87%D0%B0%D0%B5%D0%BC%20Curtis";
      const imageBaseUrl = `https://storage.yandexcloud.net/curtis-yourdesire/VK/${this.category}.png`;

      return `${baseUrl}url=${url}&title=${title}&image=${imageBaseUrl}`;
    },
  },
  methods: {
    ...mapActions("userModule", ["getUser"]),
    async handleShare() {
      gtag("event", "vk_sher", { event_category: "click_button_sher" }); // eslint-disable-line
      await api.user.share().catch((e) => console.log(e));
      await this.getUser();
      this.$modal.hide("share");

      this.$emit("share");
    },
  },
};
</script>

<style lang="scss">
.share {
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
</style>
