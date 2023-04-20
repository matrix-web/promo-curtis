export default function (instance) {
  return {
    winners(params) {
      return instance.get("/winners", {
        params,
      });
    },
    prizes() {
      return instance.get("/prizes");
    },
  };
}
