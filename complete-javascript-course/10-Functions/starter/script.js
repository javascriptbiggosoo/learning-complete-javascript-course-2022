'use strict';

// //127. Default Parameters
// //127. Default Parameters
// //127. Default Parameters

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 1000); // 파라미터 스킵하는법

// // 128. How Passing Arguments Works: Value vs. Reference
// // 128. How Passing Arguments Works: Value vs. Reference
// // 128. How Passing Arguments Works: Value vs. Reference

// // 비하인드더씬 primitive, reference의 리뷰인데 함수부분에서 다시 상기할 필요가 있다

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999'; // 실제 코딩을 할때 파라미터로 받아온걸 함수안에서 바로 바꾸는 일은.... 있을 수 없다. 의미가 없으니깐. 학습용으로 보여주는거다.
//   passenger.name = `Mr. ` + passenger.name;
//   if (passenger.passport === 24739479284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);

// // 얘는 그대론데(real value)
// console.log(flight); // LH234
// // 변했따?!(reference)
// console.log(jonas); // {name: 'Mr. Jonas Schmedtmann', passport: 2473549124890}

// // primitive가 argument로서 넘어가면 기본적으로 copy가 넘어간 것이다.
// const flightNum = flight; // 이 두가지가 서로 다른 것처럼, ㅇㅋ?

// // object가 넘어가는건 이런거다
// const passenger = jonas; // 전에 봤지만 이건 같은 memory heap을 참조하고 있을 뿐이다. copy가 아니다(비하인드더씬 마지막강의)

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };
// newPassport(jonas);
// checkIn(flight, jonas); // 저 위에 실행한거랑 결과가 다르다, jonas가 바뀐 것.

// // 결론
// // js에서는 레퍼런스를 함수에 갖다박지 않는다 밸류만을 갖다박는다.
// // 뭐.. 레퍼런스 그 자체도 여전히 밸류이긴하다. 메모리 주소를 담고있는 밸류인거지
// // 레퍼런스를 레퍼런스로서 함수에 박는게 아니라 그 메모리 주소인 밸류를 보낸다 그소리다.
// // 이걸 강의 초입에 설명해야 이번 챕터가 어렵지 않을거라고하네요

// 130. Functions Accepting Callback Functions
// // 130. Functions Accepting Callback Functions
// // 130. Functions Accepting Callback Functions

// const oneWord = function (str) {
//   return str.replaceAll(' ', '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`); // function도 method 갖고있댔지요? property도 갖고 있다능; https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function
// };

// //  JS uses callbacks all the time
// transformer('JavaScript is the best!', upperFirstWord); // upperFirstWord는 콜백함수!
// transformer('JavaScript is the best!', oneWord); // oneWord는 콜백함수!
// // 코더가 직접 `oneWord()` 이런식으로 호출시킨 코드가 없는데, JS가 실행되는 과정에서 실행되버리는(?) 애들을 콜백함수라고 부른답니다.
// // 우리가 호출한게 아니고 transformer가 호출한거임! 암튼 그럼!

// const high5 = function () {
//   console.log('🖐');
// };
// document.body.addEventListener('click', high5); // 얘도 콜백이지

// //콜백함수를 쓸 수 있다는건 코드를 쪼개서 쓸 수 있게 되면서 재사용성이 증가되는 이점이 있다
// // 더 좋은 이점은 추상화가 용이해진다는것
// // 트랜스포머 호출한걸 보면 그 한줄만 봐도 대충 뭘하는 앤지 이해하기 쉽겠지요?
// // 이 추상화에 대해선 객체지향 섹션에서 또 배웁시다

// // 131. Functions Returning Functions
// // 131. Functions Returning Functions
// // 131. Functions Returning Functions

// // 다시, 함수는, value다.

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };
// // 1
// const greeterHey = greet('Hey');
// greeterHey('Jinyoung');
// greeterHey('Minwoo');
// // 2
// greet('Hello')('Nico');
// // 3
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);
// greetArr('Hi')('Nico');

// // 132. The call and apply Methods
// // 133. The bind Method
// // 132. The call and apply Methods
// // 133. The bind Method

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book; // JS함수는 1급 함수이기 때문에 갖다쓸 수 있어요

// // book(23, 'Sarah Williams');
// // Does NOT work. book은 아직 lufthansa.book과 다른점이 있다.
// // method는 부모 object를 this로 쓰지만 그 밖에 있는 book은 this를 전역으로 쓰기때문에 현재 this는 undefined다

// // 밖에 있는 book function이 지금 우리가 의도하고 있는, 어느 객체의 method처럼 작동하게 하려면 어떻게 해야할까? 1. call method 2. bind method

// // 1. Call method
// book.call(lufthansa, 239, 'Mary Cooper'); // 첫 인자를 this가 가르킬 object로 입력 후 나머지는 원래 method에서 필요했던 인자를 넣으면 된답니다.
// console.log(lufthansa);

// book.call(eurowings, 23, 'Sarah Williams'); // 이런식으로 다른 객체에도 써먹을 수 있겠지요?
// console.log(eurowings);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');

// const flightData = [583, 'George Cooper'];
// book.call(swiss, ...flightData); // 이런 활용도 가능하다능;
// console.log(swiss);

// // 133. The bind Method

// // 전 강의에서 첫 방법 1. call을 봤으니 이제 2. bind를 배울 차례, 참고로 이게 더 유용하고 자주 쓰일거라서 중요하단다.

// // 2. Bind method
// // book.call(eurowings, 23, 'Sarah Williams'); 이거랑 같은 기능을 구현해보죠
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// const bookEW = book.bind(eurowings); // 다른 곳에 있는 함수(method포함)를 가져와서, this가 가르킬 object를 지정하고 변수에 담으면
// bookEW(23, 'Steven WIlliams'); // 바깥에서 바로, 지정한 object 내의 method와 같은 역할을 하는 함수를 써먹을 수 있게된다. 재사용성 지젼

// const bookEW23 = book.bind(eurowings, 23); // 심지어 파라미터까지 미리 지정해놓을 수 있다..
// bookEW23('Kim Jinyoung');
// bookEW23('Lim Chaesung');
// // 이 bookEW23 같이 argument를 지정(디폴트 정도가 아니라)해놓은 아이를 partial application으로 부른단다.

// // with Event Listeners
// // with Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// // lufthansa.buyPlane(); // 잘 되는거 확인함

// // document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// // 엥 왜 log가 버튼으로 나오는 것이지요?
// // 예전 이론 강의에서 이벤트핸들러의 this는 항상 target element를 가르킨다고 했습니당

// // 이벤트 핸들러에서 this에 element가 들어가길 원하지 않는다면?
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// // 역시 bind야.. 성능 확실하구만.
// // 바로 bind(타겟 object), 얼핏 함수가 아니라 함수호출 같지만! bind가 뱉는 value는 function이라는거!

// // Partial application
// // Partial application
// // this 문제가 아니라도 bind는 유용하게 쓰일 때가 있다
// // 말했지만 파셜 어플리케이션이란건 parameter를 사전에 지정해주는 것이다.
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));
// // 나라마다 세율이 다르다면 나라별로 함수를 만들게 아니라 고정 파라미터값만 조정해주면 된다.
// const addVAT = addTax.bind(null, 0.23); // 그리고 이런 용도로 사용할 경우에 this를 고려할 이유가 없다. 그래서 첫 인자에 뭘 넣어도 상관없지만 일단은 null(for문 에서 _ 같은 역할)을 집어넣는 경우가 제일 많다

// console.log(addVAT(100));
// console.log(addVAT(23));

// // 같은 역할
// // addVAT = value => value + value * 0.23
// // 같은 역할 22222
// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// Coding Challenge #1
// Coding Challenge #1
// Coding Challenge #1

// // Let's build a simple poll app!

// // A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.
// // Here are your tasks:

// // 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
// //   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
// //         What is your favourite programming language?
// //         0: JavaScript
// //         1: Python
// //         2: Rust
// //         3: C++
// //         (Write option number)
// const poll = {
//   answers: [0, 0, 0, 0],
//   registerNewAnswer() {
//     let answer = Number(
//       prompt(`What is your favourite programming language?
//     0: JavaScript
//     1: Python
//     2: Rust
//     3: C++`)
//     );
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;
//     this.displayResults(this.answers);
//     this.displayResults();
//     this.displayResults('string');
//   },
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };
// //   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)

// // 2. Call this method whenever the user clicks the "Answer poll" button.
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));
// // 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".

// // 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// // HINT: Use many of the tools you learned about in this and the last section 😉

// // BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// // BONUS TEST DATA 1: [5, 2, 3]
// // BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// // GOOD LUCK 😀

// // 135. Immediately Invoked Function Expressions (IIFE)
// // 135. Immediately Invoked Function Expressions (IIFE)
// // 135. Immediately Invoked Function Expressions (IIFE)

// // 한번만 실행되는 함수가 있지요? 그런건 호출 한 번 하면 사라졌으면 좋겠어요.

// // 여태 해온 방식

// const runOnce = function () {
//   console.log('This will never run again');
// };
// runOnce();

// // IIFE

// // function () {
// //   console.log('This will never run again');
// //   const isPrivate = 23;
// // } // 익명 함수에 이름 안집어넣고 코드를 실행하면 에러가 난다.

// (function () {
//   console.log('This will never run again');
//   const isPrivate = 23;
// })(); // 근데 괄호를 씌워버리면 에러가 안난다. 그리고 거기다 뒤에 괄호하나 더 붙이면 바로 호출 가능 ㅋㄷ

// (() => console.log('This will ALSO never run again'))();

// // 과거에 var를 이용할때는 스코프 제한의 용도로 쓰였다고 한다.

// // console.log(isPrivate);

// // 하지만 es6에서 const와 let의 등장하면서 괄호만 씌우면 그 코드블럭 안에서만 스코핑되도록 할 수 있게되고 그게 더 간편한 방법이기 때문에 스코프 제한 용도로써는 효용이 사라졌고 이젠 정말 함수 딱 한 번 쓰고싶을때만 이용하면 된단다.
// {
//   const isPrivate = 23;
// }

// console.log(isPrivate);

// // 136. Closures
// // 136. Closures
// // 136. Closures

// 클로저가 무엇인지 알기전에,
// 클로저는 IIFE와 마찬가지로 js에 정식으로 존재하는 기능은 아니다
// 새 array나 function 만들듯이 코드 한줄로 뚝딱 만드는 기능이 따로 없다는 소리다
// 필요한 경우 우리가 적용할 수 있는 js의 작동방식 중 하나이다.

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
// ?
// 이게 왜 됨?
// secureBooking은 EC에서 이미 빠져나가고 함수 안에 만들어진 변수는 전역에서 못써야하지않음?
// 다시 정리, booker에 함수를 할당하는 secureBooking()을 호출한 후에 함수는 더이상 역할을 하지 못하는데, 여태 배운것과 다르게 함수내의 변수에 여전히 접근가능하다.
// 클로저의 역할은 함수가 만들어진 곳에 있었던 변수를 계속 쓸 수 있게 해준다는 것.

// // 137. More Closure Examples
// // 137. More Closure Examples
// // 137. More Closure Examples

// Example 1
// 재선언에 관한 이야기
let f;
const g = function () {
  const x = 1;
  f = function () {
    console.log(x * 2);
  };
};

g();
// g()가 f 할당을 하고 끝났다
f(); // 2
// f()가 실행될때에 EC에 g()가 빠져나갔기 때문에 접근할 x 밸류가 있는 variable environment는 증발됐고 f함수가 호출된 전역에선 찾을 수 없지만
// f가 가방에 x를 싸왔기 때문에 (클로저 덕분에) 꺼내 쓸 수 있어서 f()가 호출되면 2가 출력된다

const h = function () {
  const y = 11;
  f = function () {
    console.log(y * 2);
  };
};

// Re-assignment f function
h();
f(); // 22
console.dir(f);
// 이까지, 함수를 리턴하지 않고 재선언 하는것 또한  클로저가 만들어진다는 얘기였음

// Example 2
// 타이머에 관한 이야기
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`${perGroup} passengers per group`);
    console.log(`There are 3 groups, each group has ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(30, 3); // 이거 호출하자마자 perGroup가 생성되고 Will start boarding in 3 seconds가 출력되고, 3초 후에 perGroup가 출력된다
// EC에서 이미 빠져나가고, 함수 안에 만들어진 변수는 전역에서 못써야하지않음?
// 다시 정리, boardPassengers에 함수를 할당하는 타이머를 호출한 후에 함수는 더이상 역할을 하지 못하는데, 여태 배운것과 다르게 함수내의 변수에 여전히 접근가능하다.
// 이게 처음에 당연하게 느껴졌는데 알고보니 사실은 좀 복잡한거였다. 그냥 저 boardPassengers함수가 계속 실행되는 중이고 그래서 setTimeout이 당연하게 arguments를 받아 쓰는 줄 알았는데.. 이미 함수는 마지막 콘솔로그를 출력하면서 EC에서 사라졌고 setTimeout은 쓸쓸하게 남겨진 상태에서.. argument를 클로저를 통해 받아온 것이었다

// // 138. Coding Challenge #2
// // 138. Coding Challenge #2
// // 138. Coding Challenge #2

// // This is more of a thinking challenge than a coding challenge 🤓

// // Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!
// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   function toBlue() {
//     header.style.color = 'blue';
//   }

//   document.querySelector('body').addEventListener('click', toBlue);
// })();
// // And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

// // 위 IIFE에서 함수 실행이 종료되었다. 글자는 빨갛다.
// // body를 클릭하면 toBlue가 실행될텐데 그 함수안에 있는 header는 전역에 존재하지 않기 때문에 클로저가 없었다면 제기능을 할 수 없었을 것이다.
// // toBlue는 죽은 부모 함수의 유품을 그대로 가지고있다..

// // GOOD LUCK 😀
