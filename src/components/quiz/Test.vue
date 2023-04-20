<template>
  <ModalWrapper name="test" class-name="test__modal" @before-close="reset">
    <div class="test__wrapper">
      <div class="test__progress">
        <div class="test__progress-line" :style="`width: ${progress}%`"></div>
      </div>
      <p class="test__counter">
        Вопрос {{ currentQuestionId + 1 }} из {{ quiz.length }}
      </p>
      <Title
        class="test__title"
        font="optima"
        :weight="700"
        :level="5"
        color="white"
        :is-uppercase="true"
        >{{ currentQuestion.question }}</Title
      >
      <div class="test__radios">
        <Radio
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
          v-model="values[index]"
          :name="answer.value"
          @input="handleInput(answer)"
          >{{ answer.text }}</Radio
        >
      </div>
      <Button
        class="test__button"
        @click="handleClick"
        :is-disabled="!currentAnswer.value"
        >{{
          currentQuestionId + 1 === quiz.length
            ? "узнать результат"
            : "следующий вопрос"
        }}</Button
      >
    </div>
  </ModalWrapper>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Title from "@/packages/title/Title";
import Button from "@/packages/button/Button";
import ModalWrapper from "@/components/modals/ModalWrapper";
import Radio from "@/packages/radio/Radio";
import Vue from "vue";

export default {
  name: "Test",
  components: {
    Radio,
    Button,
    Title,
    ModalWrapper,
  },
  data: () => ({
    values: [],
    currentAnswer: {},
    isLoading: false,
  }),
  computed: {
    ...mapState("testModule", {
      quiz: (state) => state.quiz,
      answers: (state) => state.answers,
      currentQuestionId: (state) => state.currentQuestionId,
    }),
    ...mapGetters("testModule", {
      isTestFinished: "isTestFinished",
      progress: "progress",
      currentQuestion: "currentQuestion",
    }),
  },
  methods: {
    ...mapActions("testModule", [
      "initialState",
      "finishTest",
      "nextQuestion",
      "answer",
    ]),
    handleClick() {
      this.answer(this.currentAnswer);
      if (!this.isTestFinished) {
        this.nextQuestion();
        this.values = this.currentQuestion.answers.map(() => false);
      }
      this.currentAnswer = {};

      if (this.isTestFinished) {
        gtag('event', ' test_result', {'event_category' : 'click_button'}) // eslint-disable-line
        this.isLoading = true;
        this.finishTest()
          .then((res) => {
            console.log(res);

            if (res.data.id) {
              this.$modal.hide("test");
              this.reset();
              this.$router.push("/final");
            }
          })
          .catch((e) => {
            Vue.$toast.open({
              message: e.response.data.response.message,
              type: "error",
              duration: 6000,
            });
            console.error(e.response);
          })
          .finally(() => (this.isLoading = false));
      }
    },
    reset() {
      this.initialState();
      this.isLoading = false;
    },
    handleInput(value) {
      this.values = this.currentQuestion.answers.map(
        (item) => item.value === value.value
      );
      this.currentAnswer = value;
    },
  },
};
</script>

<style lang="scss">
.test {
  &__modal {
    @media (min-width: 1024px) {
      width: 640px;
    }
  }

  &__wrapper {
    padding: 30px 12px;
    position: relative;

    @media (min-width: 1024px) {
      padding: 80px 30px 30px;
    }
  }

  &__progress {
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-white);
  }

  &__progress-line {
    background-color: #e81174;
    width: 0;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s;
  }

  &__counter {
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    font-family: var(--font-optima);
    color: var(--color-orange);
    text-transform: uppercase;
    margin-bottom: 6px;

    @media (min-width: 1024px) {
      font-size: 18px;
      line-height: 18px;
      margin-bottom: 12px;
    }
  }

  &__title {
    margin-bottom: 26px;

    @media (min-width: 1024px) {
      margin-bottom: 40px;
    }
  }

  &__button {
    margin: 0 auto;
  }

  &__radios {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 40px;

    @media (min-width: 1024px) {
      margin-bottom: 65px;
    }
  }
}
</style>
