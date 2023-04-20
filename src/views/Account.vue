<template>
  <div>
    <Navigation />
    <AccountContent @onExchangePoints="handleExchange" />
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/common/Navigation.vue";
import AccountContent from "@/components/account/AccountContent.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Account",
  components: {
    Navigation,
    Footer,
    AccountContent,
  },
  mounted() {},
  methods: {
    handleExchange() {
      this.$modal.show("login");
    },
  },
};
</script>

<style lang="scss" scoped></style>
