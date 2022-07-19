// Exporting module

console.log('Exporting module');

// // //
// // //

const shippingCost = 10;

// // //
// // //

export const cart = [];
// named exports, 변수 앞에  export를 붙여주고 받는쪽에서 import 해야댐
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// 하나하나 변수명에 넣는걸 상상하면 개같지요? 이렇게 객체에 넣어서 여러개를 보낼 수도 있슴둥
export { totalPrice, totalQuantity as TQ }; // as로 이름 바꿔서 보냈지 모얌

// // //
// // //

// Default Exports는 변수말고 밸류 자체를 담아준다 그래서 받을때 아무이름이나 적어사 받아도 이게 임포트댐
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
