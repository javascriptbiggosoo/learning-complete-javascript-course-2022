'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// // Converting and Checking Numbers
// // Converting and Checking Numbers
// // Converting and Checking Numbers

// console.log(23 == 23.0); // true

// // Decimal Base 10  - 0 to 9
// // Binary Base 2 - 0 or 1
// console.log(0.1 + 0.2); // 0.30000000000000004
// console.log(0.1 + 0.2 === 0.3); // false

// // Conversion
// console.log(Number('23')); // 23
// console.log(+'23'); // 23

// // Parsing
// // console.log(parseFloat('2.5rem')); // old way

// console.log(Number.parseInt('30px')); // 30
// console.log(Number.parseInt('e23')); // NaN

// console.log(Number.parseInt('2.5rem')); // 2
// console.log(Number.parseFloat('2.5rem')); // 2.5

// // Check if value is NaN
// console.log(Number.isNaN(20)); // false
// console.log(Number.isNaN('20')); // false
// console.log(Number.isNaN(+'20X')); // true
// // the reason why don't use isNaN
// console.log(Number.isNaN(20 / 0)); // false

// // Checking if value is number
// console.log(Number.isFinite(20)); // true
// console.log(Number.isFinite('20')); // false
// console.log(Number.isFinite(+'20X')); // false
// console.log(Number.isFinite(20 / 0)); // false

// // 177. Timers: setTimeout and setInterval
// // 177. Timers: setTimeout and setInterval
// // 177. Timers: setTimeout and setInterval

// // setTimeout
// const ingredients = [`olives`, `spinach`];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   ...ingredients
// );
// // 첫인자로 콜백함수, 두번째로 대기타는 시간(ms), 세번째부터는 콜백함수에 들어갈 argument를 넣어줄 수 있다.
// // 셋타임아웃을 실행하면 콜백함수를 실행하기로 예약걸어둔다
// // 그리고 셋 타임아웃 이하의 코드가 계속 읽어진다(셋 타임아웃에서 안멈추고)
// // 이게 메커니즘을 비동기(asynchronous)자바스크립트라고 한단다

// console.log(`Waiting...`); // 이게 먼저 출력됨!

// // // 아 시금치 안먹는다고~~
// // if (ingredients.includes('spinich')) clearTimeout(pizzaTimer);

// // setInterval
// // 무한으로 즐겨요
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

// The Remainder Operator
// The Remainder Operator
// The Remainder Operator
// 짝수 홀수 판별코딩법에 대해.. js특 같은걸 가르친게 아님 안봐도 됨

// Creating Dates
// Creating Dates
// Creating Dates

// // Create a date

// const now = new Date();
// console.log(now);

// // string  넣으면 자동으로 파싱해서 날짜로 만들어줌
// console.log(new Date('Aug 02 2020 18:05:41')); // Sun Aug 02 2020 18:05:41 GMT+0900 (Korean Standard Time)
// console.log(new Date('December 24, 2015'));
// console.log(new Date('1994 11 10')); // Thu Nov 10 1994 00:00:00 GMT+0900 (Korean Standard Time)
// // 제법 똑똑하지만 일단은 지양하자

// // 애초에 js 날짜 스타일로 저장된 문자열 같은경우? 마음껏 사용하세요
// // account1.movementsDates[0]): '2019-11-18T21:31:17.178Z'
// console.log(new Date(account1.movementsDates[0]));

// // 엥 이거 왜 10인데 노벰버? -> js에서 1월은 0이래.. 0 based라고.. ㅄ..
// console.log(new Date(2037, 10, 19, 15, 23, 5)); // Thu Nov 19 2037 15:23:05 GMT+0900 (Korean Standard Time)

// // 11월에 31일은 없다. 없는 날 입력하면 자동으로 바까줌
// console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0900 (Korean Standard Time)

// 단일 숫자를 넣으면 유닉스 타임으로부터 밀리세컨드 단위로 지난만큼 날짜를 반환함
// Unix time, 1970년 1월 1일 00:00:00 협정 세계시(UTC) 부터의 경과 시간을 초로 환산하여 정수로 나타낸 것이다.
console.log(new Date(0)); // Thu Jan 01 1970 09:00:00 GMT+0900 (Korean Standard Time)

console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 09:00:00 GMT+0900 (Korean Standard Time)
// // 이거 좀 유용한데 나중에 봅세

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10
// 월단위 일
console.log(future.getDate()); // 19
// 주단위 일, 0을 일요일로 시작해 목요일은 4
console.log(future.getDay()); // 4
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
// 국제표준시, api만들거나 할때 이걸로 넣으면됨
console.log(future.toISOString()); // 2037-11-19T06:23:00.000Z

// 유닉스타임
console.log(future.getTime()); // 2142224580000
// 역 유닉스타임
console.log(new Date(2142256980000));
// 걍 지금 유닉스타임이 갖고싶을 뿐이라면 new를 붙일 필요가 없음
console.log(Date.now()); // 1654154420388... 실시간 유닉스타임

console.log(future); // Thu Nov 19 2037 15:23:00 GMT+0900 (Korean Standard Time)
future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00 GMT+0900 (Korean Standard Time)
