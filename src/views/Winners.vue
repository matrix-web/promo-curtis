<template>
  <div class="winners-page sticky-footer-wrapper">
    <Navigation />
    <WinnersContent />
    <Footer />
  </div>
</template>

<script>
import WinnersContent from "@/components/winners/WinnersContent.vue";
import Navigation from "@/components/common/Navigation.vue";
import Footer from "@/components/common/Footer.vue";
import { mapActions } from "vuex";

export default {
  name: "Winners",
  components: {
    Navigation,
    Footer,
    WinnersContent,
  },
  async created() {
    this.getPrizes();
  },
  methods: {
    ...mapActions("winnersModule", ["getPrizes"]),
  },
};
</script>

<style lang="scss" scoped>
.winners-page {
  position: relative;
  background-image: url("@/assets/img/backgrounds/blur-account.png"),
    url("@/assets/img/backgrounds/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 200px, center 80px;
}
</style>
