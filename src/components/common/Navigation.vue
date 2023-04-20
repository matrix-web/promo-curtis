<template>
  <nav class="nav">
    <div class="nav__container">
      <div class="nav-wrapper">
        <div class="nav__logo">
          <Logo variant="secondary" />
        </div>
        <ul class="nav__list">
          <li v-for="link in links" :key="link.key" class="nav__item">
            <a
              class="nav__link"
              target="_blank"
              :href="link.path"
              v-if="link.pathName === 'rules' || link.pathName === 'about'"
              >{{ link.title }}</a
            >
            <router-link
              v-else
              class="nav__link"
              :to="link.path"
              exact
              active-class="m-active"
              >{{ link.title }}</router-link
            >
          </li>
          <li class="nav__item">
            <button @click="handleFeedback" class="nav__link">
              Обратная связь
            </button>
          </li>
        </ul>
        <div class="nav__action-wrapper">
          <Button
            @click="handleLogin"
            class="nav__enter-button"
            :variant="isAuth ? 'orange' : 'white'"
            size="middle"
            isOutline
            >{{ isAuth ? "Личный кабинет" : "Войти" }}</Button
          >
          <Button
            v-if="isAuth"
            @click="logout"
            class="nav__enter-button"
            variant="orange"
            size="middle"
            isOutline
            >Выйти</Button
          >
          <button class="nav__user-button" aria-label="account" @click="handleLogin">
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0C6.243 0 4 2.36105 4 5.26316C4 8.16526 6.243 10.5263 9 10.5263C11.757 10.5263 14 8.16526 14 5.26316C14 2.36105 11.757 0 9 0ZM9 8.42105C7.346 8.42105 6 7.00421 6 5.26316C6 3.52211 7.346 2.10526 9 2.10526C10.654 2.10526 12 3.52211 12 5.26316C12 7.00421 10.654 8.42105 9 8.42105ZM18 20V18.9474C18 14.8853 14.859 11.5789 11 11.5789H7C3.14 11.5789 0 14.8853 0 18.9474V20H2V18.9474C2 16.0453 4.243 13.6842 7 13.6842H11C13.757 13.6842 16 16.0453 16 18.9474V20H18Z"
                fill="white"
              />
            </svg>
          </button>
          <button aria-label="menu"
            :class="['burger', { open: isMenuOpen }]"
            @click="handleOpen"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
    <Transition name="fade">
      <div class="mobile-nav" v-show="isMenuOpen">
        <ul class="mobile-nav__list">
          <li v-for="link in links" :key="link.key" class="mobile-nav__item">
            <a
              class="nav__link"
              target="_blank"
              :href="link.path"
              v-if="link.pathName === 'rules' || link.pathName === 'about'"
              >{{ link.title }}</a
            >
            <router-link
              v-else
              class="nav__link"
              :to="link.path"
              exact
              active-class="m-active"
              >{{ link.title }}</router-link
            >
          </li>
          <li class="mobile-nav__item">
            <button @click="handleFeedback" class="nav__link">
              Обратная связь
            </button>
          </li>
          <li class="mobile-nav__item" v-if="isAuth">
            <button @click="logout" class="nav__link">
              Выйти
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Logo from "@/packages/logo/Logo";
import Button from "@/packages/newButton/Button.vue";

export default {
  name: "Navigation",
  components: {
    Button,
    Logo,
  },
  data() {
    return {
      links: [
        {
          id: 1,
          title: "Главная",
          path: "/",
          pathName: "home",
        },
        {
          id: 2,
          title: "О Curtis",
          path: "https://curtistea.com/",
          pathName: "about",
        },
        {
          id: 3,
          title: "Правила",
          path: "/rules.pdf",
          pathName: "rules",
        },
        {
          id: 4,
          title: "Победители",
          path: "/winners",
          pathName: "winners",
        },
      ],
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState("userModule", {
      user: (state) => state.user,
    }),
    ...mapGetters("userModule", ["isAuth"]),
  },
  methods: {
    ...mapActions("userModule", ["logout"]),
    handleLogin() {
      if (this.isAuth) this.$router.push("/account");
      else this.$modal.show("login");
    },
    handleOpen() {
      this.isMenuOpen = !this.isMenuOpen
      this.$emit("onOpenMenu", this.isMenuOpen);
    },
    handleFeedback() {
      this.isMenuOpen = false;
      this.$modal.show("feedback");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  // padding: 5px 0 7px;
  padding: 15px 0;
  z-index: 1;

  @media (min-width: 1024px) {
    padding: 15px 20px 19px 20px;
  }

  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1150px) {
      justify-content: flex-end;
    }
  }

  &__container {
    max-width: 1235px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__logo {
    color: var(--color-white);

    @media (min-width: 1150px) {
      display: none;
    }
  }

  &__list {
    display: none;

    @media (min-width: 1150px) {
      display: flex;
      //margin-right: 120px;
      margin-right: auto;
      margin-left: auto;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-right: 20px;;
    }

    @media (min-width: 1440px) {
      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }

  &__user-button {
    @media (min-width: 1150px) {
      display: none;
    }
  }

  &__link {
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    text-align: center;
    font-family: var(--font-regular);
    color: var(--color-white);
    transition: 0.3s ease;

    &.m-active {
      color: var(--color-orange-100);

      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--color-orange-100);
      opacity: 0;
      transition: 0.3s ease;
    }

    &:hover {
      color: var(--color-orange-100);

      &::after {
        opacity: 1;
      }
    }
  }

  &__action-wrapper {
    display: flex;
    align-items: center;

    button:not(:last-of-type) {
      margin-right: 32px;
    }
  }
  &__enter-button {
    display: none;

    @media (min-width: 1150px) {
      display: block;
      text-transform: none;
      font-weight: 400;
    }
  }
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mobile-nav {
  position: absolute;
  left: 0;
  top: 62px;
  right: 0;
  z-index: 100;
  padding: 30px 20px 40px;
  background-color: var(--color-black);

  &__wrapper {
    overflow: hidden;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.burger {
  width: 30px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  @media (min-width: 1150px) {
    display: none;
  }

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: var(--color-white);
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: 0;
  }
  span:nth-child(2),
  span:nth-child(3) {
    top: 7px;
  }

  span:nth-child(4) {
    top: 15px;
  }

  &.open {
    span:nth-child(1) {
      top: 7px;
      width: 0;
      left: 50%;
    }
    span:nth-child(2) {
      transform: rotate(45deg);
    }

    span:nth-child(3) {
      transform: rotate(-45deg);
    }

    span:nth-child(4) {
      top: 7px;
      width: 0;
      left: 50%;
    }
  }
}
</style>
