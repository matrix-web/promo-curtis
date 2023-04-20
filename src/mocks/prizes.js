import { CategoryEnum } from "@/helpers/enums";

export const prizes = [
  {
    id: 0,
    category: CategoryEnum.TECH,
    type: "технологии",
    icon: require("@/assets/img/svg/tech.svg"),
    prizes: [
      {
        img: require("@/assets/img/prizes/moretv.png"),
        webp: require("@/assets/img/prizes/moretv.webp"),
        name: "Подписка на more.tv",
      },
      {
        img: require("@/assets/img/prizes/airpods.png"),
        webp: require("@/assets/img/prizes/airpods.webp"),
        name: "Беспроводные наушники и сертификаты в М.Видео или Эльдорадо",
      },
      {
        img: require("@/assets/img/prizes/certificat.png"),
        webp: require("@/assets/img/prizes/certificat.webp"),
        name: "Денежный сертификат",
      },
    ],
  },
  {
    id: 1,
    category: CategoryEnum.LIFE,
    type: "лайфстайл",
    icon: require("@/assets/img/svg/life.svg"),
    prizes: [
      {
        img: require("@/assets/img/prizes/litres.png"),
        webp: require("@/assets/img/prizes/litres.webp"),
        name: "Сертификат Литрес",
      },
      {
        img: require("@/assets/img/prizes/alisa.png"),
        webp: require("@/assets/img/prizes/alisa.webp"),
        name: "Умная колонка и сертификаты в Леонардо",
      },
      {
        img: require("@/assets/img/prizes/certificat.png"),
        webp: require("@/assets/img/prizes/certificat.webp"),
        name: "Денежный сертификат",
      },
    ],
  },
  {
    id: 2,
    category: CategoryEnum.GAME,
    type: "гейминг",
    icon: require("@/assets/img/svg/game.svg"),
    prizes: [
      {
        img: require("@/assets/img/prizes/skillbox.png"),
        webp: require("@/assets/img/prizes/skillbox.webp"),
        name: "Промокод на курсы от Skillbox",
      },
      {
        img: require("@/assets/img/prizes/column.png"),
        webp: require("@/assets/img/prizes/column.webp"),
        name: "Портативная колонка и сертификаты в М.Видео или Эльдорадо",
      },
      {
        img: require("@/assets/img/prizes/certificat.png"),
        webp: require("@/assets/img/prizes/certificat.webp"),
        name: "Денежный сертификат",
      },
    ],
  },
  {
    id: 3,
    category: CategoryEnum.TRIP,
    type: "путешествия",
    icon: require("@/assets/img/svg/trip.svg"),
    prizes: [
      {
        img: require("@/assets/img/prizes/litres.png"),
        webp: require("@/assets/img/prizes/litres.webp"),
        name: "Книга из подборки от Литрес",
      },
      {
        img: require("@/assets/img/prizes/watch.png"),
        webp: require("@/assets/img/prizes/watch.webp"),
        name: "Смарт-часы и сертификаты Ozon Travel",
      },
      {
        img: require("@/assets/img/prizes/certificat.png"),
        webp: require("@/assets/img/prizes/certificat.webp"),
        name: "Денежный сертификат",
      },
    ],
  },
];
