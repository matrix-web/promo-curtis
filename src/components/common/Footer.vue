<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content-wrapper">
        <div class="footer-wrapper">
          <a href="./policy.pdf" class="footer__link">Политика конфиденциальности</a>
          <a href="./rules.pdf" target="_blank" class="footer__link">Правила акции</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 24px 0;
  position: relative;
  z-index: 1;

  &-content-wrapper {
    display: flex;
    align-items: center;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }

  &__link {
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    text-decoration: underline;
    color: var(--color-white);


    &:not(:last-child) {
      margin-bottom: 16px;
    }

    @media (min-width: 1024px) {
      text-align: center;
      margin-bottom: 0;

      &:not(:last-child) {
        margin-right: 100px;
      }
    }

    &:hover {
      text-decoration: none;
    }
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
