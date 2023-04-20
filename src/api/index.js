import instance from "./instance";
import userModule from "./user";
import authModule from "./auth";
import winnersModule from "./winners";

export default {
  user: userModule(instance),
  auth: authModule(instance),
  winners: winnersModule(instance),
};
