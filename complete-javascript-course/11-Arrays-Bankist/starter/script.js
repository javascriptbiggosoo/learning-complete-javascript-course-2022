'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// 145. Creating DOM Elements 부제: ".insertAdjacentHTML()"
// 145. Creating DOM Elements
// 145. Creating DOM Elements

// 입출금 내역을 반영해보는게 이번 목표
// 클린 코드: 밖에다 코드를 작성해도 된다. 다만 함수로 만들어서 쓰는게 훨 씬 좋 다.
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // 이미 담겨있는 HTML 비우기

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    // 자 forEach를 돌리면서 만들어진 각 .movements__row를 .movements 안에 넣고싶다 어떻게 해야할까?

    //.insertAdjacentHTML()으로 집어넣을거임!
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // 사용법, 일단 첫 인자로 앺터비긴,비포엔드,#$@,@#$ 중에 고름.(조나스는 4개중에  앺터비긴,비포엔드 외엔 거의거의 안쓴단다. https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)
    // 두번째 인자는 추가할 html코드를 string에 담아서 주면됨. 쉽지용?
  });
};
displayMovements(account1.movements); // account1의 입출금 기록을 받아왔습니다.

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// // 141. Simple Array Methods
// // 141. Simple Array Methods
// // 141. Simple Array Methods

// // methods란 objects에서 호출하는거라고 배웠자나여? 근데 어떻게 array는 methods를 갖고있는 거지요?
// // -> 그 말인 즉슨, arrays또한 objects라는 것(두둥) 일단 넘어가고

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE, arguments 범위 밖을 도려내서 return, 원본은 그대로
// console.log(arr.slice(2)); // [ 'c', 'd', 'e' ]
// console.log(arr.slice(2, 4)); // [ 'c', 'd' ]
// console.log(arr.slice(-2)); // [ 'd', 'e' ]
// console.log(arr.slice(1, -2)); // [ 'b', 'c' ]
// // 아래 둘 다 shallow copy, 취향대로 쓰시오
// console.log(arr.slice()); // [ 'a', 'b', 'c', 'd', 'e' ]
// console.log([...arr]); //[ 'a', 'b', 'c', 'd', 'e' ]

// // SPLICE, arguments 범위 밖을 도려내서 return, 당신의 원본, 도려져 남은 부분으로 대체되었다.
// console.log(arr.splice(-1)); // [ 'e' ]
// console.log(arr); // [ 'a', 'b', 'c', 'd' ]
// arr.splice(1, 2);
// console.log(arr); // [ 'a', 'd' ]
// arr = ['a', 'b', 'c', 'd', 'e']; // 역시 타임코스모스야.. 성능 확실하구만.

// // REVERSE, 뒤집음, 얘도 원본 변형함
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // [ 'f', 'g', 'h', 'i', 'j' ]
// console.log(arr2); // [ 'f', 'g', 'h', 'i', 'j' ]

// // CONCAT, 합침
// const letters = arr.concat(arr2);
// // 아래 둘 다 정확히 똑같이 동작함. 취향대로 코딩하세염
// console.log(letters); // [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]
// console.log([...arr, ...arr2]); // [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ]

// // JOIN, array to string
// console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j

// // 142. Looping Arrays: forEach
// // 142. Looping Arrays: forEach
// // 142. Looping Arrays: forEach

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('-------------------------------');

// // 콜백함수를 인자로 받고 위와 똑같은 동작을 하는 .forEach()
// // 전 섹션에서 말했지만 다시 말합니당 우리가 함수호출을 직접 코딩해놓지 않아도, 콜백함수는 코드가 실행되는 와중에 호출될 수 있습니다. 너무 당연한 말인데 암튼 그럼
// // .forEach()는 이터러블한 object를 루핑하면서 각 element를 콜백함수의 argument로 넣고 호출한다
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });
// // 그리고 그 콜백함수는 현재 루핑중인 element를 인자로 받는다.
// // 0: function(200)
// // 1: function(450)
// // 2: function(400)
// // ...이런식

// console.log('-------------------------------');

// // for of의 경우 index가 필요할 땐 .entries()를 쓰면 됐다
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('-------------------------------');

// // .forEach()는 어떡함?
// movements.forEach(function (mov, i, arr) {
//   // 콜백함수가 받는건 element뿐만이 아니다. 두번째로 index를, 세번째로 looping중인 array까지 받는다.
//   // 첫 argument는 항상 있어야하지만 나머지는 필요에 따라 입력하지 않아도 괜찮다
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });
// // (mov, , arr) 이런식으로는 작동 못함 안써도 두번째 인자 줘야함

// // 위와 아래의 차이는 .forEach() 루프는 break가 안된다는점. 브레이크가 필요하면 포오브를 쓰세요 ㅎㅎ. 근데 뭐, 코드는 자기만의 스타일이 있는거니까 딱히  이런 이유가 없더라도 취향따라 항상 포오브만 써도 되긴해요~~

// // 146. Coding Challenge #1
// // 146. Coding Challenge #1
// // 146. Coding Challenge #1
// // Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// // 개 나이, 3보다 적으면 puppy 아니면 adult라고함

// // Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// const checkDogs = function (dogsJulia, dogsKate) {
//   // 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
//   const realDogsJulia = dogsJulia.slice(1, -2);
//   console.log(realDogsJulia);

//   // 2. Create an array with both Julia's (corrected) and Kate's data
//   const dogsBoth = [...realDogsJulia, ...dogsKate];

//   // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
//   dogsBoth.forEach(function (dog, i) {
//     const dogOld =
//       dog >= 3
//         ? `Dog number ${i + 1} is an adult, and is ${dog} years old"`
//         : `Dog number ${i + 1} is still a puppy 🐶`;
//     console.log(dogOld);
//   });
// };

// // 4. Run the function for both test datasets
// // TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// // TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// // HINT: Use tools from all lectures in this section so far 😉

// // GOOD LUCK 😀

// // 148. The map Method
// // 148. The map Method
// // 148. The map Method

// // map vs. forEach, map은 개조된 element들로 새 array를 만들어서 return해준다.
// // 이번 코드의 목적은 달러로 환전계산을 해보는 것입니둥
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // }); // 새 어레이에 집어넣을 밸류를 리턴하시면 됩니다.
// const movementsUSD = movements.map(mov => mov * eurToUsd);
// // map method는 애로우펑션이랑 쓰는게 참 이쁘다

// console.log(movements);
// console.log(movementsUSD);

// // 이렇게 만들어도 같은 동작을 하지만
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);
// // 어차피 이렇게 만들게 목적이라면 이경우엔.. 취향을 넘어서 map을 쓰기를 권장한다
// // 곧 배울텐데 모던 자바스크립트는 함수형 프로그래밍을 지향하는데 여기선 map을 사용해주는게 그 패러다임에서 좀 더 적합하다.
// // 막 보이는 이점만 해도 1. 콜백함수를 이용한다면 여러 재사용이 가능해지고 2.때로는 메소드와 콜백함수 이름만 봐도 다른 프로그래머들이 이게 무슨 역할을 하는지 짐작하기 쉬워진다.
// // 단순 반복인 forEach와는 격이 달라

// // 맵의 콜백함수도 포이치와 정확히 같은 세가지 파라미터를 가진다
// const movementDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );
// console.log(movementDescriptions);
// // 지금 돌아가는 이 코드에서 맵을 통해서 콜백펑션이 사용된다. 그 과정은 우리가 직접 콜백펑션을 호출하는 코드를 써놓은 것이 아니고 map 메소드가 어레이의 각 element를 콜백함수로 어루만져주는 것이다.(중요)

// // 150. The filter Method
// // 150. The filter Method
// // 150. The filter Method

// // 포이치, 맵이랑 받는 argument 3개 같당
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);
// // 이번에도 포오브쓰면 됨 근데 섹시한 js프로그래머는 함수형 프로그래밍을 지향하기위해 필터를 쓰자

// const deposits = movements.filter(mov => mov > 0);
// // 강의 끗, 맵처럼 새 어레이 리턴하는데 true인 애들만 보내준다는점
// console.log(movements);
// console.log(deposits);

// // 151. The reduce Method
// // 151. The reduce Method
// // 151. The reduce Method

// // 리듀스 메소드는 어레이를 돌면서 딱 하나의 밸류만 return한다
// const movements = [200, -400, 3000, -650];
// console.log(movements);

// // 잔고 확인
// // reduce만은 포이치, 맵과 다르게 콜백함수가 받는 argument가 조금 다르다.
// // 첫 인자로 어큐멀레이터라는 친구가 온다. 최종 리턴하는걸 위해서 축적을 한대나
// // accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   // Iteration 0: 0
//   // Iteration 1: 200
//   // Iteration 2: -200
//   // Iteration 3: 2800
//   return acc + cur; // 루핑할때마다 acc는 return 되는 값으로 업데이트된다
// }, 0); // reduce 메소드의 parameter는 두 개인데, 첫째로 콜백함수가 들어가고 두번째로 acc의 초깃값을 주어야 한다.
// console.log(balance); // 2150
// // 확실히 필터나 맵과는 모양이 슥 다르지만 또 뭐 그렇게 쇽 복잡한건 없다 그냥 삭 외우면 될듯

// const balanceWithArrowFunction = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balanceWithArrowFunction);

// // 이제는 정겨운 포오브와의 비교
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2); // 2150

// // some and every
// // some and every
// // some and every
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// // EQUALITY
// console.log(movements.includes(3000)); // true

// // SOME:CONDITION
// console.log(movements.some(mov => mov > 1000)); // true
// console.log(movements.some(mov => mov < -1000)); // false

// // EVERY:ALSO CONDITION
// console.log(movements.every(mov => mov > 1000)); // false
// console.log(movements.every(mov => mov > -1000)); // true

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit)); // true
// console.log(movements.every(deposit)); // false
// console.log(movements.filter(deposit)); // [200, 450, 3000, 1300]

// // Coding Challenge #2
// // Coding Challenge #2
// // Coding Challenge #2
// // 맞췄는데 arrow function으로 쓸 수 있도록 해보자

// // Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// // 개나이를 사람으로치면 몇살인지 해보자네

// // Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// const calcAverageHumanAge = function (ages) {
//   // 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
//   // 환산(맵)
//   const calcAge = function (dogAge) {
//     let humanAge;
//     if (dogAge <= 2) {
//       humanAge = 2 * dogAge;
//     } else {
//       humanAge = 16 + dogAge * 4;
//     }
//     return humanAge;
//   };
//   const dogsAgeToHuman = ages.map(calcAge);
//   console.log(dogsAgeToHuman);
//   // 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
//   // 미성년자 개는 제외하래(filter) 쓰라는거지)
//   const cut = function (age) {
//     const isAdult = age >= 18 ? true : false;
//     return isAdult;
//   };
//   const adultDogs = dogsAgeToHuman.filter(cut);
//   console.log(adultDogs);

//   // 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
//   // 어른 멍멍이들 나이의 평균을 계산하래(reduce 쓰라는거지)
//   const averageadultDogs =
//     adultDogs.reduce(function (acc, el) {
//       return acc + el;
//     }, 0) / adultDogs.length;
//   console.log(averageadultDogs);
// };
// // 4. Run the function for both test datasets

// // TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// // TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// // GOOD LUCK 😀

// // Coding Challenge #3
// // Coding Challenge #3
// // Coding Challenge #3

// // Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// const calcAverageHumanAge = function (ages) {
//   return ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => (age >= 18 ? true : false))
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// };

// // TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// // TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
// // GOOD LUCK 😀

// // The new at Method
// // The new at Method
// // The new at Method
// const arr = [23, 11, 64];
// console.log(arr[0]); // 23
// console.log(arr.at(0)); // 23

// console.log(arr[arr.length - 1]); // 64
// console.log(arr.at(-1)); // 64

// console.log('김소혜'.at(-1)); // 혜

// // The find Method
// // The find Method
// // The find Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(firstWithdrawal); // -400

// console.log(accounts); // [{ name: 'Julia', balance: 0 }, { name: 'Kate', balance: 0 }]

// // 조건에 맞는 가장 앞쪽의 element만 뱉는다
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account); // { name: 'Jessica', balance: 0 }

// More Ways of Creating and Filling Arrays
// More Ways of Creating and Filling Arrays
// More Ways of Creating and Filling Arrays

// [1,2,3,4,5,6,7] manually하게 만드는법
console.log([1, 2, 3, 4, 5, 6, 7]); // [1, 2, 3, 4, 5, 6, 7]
console.log(new Array(1, 2, 3, 4, 5, 6, 7)); // [1, 2, 3, 4, 5, 6, 7]

// Empty arrays + fill method
const x = new Array(7);
// 인자 하나만 넣으면 그 인자가 길이로 주어지는 빈? 어레이가 된다고..
console.log(x); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
console.log(x.map(() => 5)); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
// 주의! [5, 5, 5, 5, 5, 5, 5] 아님
// 와 이건 맵으로 채우지도 못함 슈벌

// 얘를 채우려면 fill메소드 써야함
x.fill(1, 3, 5);
console.log(x); // [undefined, undefined, undefined, 1, 1, undefined, undefined]
// 첫번째는 채울값, 두번쨰는 슬라이스 시작, 마지막은 슬라이스 끗
x.fill(1); // 이러면 다채움
console.log(x); // [1, 1, 1, 1, 1, 1, 1]

// 안빈어레이에도 fill 쓸 수 이슴
const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 6);
console.log(arr); // [1, 2, 23, 23, 23, 23, 7]

// // [1,2,3,4,5,6,7] programmatically하게 만드는법
// Array.from
// 배열.method형태로 쓰는게 아니라 Array constructor function째로 쓴다.
const y = Array.from({ length: 7 }, () => 1); // 첫인자는 length 프로퍼티 두번째는 매핑함수(맵 메소드에서 쓴 콜백함수랑 같음)
// jonas는 이게  위에 1.new Array(7) 만들고 + 2.fill로 채운것보다 깰끔한 것 같다네
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// Array.from()의 진정한 사용법
// Array.from() was initially introduced into JavaScript in order to create arrays from array like structures.
// string, set, map같은 이터러블한 애들은 Array.from()으로 Array(배열)로 만들 수 있단다. 그게 실제 용도이고.
// 명명이 from인 이유도 인자로부터 array를 만든다~~ 뭐 그런 의미라고함
// 쿼리셀렉터올로 받는것은 노드리스트라고 하는데 Array같이 생겼지만 진짜 Array는 아니라서(유사배열이라서) map(), reduce() 같은 메소드를 쓸 수 없다고 한다.
// 쓰려면 NodeList를 Array로 바꿔야하겠지요
// 그떄 Array.from()이 제격이지요!

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

// Sorting Arrays
// Sorting Arrays
// Sorting Arrays

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']
console.log(owners); // ['Adam', 'Jonas', 'Martha', 'Zach']

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// JSsort메소드는 string을 정렬하는 메소드다 그냥 호출하면 안에든걸 스트링으로 바꿔서 정렬함
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70]

// 숫자를 정렬하려면 콜백함수를 담아야함다
// 그 콜백함수는 두가지 parameter를 가집니다
// 아래 a: currentValue b: nextValue
movements.sort((a, b) => a - b);
console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]

// 양수 return: A, B (keep order)
// 음수 return: B, A (switch order)

// Ascending 큰->중->작
movements.sort((a, b) => b - a);
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
console.log(movements); // [3000, 1300, 450, 200, 70, -130, -400, -650]

// Descending 작->중->큰
movements.sort((a, b) => a - b);
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
console.log(movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]

// 다중조건: https://velog.io/@protect-me/Javascript-Sort-%EC%BB%B4%ED%8C%A9%ED%8A%B8-%EA%B0%80%EC%9D%B4%EB%93%9C-protect-me
