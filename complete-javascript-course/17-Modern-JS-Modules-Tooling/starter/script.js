// // Exporting and Importing in ES6 Modules
// // Exporting and Importing in ES6 Modules
// // Exporting and Importing in ES6 Modules

// // shoppingCart.js도 보세요

// // Importing module

// console.log('Importing module');

// // // //
// // // //

// // console.log(shippingCost); // shippingCost is not defined
// //모듈 자체는 탑 레벨 코드인데 그 안의 변수들은 private임.
// //임포트되는 모듈 자체가 top level scope처럼 기능하고 그 모듈 안의 top level variables은 private임 그래서 이거 안댐

// // // //
// // // //

// // 변수를 갖다쓰고싶으면 export 해야지
// // export는 두 종류가 있어요
// // 1.1 네임드 엑스포츠(엑스포트한쪽의 변수명을 입력하고 {}를 씌워줌. 주의, 하나만 가져와도 괄호 필요)
// // 1.1 네임드 엑스포츠(엑스포트한쪽의 변수명을 입력하고 {}를 씌워줌. 주의, 하나만 가져와도 괄호 필요)
// import {
//   addToCart,
//   totalPrice as price, // as로 이름 바꿔버렸지 모얌
//   TQ,
//   cart,
// } from './shoppingCart.js';
// // vscode는 확장자명 안써주는데 직접 써주자
// // + 지난시간에 배운 것처럼 HTML파일에서 모듈을 연결하려면 type="module" attribute를 명시해줘야한다

// console.log(price, TQ); // 바뀐이름으로 출력했지모얌

// addToCart('bread', 5);
// addToCart('apple', 4);
// addToCart('pizza', 5);

// console.log(cart); // 빈 어레이 상태에서 엑스포트했는데 출력해보니 그 안에 뭔가 들어있다
// // 전에 말했지만 js의 모듈은 실시간 동기다. 단순 사본을 받는 것이 아니라 live connection!!

// // 1.2 네임드 엑스포츠(전부 가져오기)
// // 1.2 네임드 엑스포츠(전부 가져오기)
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5); // 모듈을 하나의 object로 만들어 쓰고있다
// console.log(ShoppingCart.totalPrice);

// //이렇게 한 변수 가져오기, 여러변수 가져오기, 한 번에 다 가져오기를 배워봤슴덩

// // 2. 디폴트 엑스포츠(모듈 당 하나의 value만 export할 경우 사용)
// // 2. 디폴트 엑스포츠(모듈 당 하나의 value만 export할 경우 사용)

// import add from './shoppingCart.js'; // 디폴트로 받으면 {} 안쓴다
// add('pizza', 2);
// add('aespa photo card', 4);

// Introduction to NPM
// Introduction to NPM
// Introduction to NPM

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// const state = {
//   cart: [
//     { product: 'bread', quantity: 5 },
//     { product: 'bread', quantity: 5 },
//   ],
//   user: { loggedIn: true },
// };

// // shallow copy
// // Object.assign()은 인자를 서로 merge한 후 반환(하고 넣어준 인자들 또한 merge된 형태로 바꿔버리는데 괴동작?을 하는데 이건 당장은 의미없는 이야기)
// const stateClone = Object.assign({}, state);
// // deep copy
// const stateDeepClone = cloneDeep(state);

// state.user.loggedIn = false;

// console.log(stateClone); // 얘는 false
// console.log(stateDeepClone); // 얘는 true

// Bundling With Parcel and NPM Scripts
// Bundling With Parcel and NPM Scripts
// Bundling With Parcel and NPM Scripts

// 스크립트, 쇼핑카트, 클론딥 세가지 모듈을 하나로 합칠거다(번들링할거다).
console.log('Importing module');

import { addToCart, totalPrice as price, TQ, cart } from './shoppingCart.js';

console.log(price, TQ);
addToCart('bread', 5);
addToCart('apple', 4);
addToCart('pizza', 5);

console.log(cart);
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

import add from './shoppingCart.js';
add('pizza', 2);
add('aespa photo card', 4);

// 다 노드 모듈러에 갈건데 일일이 경로 저렇게 하는거 귀찮지요? 걍 앞부분 날려먹어도 댐

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'bread', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

console.log(cart.find(item => item.product === 'bread'));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polyfilling async functions
import 'regenerator-runtime/runtime';
