import Cookies from "js-cookie";

export const authMiddleware = async (to, from, next) => {
  const token = Cookies.get("token");
  if (to.meta.authRequired && !token) {
    return next("/");
  }

  return next();
};

export const testLimitMiddleware = async (to, from, next) => {
  const store = await import("@/store");
  const user = store.default.state.userModule?.user;
  if (to.meta.testLimit && user && user.tests >= 2) {
    return next("/final");
  }
  return next();
};

export const finalMiddleware = async (to, from, next) => {
  const store = await import("@/store");
  const user = store.default.state.userModule?.user;
  if (to.meta.final && user && user.tests === 0) {
    return next("/quiz");
  }
  return next();
};
