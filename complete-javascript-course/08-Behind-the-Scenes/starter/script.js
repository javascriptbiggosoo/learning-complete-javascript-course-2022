'use strict';
// console.log('# Scope');
// function calcAge(birthYear) {
//   const age = 2021 - birthYear;

//   function printAge() {
//     let output = `1. ${firstName} You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       // Creating NEW variable with same name as outer scope's variable
//       const firstName = `Yerim`;
//       // reassigning outer scope's variable
//       output = `3. NEW OUTPUT!`;

//       const str = `2. Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // console.log(str);
//     // add(2, 3); // strict 모드에서는 function declaration도 block scope를 따른다.
//     console.log(output);
//   }

//   printAge();

//   return age;
// }

// const firstName = 'Jinyoung';
// calcAge(1991);
// // console.log(age);
// // printAge();

// //
// //
// //
// //
// //

// // 95. Hoisting and TDZ in Practice
// // 95. Hoisting and TDZ in Practice
// // 95. Hoisting and TDZ in Practice

// // Variables

// // console.log(job);
// // console.log(year);

// let job = '-';
// const year = 1994;

// // Functions
// console.log(addDecl(2, 3));
// // console.log(addExpr(2, 3));
// // console.log(addArrow(2, 3));

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// // Example 왜 var는 에러를 부르는가
// console.log(numProducts); // 10이 아닌 undefined

// if (!numProducts) deleteSoppingCard(); // 일단 조건부터 말이 안되지만 우리 의도와 다르게 동작 가능함 = 헷갈리기 쉬움

// var numProducts = 10;
// function deleteSoppingCard() {
//   console.log('All products deleted!');
// }

// //
// //
// //
// //
// //

// // 96. The this Keyword
// // 96. The this Keyword
// // 96. The this Keyword

// console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}

// const calcAge = function (birthYear) {
//   console.log(2021 - birthYear);
//   console.log(this);
// };
// calcAge(1994);
// // 27
// // undefined
// // strict 모드가 아닐땐 undifined가 아니라 window object를 출력했을 것

// const calcAgeArrow = birthYear => {
//   console.log(2021 - birthYear);
//   console.log(this);
// };
// calcAgeArrow(1999);
// // 22
// // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// // 일반 함수는 자신만의 this 키워드가 생성되고 그걸 뱉는데 arrow는 부모 스코프의 this를 찾아 뱉는다.

// const jinyoung = {
//   year: 1994,
//   calcAge: function () {
//     console.log(this);
//     console.log(2021 - this.year);
//   },
// };
// jinyoung.calcAge();
// // {year: 1994, calcAge: ƒ}
// // 27
// // 조나스 오브젝트 안에 들어서 this가 조나스를 가르키는 것이 아니라 메소드를 호출한 곳이 조나스라서 this가 조나스를 가르키는 거라고 하는데 무슨 차이일것인가?

// const winter = {
//   year: 2001,
// };

// winter.calcAge = jinyoung.calcAge;
// winter.calcAge();
// // {year: 2001, calcAge: ƒ}
// // 20
// // 그 차이는 바로바로.. 별거없었다. 그냥.. 이런거였음 당연해보임 지금 보니깐

// const f = jinyoung.calcAge;
// // f();

// //
// //
// //
// //
// //

// console.log('#Arrow Function');

// const jinyoung = {
//   firstName: 'Jinyoung',
//   year: 1994,
//   calcAge: function () {
//     console.log(this);
//     console.log(2021 - this.year);

//     // method 안에 또 함수를 만들어서 쓰면 그 안의 this는 method의 this가 아니겠지요?? 이걸 어떻게 하지?
//     // 간혹 뉴비들은 이런 작동방식도 js의 지저분한 부분이라고 오해할 수 있는데 각 함수가 this keyword를 어떤 방식으로 만드는지 이해를 못하는 경우일 것입니다

//     // Solution 1
//     // const self = this; // 이 용도라면 self 나 that으로 쓰는게 컨벤션, 다른 이름 지정도 가능은함
//     // const isMillenial = function () {
//     //   console.log(self);
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     //   // console.log(this.year >= 1981 && this.year <= 1996);
//     // };

//     // Solution 2 (=ES6 방식)
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     }; // arrow function이 자체 this를 만들지 않고 부모것을 갖다쓰는거? 오히려 안좋다가 오히려 좋은 상황

//     isMillenial();
//   },

//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//     // 헐 왜 greet에서 this.firstName이 undefined??
//     // 애로우는 자신만의 this 키워드가 없대용 부모 스코프의 this를 갖다 쓰기만 함!
//     // 그러니까 애로우 펑션은 절대로 절대로 메소드로 쓰지 마십시오.(외우세여)

//     // 덧붙여서,
//     // object 덩어리가 코드블럭이라고 말한적은 없지만 어쨋든 중괄호가 있어서 너희들이 헷갈릴 수 있다는건 알 수 있어용 ㅎㅎ
//     // 근데 object 뒷부분 절대 코드블럭 아닙니다.
//     // 그냥 object에 할당하는 부분인것(다른 일반 variables처럼!!)
//     // 그니까 부모 스코프는 글로벌 스코프라궁
//   },
// };

// jinyoung.greet();
// jinyoung.calcAge();

// // argument keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// const addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8);

// //
// //
// //
// //
// //
// // Primitives vs. Objects(Primitive vs. Reference Types)
// // Primitives vs. Objects(Primitive vs. Reference Types)
// // Primitives vs. Objects(Primitive vs. Reference Types)

// let age = 28;
// let oldAge = age;
// age = 23;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jinyoung',
//   age: 28,
// };
// const friend = me;
// friend.age = 23;
// console.log('me: ', me);
// console.log('friend: ', friend);

// practice
const younha = {
  firstName: 'Younha',
  lastName: 'Go',
  age: 22,
};
const marriedYounha = younha;
marriedYounha.lastName = 'Kim';
console.log('Before marriage: ', younha); // "Kim"
console.log('After marriage: ', marriedYounha); // "Kim"
// 이건 복사가 아니고 서로 같은 곳을 참조하고 있을 뿐이다.

// marriedYounha = {}; // 아 이건 안되잔슴~~

// copying objects

const younha2 = {
  firstName: 'Younha',
  lastName: 'Go',
  age: 22,
  family: ['Kkamang', 'Bbua'],
};

const younhaCopy = Object.assign({}, younha2); // merge
younhaCopy.lastName = 'Kim';

younhaCopy.family.push('Younjin');

console.log('Before marriage: ', younha2);
console.log('After marriage: ', younhaCopy);
// lastName은 다르고 family는 같음 이게 얕은 복사
// first level만 복사됨

// shallow copy
// 얕은 복사란 객체를 복사할 때 위의 예제처럼 원래값과 복사된 값이 같은 참조를 가리키고있는 것을 말한다. 객체안에 객체가 있을 경우 한개의 객체라도 원본 객체를 참조하고 있다면 이를 얕은 복사라고 한다...... 라고 구글링해서 나옴 ㅋ
