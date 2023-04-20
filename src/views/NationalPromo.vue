<template>
  <div>
    <Navigation @onOpenMenu="(val) => (isMenuOpen = val)" />
    <Promo
      :is-open-menu="isMenuOpen"
      :is-magnit="false"
      @onRegisterCheck="handleRegisterCheck"
      @onMainPage="handleMainPage"
    />
    <MechanicsAction :is-magnit="false" />
    <DefinitionCategoryPrize
      :slides="prizes"
      :is-raised-big="false"
      :is-raised-small="true"
      color="purple"
    />
    <InformationPoints
      :slides="prizes"
      :is-raised-big="false"
      :is-raised-small="true"
      color="purple"
    />
    <div id="FAQ">
      <FAQ />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/common/Navigation.vue";
import Promo from "@/components/promo/Promo.vue";
import MechanicsAction from "@/components/promo/MechanicsAction.vue";
import DefinitionCategoryPrize from "@/components/promo/DefinitionCategoryPrize.vue";
import InformationPoints from "@/components/promo/informationPoints.vue";
import FAQ from "@/components/promo/FAQ.vue";
import Footer from "@/components/common/Footer.vue";

import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "NationalPromo",
  components: {
    Navigation,
    Promo,
    MechanicsAction,
    DefinitionCategoryPrize,
    InformationPoints,
    FAQ,
    Footer,
  },
  data() {
    return {
      guaranteePrize: {
        id: 23,
        img: {
          img: require("@/assets/img/cards/magnit-card.png"),
          webp: require("@/assets/img/cards/magnit-card.webp"),
        },
        title: "Гарантированный приз",
        text: "бонусы на карту Магнит",
      },
      mainPrize: {
        id: 25,
        img: {
          img: require("@/assets/img/prizes/certificat.png"),
          webp: require("@/assets/img/prizes/certificat.webp"),
        },
        title: "Главный приз",
        text: "Сертификат на 150 000 рублей",
      },
      slides: [
        {
          id: 1,
          img: {
            img: require("@/assets/img/merch/merch-1.png"),
            webp: require("@/assets/img/merch/merch-1.webp"),
          },
        },
        {
          id: 2,
          img: {
            img: require("@/assets/img/merch/merch-2.png"),
            webp: require("@/assets/img/merch/merch-2.webp"),
          },
        },
        {
          id: 3,
          img: {
            img: require("@/assets/img/merch/merch-3.png"),
            webp: require("@/assets/img/merch/merch-3.webp"),
          },
        },
      ],
      prizes: [
        {
          id: 1,
          img: {
            img: require("@/assets/img/prizes/smart-column.png"),
            webp: require("@/assets/img/prizes/smart-column.webp"),
          },
          title: "Умная колонка",
        },
        {
          id: 2,
          img: {
            img: require("@/assets/img/prizes/column.png"),
            webp: require("@/assets/img/prizes/column.webp"),
          },
          title: "Портативная колонка",
        },
        {
          id: 3,
          img: {
            img: require("@/assets/img/prizes/airpods.png"),
            webp: require("@/assets/img/prizes/airpods.webp"),
          },
          title: "Беспроводные наушники",
        },
        {
          id: 4,
          img: {
            img: require("@/assets/img/prizes/certificat.png"),
            webp: require("@/assets/img/prizes/certificat.webp"),
          },
          title: "Денежный сертификат",
        },
        {
          id: 5,
          img: {
            img: require("@/assets/img/prizes/skillbox.png"),
            webp: require("@/assets/img/prizes/skillbox.webp"),
          },
          title: "Промокод на курсы от Skillbox",
        },
        {
          id: 6,
          img: {
            img: require("@/assets/img/prizes/litres.png"),
            webp: require("@/assets/img/prizes/litres.webp"),
          },
          title: "Книга из подборки от Литрес",
        },
        {
          id: 7,
          img: {
            img: require("@/assets/img/prizes/moretv.png"),
            webp: require("@/assets/img/prizes/moretv.webp"),
          },
          title: "Подписка на more.tv",
        },
        {
          id: 8,
          img: {
            img: require("@/assets/img/prizes/watch.png"),
            webp: require("@/assets/img/prizes/watch.webp"),
          },
          title: "Смарт-часы",
        },
      ],
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
    ...mapGetters("userModule", ["isAuth", "isNotQuiz"]),
  },
  methods: {
    ...mapActions("userModule", ["getUser"]),
    handleMainPage() {
      gtag("event", "wow_prize", { event_category: "click_button" }); // eslint-disable-line
      this.$router.push("/magnit-promo");
    },
    handleRegisterCheck() {
      if (!this.isAuth) {
        this.$modal.show("alert");
      } else {
        if (this.isNotQuiz) {
          this.$toast.open({
            position: "top",
            message: "Для регистрации чека необходимо пройти тест",
            type: "info",
            duration: 6000,
          });
        } else {
          this.$modal.show("check");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
