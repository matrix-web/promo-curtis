export default function (instance) {
  return {
    login(payload) {
      //PAYLOAD TYPE
      // {
      //   "phone": string "+0 (000) 00-00-00"
      //   "password": number 000000
      // }
      return instance.post("/auth/login", payload);
    },
    register(payload) {
      //PAYLOAD TYPE
      // {
      //   "name": string,
      //   "surname": string,
      //   "bdate": string "YYYY-MM-DD",
      //   "city": string,
      //   "email": string,
      //   "phone": string "+0 (000) 00-00-00"
      // }
      return instance.post("/auth/register", payload);
    },
    forgot(payload) {
      //PAYLOAD TYPE
      // {
      //   "phone": string "+0 (000) 00-00-00"
      // }
      return instance.post("/forgot", payload);
    },
  };
}
