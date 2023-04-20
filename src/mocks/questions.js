import { CategoryEnum } from "@/helpers/enums";

export const quiz = [
  {
    id: 0,
    question:
      "На последние деньги ты отправишься в путешествие или купишь те самые кроссы из последней коллекции?",
    answers: [
      {
        text: "Oтправиться в путешествие",
        value: CategoryEnum.TRIP,
      },
      {
        text: "Kупить те самые кроссы из последней коллекции",
        value: CategoryEnum.LIFE,
      },
    ],
  },
  {
    id: 1,
    question:
      "Что ты предпочитаешь - по вечерам залипнуть в стрим или посмотреть обзоры новых гаджетов?",
    answers: [
      {
        text: "Залипнуть в стрим",
        value: CategoryEnum.GAME,
      },
      {
        text: "Посмотреть обзоры новых гаджетов",
        value: CategoryEnum.TECH,
      },
    ],
  },
  {
    id: 2,
    question:
      "Чем займешься в выходные: пойдешь тусить с друзьями или отправишься на 2 дня смотреть соседний город?",
    answers: [
      {
        text: "Пойду тусить с друзьями",
        value: CategoryEnum.LIFE,
      },
      {
        text: "Отправлюсь на 2 дня смотреть соседний город",
        value: CategoryEnum.TRIP,
      },
    ],
  },
  {
    id: 3,
    question:
      "Больше всего на свете ты хочешь стильный смартфон или игровую приставку?",
    answers: [
      {
        text: "Стильный смартфон",
        value: CategoryEnum.TECH,
      },
      {
        text: "Игровую приставку",
        value: CategoryEnum.GAME,
      },
    ],
  },
  {
    id: 4,
    question:
      "В магазине ты можешь выбрать только что-то одно: супер вместительный чемодан или супер удобное компьютерное кресло?",
    answers: [
      {
        text: "Супер вместительный чемодан",
        value: CategoryEnum.TRIP,
      },
      {
        text: "Супер удобное компьютерное кресло",
        value: CategoryEnum.GAME,
      },
    ],
  },
  {
    id: 5,
    question:
      "О чем ты точно никогда не забудешь, собираясь в спортзал: подобрать модный спортивный образ или зарядить фитнес браслет?",
    answers: [
      {
        text: "Подобрать модный спортивный образ",
        value: CategoryEnum.LIFE,
      },
      {
        text: "Зарядить фитнес браслет",
        value: CategoryEnum.TECH,
      },
    ],
  },
  {
    id: 6,
    question:
      "Утро начинается с просмотра ленты новостей или со стакана теплой воды?",
    answers: [
      {
        text: "С просмотра ленты новостей",
        value: CategoryEnum.TECH,
      },
      {
        text: "Со стакана теплой воды",
        value: CategoryEnum.LIFE,
      },
    ],
  },
  {
    id: 7,
    question:
      "Если и подписаться, то на рассылку с мониторингом дешевых авиабилетов или со скидками на любимые игровые сервисы?",
    answers: [
      {
        text: "Мониторингом дешевых авиабилетов",
        value: CategoryEnum.TRIP,
      },
      {
        text: "Со скидками на любимые игровые сервисы",
        value: CategoryEnum.GAME,
      },
    ],
  },
  {
    id: 8,
    question:
      "Что всегда можно найти в твоей сумке: зарядки от всех гаджетов или интересную книгу?",
    answers: [
      {
        text: "Зарядки от всех гаджетов",
        value: CategoryEnum.TECH,
      },
      {
        text: "Интересную книгу",
        value: CategoryEnum.LIFE,
      },
    ],
  },
  {
    id: 9,
    question:
      "Что круче – посетить все страны мира или открыть новые в виртуальных мирах?",
    answers: [
      {
        text: "Посетить все страны мира",
        value: CategoryEnum.TRIP,
      },
      {
        text: "Открыть новые в виртуальных мирах",
        value: CategoryEnum.GAME,
      },
    ],
  },
];
