import axios from "axios";
const discountedPrice = (price, discount) => {
  const dis = Number(price) * (Number(discount) / 100);
  return Math.round(Number(price) - dis);
};

const client = axios.create({
  baseURL: "",
});

export { discountedPrice, client };
