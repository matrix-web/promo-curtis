export default function (instance) {
  return {
    getUserInfo() {
      return instance.get("/user");
    },
    share() {
      return instance.get("/user/share");
    },
    meta(payload) {
      return instance.post("/meta", payload);
    },
    feedback(payload) {
      return instance.post("/feedback/send", payload);
    },
    sendTest(payload) {
      return instance.post("/user/test", payload);
    },
    receipts() {
      return instance.get("/user/receipts");
    },
    transactions() {
      return instance.get("/user/transactions");
    },
    update(payload) {
      return instance.put("/user/update", payload);
    },
    receipt(payload) {
      return instance.post("/user/receipt", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    prizes() {
      return instance.get("/user/points_prizes");
    },
    choosePrize(payload) {
      return instance.post(`/user/points_prizes/${payload}`);
    },
    delivery(payload) {
      return instance.post("/user/delivery", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    drops(payload) {
      return instance.post("/drops", payload);
    },
  };
}
