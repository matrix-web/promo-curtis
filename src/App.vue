<template>
  <div id="app">
    <router-view />
    <!-- Modals -->
    <Registration />
    <Alert />
    <Login />
    <Restore />
    <Share :category="isAuth ? user.category : undefined" />
    <Check />
    <Feedback />
    <ExchangePoints :total-points="isAuth ? user.points : 0" />
    <Delivery />
    <Success />
  </div>
</template>

<script>
import Registration from "@/components/modals/Registration";
import Alert from "@/components/modals/Alert";
import Login from "@/components/modals/Login";
import Restore from "@/components/modals/Restore";
import Check from "@/components/modals/Check";
import Feedback from "@/components/modals/Feedback";
import Share from "@/components/modals/Share.vue";
import ExchangePoints from "./components/modals/ExchangePoints.vue";
import Delivery from "@/components/modals/Delivery.vue";
import Success from "@/components/modals/Success";

import { mapActions, mapGetters, mapState } from "vuex";
import Cookies from "js-cookie";
import { meta } from "@/helpers/meta";

export default {
  name: "App",
  components: {
    Check,
    Restore,
    Login,
    Registration,
    Share,
    Alert,
    Feedback,
    ExchangePoints,
    Delivery,
    Success,
  },
  data: () => ({
    interval: null,
  }),
  created() {
    this.meta(meta(this.$route.query));

    if (Cookies.get("token") !== undefined) {
      this.getUser().catch((e) => {
        console.error(e.response);
        if (Cookies.get("token")) Cookies.remove("token");
      });
    }

    this.interval = setInterval(() => {
      gtag("event", "send", { event_category: "bounce_rate" }); // eslint-disable-line
    }, 15000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
    ...mapGetters("userModule", ["isAuth"]),
  },
  methods: {
    ...mapActions("userModule", ["meta", "getUser"]),
  },
};
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.sticky-footer-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>
