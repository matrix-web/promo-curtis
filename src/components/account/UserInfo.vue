<template>
  <div class="user-info">
    <p class="user-info__title">{{ user.surname }} {{ user.name }}</p>
    <p class="user-info__subtitle">г. {{ user.city }}</p>
    <ul class="user-info__contact-list">
      <li class="user-info__contact-list-item">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4346 14.678L16.6436 11.8869C15.6468 10.8901 13.9522 11.2889 13.5535 12.5847C13.2544 13.4818 12.2576 13.9802 11.3605 13.7808C9.36689 13.2824 6.67552 10.6907 6.17711 8.59745C5.87807 7.70029 6.47615 6.70348 7.37328 6.40448C8.66913 6.00575 9.06785 4.31119 8.07104 3.31438L5.27999 0.523323C4.48254 -0.174441 3.28638 -0.174441 2.58861 0.523323L0.694681 2.41725C-1.19925 4.41087 0.894042 9.69394 5.57903 14.3789C10.264 19.0639 15.5471 21.2569 17.5407 19.2633L19.4346 17.3693C20.1324 16.5719 20.1324 15.3757 19.4346 14.678Z"
            fill="white"
          />
        </svg>
        {{
          user.phone
            .replace(/\D+/g, "")
            .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3 $4 $5")
        }}
      </li>
      <li class="user-info__contact-list-item">
        <svg
          width="27"
          height="18"
          viewBox="0 0 27 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.3555 9.13416L26.182 14.7142V3.31853L17.3555 9.13416Z"
            fill="white"
          />
          <path
            d="M0 3.31853V14.7142L8.82654 9.13416L0 3.31853Z"
            fill="white"
          />
          <path
            d="M24.5452 0H1.6361C0.819555 0 0.171555 0.608727 0.0488281 1.39255L13.0906 9.98509L26.1325 1.39255C26.0097 0.608727 25.3617 0 24.5452 0Z"
            fill="white"
          />
          <path
            d="M15.8567 10.1226L13.5413 11.6477C13.4038 11.7377 13.2484 11.7818 13.0913 11.7818C12.9342 11.7818 12.7787 11.7377 12.6413 11.6477L10.3258 10.1209L0.0527344 16.6189C0.178734 17.3962 0.823462 18 1.63673 18H24.5458C25.3591 18 26.0038 17.3962 26.1298 16.6189L15.8567 10.1226Z"
            fill="white"
          />
        </svg>
        {{ user.email }}
      </li>
    </ul>
    <div class="user-info__card">
      <CardForm variant="tertiary" v-model="cardNumber" />
    </div>
    <div class="user-info__points">
      <p class="user-info__points-title">Вы накопили</p>
      <span class="user-info__badge">
        <span class="user-info__badge-count">{{ user.points }}</span>
        баллов
      </span>
    </div>
    <div class="user-info__actions">
      <Button
        :disabled="!isAuth || user.referral_code === null"
        @click="$emit('onInvite')"
        variant="orange"
        isOutline
        size="small"
        >Пригласить друга</Button
      >
      <Button
        @click="$emit('onExchangePoints')"
        variant="orange"
        isOutline
        size="small"
        :disabled="!isAuth || !isChoosePrize || user.points < 100"
        >Обменять баллы</Button
      >
    </div>
  </div>
</template>

<script>
import Button from "@/packages/newButton/Button.vue";
import CardForm from "./CardForm.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "UserInfo",
  components: {
    Button,
    CardForm,
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        name: "Иванов Иван",
        city: "Москва",
        email: "Ivanovivan@mail.ru",
        phone: "+7 (988) 475-85-84",
        points: 500,
      }),
    },
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
      isChoosePrize: (state) => state.isChoosePrize,
    }),
    ...mapGetters("userModule", ["isAuth"]),
  },
  data() {
    return {
      cardNumber: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  padding: 32px 0;
  background: rgba(228, 0, 164, 0.2);
  border: 1px solid rgba(228, 0, 164, 0.4);
  box-shadow: 0 4px 22px rgba(228, 0, 164, 0.25);
  backdrop-filter: blur(7px);
  border-radius: 5px;

  @media (min-width: 1024px) {
    padding: 32px 40px;
  }
}
.user-info__title {
  margin-bottom: 17px;
  font-family: var(--font-optima);
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-white);
}
.user-info__subtitle {
  margin-bottom: 32px;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  text-align: center;
  color: var(--color-white);
}

.user-info__card {
  margin: 24px 0 22px;

  @media (min-width: 1240px) {
    display: none;
  }
}

.user-info__contact-list {
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: var(--color-white);
}
.user-info__contact-list-item {
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  svg {
    margin-right: 5px;
  }
}
.user-info__points {
  margin: 0 0 31px;

  @media (min-width: 1024px) {
    margin: 32px 0 24px;
  }

  &-title {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: var(--color-white);
    margin-bottom: 6px;
  }
}
.user-info__badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  background: var(--color-orange);
  border-radius: 90px;
  font-style: normal;
  font-family: var(--font-walsheim);
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: var(--color-black);

  &-count {
    font-weight: 700;
    font-size: 21px;
    line-height: 27px;
    margin-right: 6px;
  }
}
.user-info__points {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-info__actions {
  display: flex;

  .button {
    &:not(:last-of-type) {
      margin-right: 8px;
    }

    @media (min-width: 1024px) {
      &:not(:last-of-type) {
        margin-bottom: 10px;
        margin-right: 0;
      }
    }
  }

  @media (min-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
