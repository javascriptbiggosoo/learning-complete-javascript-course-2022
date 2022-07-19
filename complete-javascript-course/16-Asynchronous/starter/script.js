'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// // Our First AJAX Call: XMLHttpRequest
// // Our First AJAX Call: XMLHttpRequest
// // Our First AJAX Call: XMLHttpRequest

// // https://restcountries.eu/rest/v2/
// // =>
// // https://restcountries.com/v3.1/

// // ajax call은 여러 방법이 있지만 일단 올드스쿨 방식 XMLHttpRequest function 부터 해보자
// // 이걸 강의에 넣은 이유는 두가지인데, 이게 있다는 사실 자체는 알아두는게 좋기때문이 첫번째이고, 두번째는 이벤트랑 콜백함수로 ajax call을 어떻게 다루는지 보여주기 위해서

// // https://restcountries.com/

// // API 문서를 보면 CORS라는게 있다
// // CORS가 없다면 우리코드는 써드파티API에 접근할 수 없다네
// // CORS stands for Cross Origin Resource Sharing
// // https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
// // 나중에 알아보도록하자

// // 문서에는 API ENDPOINTS라는 것도 있을텐데 URL을 다르게 표현한 말이다
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(request.responseText);
//   // 위의 open 과정이 느리기 때문에 비동기 처리가 되거든여 그래서 이건 출력이 안댕

//   // 그래서 콜백으로 load되면 실행해보기로 함~
//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     // 날것의 JSON은 아직 string이기 때문에 object로 바꿔줘야한덩

//     // const data = JSON.parse(this.responseText);
//     // console.log(data);
//     // 로그 찍어보니까 object가 []안에 들어가있는 형태다 구조분해하자
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[data.cioc.toLowerCase()]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.keys(data.currencies)[0]
//             }</p>
//           </div>
//         </article>
//   `; // Object.values(data.languages)[0] 메모
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('korea');
// // getCountryData('japan');
// // getCountryData('russia');
// // 비동기라서 겟컨트리데이터가 동시에 실행되는데 그래서 이 경우 리로드 할때마다 순서가 바뀔 수 있다
// // 순서를 정하고싶으면 리퀘스트를 체이닝해야함

// // Welcome to Callback Hell
// // Welcome to Callback Hell
// // Welcome to Callback Hell

// // 이웃나라도 띄워보자
// // 일단 country를 받고나서 country data를 토대로 그 이웃국가도 받아야한다
// // 그소리는, 이웃국가에 대한 처리는 선행되는 country 코드가 정상적으로 작동했다는 전제로 작성된 코드다.
// // 두번째 콜이 실행되려면 첫째 콜이 제대로 들어와야한다.
// // 자, 순서대로 ajax call하기를 해보자

// // 한 함수에 한 기능만 하고싶어서 렌더기능 분리
// const renderCountry = function (data, className = '') {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[data.cioc.toLowerCase()]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.keys(data.currencies)[0]
//             }</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   // AJAX call, country 1
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // Render country
//     renderCountry(data);

//     // 요기부터 이번강의 새로운 코드시작
//     // Get neighbour country(country 2) of country 1
//     const [neighbour] = data.borders; // ['PRK']

//     // 이웃 없으면 안렌더
//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     // AJAX call, country 2
//     // 분명 켓컨트리앤네이버 함수는 국가이름을 받는데 이번엔 세글자짜리 코드를 써야한다. api문서를 보니 3글자짜리로 찾는 법이 있다
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       // Render country
//       renderCountry(data2, 'neighbour'); // 두번째 인자는 비워놓으면 디폴트로

//       // 지금 콜백함수가 두개 있는데 만약 이웃이웃이웃이웃이웃을 찾는다면 계속 여기에서 콜백을 추가로 때려박아야할까? 히이잉;
//       // 콜백안에콜백안에콜백.. 너무 끔찍하다능
//     });
//   });
// };
// // getCountryAndNeighbour('korea');
// getCountryAndNeighbour('Canada');

// // ajax 이외에도 비동기는 모두 콜백지옥을 가질 수 있다
// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 second passed`);
//     setTimeout(() => {
//       console.log(`3 second passed`);
//       setTimeout(() => {
//         console.log(`4 second passed`);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// // callback hell은 유지보수에 매우 부정적이다
// // 가독성이 일단 엄청 구려진다
// // 코드 형태 자체가 버그를 일으킬 확률을 높일 수 있단 소리

// // Promises and the Fetch API
// // Promises and the Fetch API
// // Promises and the Fetch API

// // 콜백지옥을 극복하게 해주는 프로미스
// // 일단 구식인 xml http request 함수부터 버리고 fetch를 쓴다
// // const request1 = new XMLHttpRequest();
// // request1.open('GET', `https://restcountries.com/v3.1/alpha/canada`);
// // request1.send();

// const request = fetch('https://restcountries.com/v3.1/name/canada');
// console.log(request); // 프로미스 즉시, 리턴
// // Promise constructor function으로 만들어짐, Prototype property: Promise

// // Consuming Promises
// // Consuming Promises
// // Consuming Promises

// const renderCountry = function (data, className = '') {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[data.cioc.toLowerCase()]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.keys(data.currencies)[0]
//             }</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// // fetch에서 return된 그 promise를 consume하는 법을 배울 것
// const getCountryData = function (country) {
//   // 이 펫치는 리퀘스트 하자마자, 리스폰드 되기도 전에 pending상태인 promise를 뱉고, asynchronous task가 백그라운드에서 진행중
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       // fullfill 상태면 then 실행(프로미스의 메소드)
//       // 프로미스 fulfilled대자마자 실행할 콜백함수를 넣어줘야한다
//       // 그 콜백함수는 fulfilled promise를 argument로 취함
//       response => {
//         console.log(response);
//         // http로 리스폰스를를 넘겨받았는데 데이터는 body안에 있고 json 메소드를 사용해서 열어볼 수 있다
//         return response.json();
//         // 모든 fetch 로 받아온 리스폰스 object에 쓸 수 있는 메소드이고 json 메소드 자체도 비동기 함수다
//       }
//     )
//     // json 메소드도 비동기 함수다?? -> json 메소드도 새로운 promise를 return한다
//     // 리턴하고 어찌저찌 이 promise도 잘 핸들링 해야댐
//     // 그래서 또다른 콜백 펑션을 붙여야햄
//     .then(data => {
//       console.log(data);

//       // 로그찍어서 꺼낼 데이터 위치 확인했죠? data[0] 렌더
//       renderCountry(data[0]);
//       // 결과적으로 promise 하나를 써먹기 위해 실질적으론 두 promise를 다뤄야 했다
//     });
//   // 이까지가 promise를 이용해서 이전 코드랑 같게 기능하도록 구현해본 것
// };

// // 주석, 로그 다 치우면 위 코드는 아래와 같아진다.

// // const getCountryData = function (country) {
// //   fetch(`https://restcountries.com/v3.1/name/${country}`)
// //     .then(response => response.json())
// //     .then(data => renderCountry(data[0]));
// // };

// // 지금보니 콜백지옥이란 말이 체감이 됩니까??
// // 프로미스가 '콜백함수'가 필요없어지는 마술은 못부리지만 '콜백지옥'을 없애는 마술까진 부릴 수 있었다.

// getCountryData('russia');

// // Chaining Promises
// // Chaining Promises
// // Chaining Promises

// const renderCountry = function (data, className = '') {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[data.cioc.toLowerCase()]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.keys(data.currencies)[0]
//             }</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// // json 메소드 때문에 어쩔수 없이 한거긴 하지만 이미 이전 강의에서 체이닝을 맛은 봤지요?
// // 옆에 이웃 띄우는걸 하면서 더 해봅시다.
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       // 이 코드에서 api의 data[0].borders[0]가 비어있으면 작동을 안하는데 에러 핸들링은 다음에 배우기로 하고 일단 넘어감

//       // Country 2

//       // then 메소드는 리턴하는 값이 존재하든 빈 깡통이튼 그걸 프로미스로 만들어서 return한다
//       // 뭔가 들어있다면 fulfillment value가 되는 것이 차이일 뿐
//       return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     });
// };

// // 프로미스를 then으로 이어달리기 해서 콜백 지옥을 극복하고 가독성 좋은 코드를 만들었다!
// // >> flat chain of promises

// getCountryData('russia');

// // 위에 fetch된거 리턴 안하고 그냥 then안에서 바로 프로미스를 (새로운)then으로 받아도 될까? 되기는 된다.
// // 근데 우리는 콜백지옥을 극복하려고 then을 만든거잖아? 그렇게 쓸거면 그냥 콜백지옥을 써도 된다.....
// // 안쪽 then 안에서 생기는 promise는 신경쓰지말고 무지성으로 then 리턴에서의 promise를 이어받으면 된다.
// // 그것이 이미 프로미스형태인 애들일지라도 then에서 굳이 return해주는 이유!

// // Handling Rejected Promises
// // Handling Rejected Promises
// // Handling Rejected Promises

// // 이때까지 ajax call하는 동안 모든 상황이 순조롭게 돌아갈 것을 가정한 예제를 다뤘는데 실제 웹개발에서는 에러 생긴거 핸들하는게 매우 중요해용

// const renderCountry = function (data, className = '') {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[data.cioc.toLowerCase()]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.keys(data.currencies)[0]
//             }</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);

//   // 추후 finally로 처리 예정!
//   // countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);

//   // 추후 finally로 처리 예정!
//   // countriesContainer.style.opacity = 1;
// };

// const getCountryData = function (country) {
//   // fetch promise가 거절(reject)되는 경우는 유저가 인터넷 연결이 끊어지는 것 뿐이다.
//   // 이번 강의는 에러 상황을 가정하고 그 처리를 하는걸 보여줘야해서 네트워크를 임의로 끄면서 실습해봅시다.
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(
//       // chain끝에 catch 메소드를 달아주기
//       // 에러 catch delegate

//       err => {
//         renderError(`Somthing went wrong 💥💥 ${err.message}. Try again!`);
//         // 에러도 js object다
//         // 에러를 map, set 같은 생성자함수를 써서 만들 수도 있다능
//         // message property는 모든 에러 object가 가지고있듬

//         // 에러는 유저 인터페이스뿐만 아니라 콘솔에서도 보이게 하는 편이(개발자에게) 좋습니다
//         console.error(`${err} 💥💥💥`);
//         // 성공했을때 콘솔로그는 반대로 성능상 문제 생길 수 있으니 지양합시다(강의에선 언급안함)
//       }
//     )

//     // then, catch와 더불어 모든 promise에 쓸 수 있는 메소드, finally를 소개합니다.
//     // 파이널리에 있는 콜백함수는 풀필이든 리젝트든 프로미스 뜨면 항상 호출된다
//     .finally(() => {
//       // 렌더, 에러에 함수에 공통으로 들어가는 녀석 발견! 파이널리로 처리하자
//       countriesContainer.style.opacity = 1;

//       // 파이널리도 promise만 받는다.
//       // -> 캐치가 뱉는 것도 당연히 프로미스이기 때문에 체인 마지막의 파이널리가 잘 작동하는 것
//     });
// };

// // 버튼 누르면 api끌어오도록 해볼거다(페이지 로드하기 전부터 네트워크 연결이 안되어 있으면 페이지 로드가 안되서 시뮬레이션에 애로사항이 꽃핀다)
// // 그래서 아래처럼 해놓는게 시뮬레이션에 용이함 ㅎㅎ
// btn.addEventListener('click', function () {
//   getCountryData('russia');
// });

// 정리, then은 풀필, 캐치는 리젝트, 파이널리는 둘다
// 파이널리는 위 둘 만큼 유용하진 않다. 로딩 동그라미 같은 경우에 쓰이곤한다

// // Throwing Errors Manually
// // Throwing Errors Manually
// // Throwing Errors Manually

// // 1 맨 아랫줄 먼저 보셈

// const renderCountry = function (data, className = '') {
//   const html = `
//   <article class="country ${className}">
//   <img class="country__img" src="${data.flags.svg}" />
//   <div class="country__data">
//   <h3 class="country__name">${data.name.common}</h3>
//   <h4 class="country__region">${data.region}</h4>
//   <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
//     1
//   )}</p>
//     <p class="country__row"><span>🗣️</span>${
//       data.languages[data.cioc.toLowerCase()]
//     }</p>
//     <p class="country__row"><span>💰</span>${
//       Object.keys(data.currencies)[0]
//     }</p>
//     </div>
//     </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };

// // 1
// // 이전 강의 코드, 발전의 여지가 있다. 다시보자.
// // 1

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       renderError(`Somthing went wrong 💥💥 ${err.message}. Try again!`);
//       console.error(`${err} 💥💥💥`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // getCountryData('korea');
// getCountryData('aespa');
// // 콘솔에서 타입에러가 뜨는데 클릭해보면 몇번째줄 코드가 에러를 일으키는지 보여준다
// // 근데 지금 이거 정확히 '어느 부분'에서 문제인지 제대로 반영안됨
// // getCountryData('aespa') 있는 줄에 에러 있다고 하지만 사실은 함수 로직의 어딘가에서 잘못된거잖아? 그걸 핀셋으로 집어준다면 디버깅 하기 수월하겠지요?

// // 지금 표면상 이유는 undefined 에서 flag를 가져오려고함
// // but in fact it is that our API cannot find any country. And so that's reflected here with the status code 404
// // 처음말했듯 fetch는 연결이 끊긴 경우만 reject를 준다
// // 404 난 이유: which is because our API couldn't find any country with this name
// // 긍께 에러는 reject때문이 아니고, 풀필을 받긴했는데 거기서 문제인거
// // 우리는 유저한테 그런 나라 없는데라고 알려주고싶네요?
// // 그게 이번 강의 내용임

// // 2
// // 404 에러 부분을 손봐주자
// // 2

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     // 1. fetch중에 나라이름 개같아도 리젝트 안되고 then으로 넘어가는게 나는 좀 불만인데, 바로 reject하고 걸러지는 장치가 있으면 좋겠다
//     .then(response => {
//       // 2. 그래서 log 볼 수 있게 해봤는데 최상단 리스폰스를 보니, status가 404고 그래서 ok property가 false로 되어있는 것을 확인했다.
//       // (정상적으로 나라이름을 입력한 경우는 200, true로 나옴)
//       console.log(response);

//       // 3. 장인처럼 손수 한땀한땀(manually) 에러를 만들어내자
//       // (지금 예제코드는 나중엔 수정해야할 코드입니다 이렇게 쓰지 않습니다. 작동원리만 파악하려는 목적)
//       if (!response.ok) {
//         // 입력한 나라이름이 api 내에 존재하지 않는 경우, this is the real error message that we want to see here
//         // Error 생성자함수로 새 에러를 만들고 argument로 에러 메세지가 될 걸 담아줌
//         throw new Error(`Country not found ${response.status}`);
//         // then we use the throw keyword here, which will immediately terminate the current function. So just like return does it.
//         // Now the effect of creating, and throwing an error in any of these then methods is that the promise will immediately reject.
//         // So basically, the promise returned by this then handler here will be a rejected promise.
//       }
//       // 이 then에서 에러가 만들어지면 propagate... 즉시 저 아래의 캐치 핸들러가 받는다
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // 5. 첫번째 페치는 잘 되었다는걸 전제로 두번째 페치에서 에러날 경우를 대비한 코드를 작성해봅시다.
//       // const neighbour = data[0].borders[0];

//       // 위 코드를 주석처리하고 이렇게 에러 나도록 개같은걸로 바꿔봅
//       const neighbour = 'fuifnmsi';

//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
//     })
//     // 이번엔 400에러가 나는데 위의 예처럼 핸들링해봅시다.
//     .then(response => {
//       // (아까도 말했지만 지금 예제는 나중엔 수정해야할 코드입니다 이렇게 쓰지 않습니다. 작동원리만 파악하려고 이해할 수 있는 코드를 썼다는 것이 의의)
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//       // 이코드 반복적이지요? 이웃이웃이웃을 호출하는 경우라면 계쏙 복붙해야할까요?
//       // 중복코드 쓰기 개같죠? helper function을 만들어볼 시간입니다.
//       // And this helper function will wrap up the fetch, the error handling, and also the conversion to JSON
//       // because in my opinion, it's really a bit cumbersome to having to do all these steps all the time.
//       // 펫치받고 그 리스폰스를 json으로 바꾸고 나서야 우리가 핸들링 할수 있다. 이건 우리가 가져올 이웃이 늘어나도 마찬가지일 것이다. 이 일련의 작업을 하는 코드 전체를 하나의 function으로 만들어서 캡슐화 할겁니다.
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       // 4. 매우 보람차게도 우리가 저 위에 작성한 new 에러메시지가 뜬다 So exactly this, this is exactly the rejection that we created here by creating this new error.

//       // 그 어떤 콜백에서 발생한 그 어떤 에러든, 뉴런처럼 then 다 타넘고 캐치로 간다
//       renderError(`Somthing went wrong 💥💥 ${err.message}. Try again!`);
//       console.error(`${err} 💥💥💥`);
//     })

//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// // getCountryData('aespa');

// // 3
// // refactoring(이 강의 최종코드)
// // 3

// // 6. 이제 이게 한방에 일련의 펫치 과정을 다 처리 한다.
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1
//   // 7.
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);
//       // 지금 api가 바껴서 이웃 없으면 보더스가 없나봄 그래서 이거 강의 코드랑 다름
//       if (!data[0].hasOwnProperty(`borders`))
//         throw new Error('No neighbour found!');
//       const neighbour = data[0].borders[0];

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/name/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // btn.addEventListener('click', function () {
// //   getCountryData('russia');
// // });

// // getCountryData('china');

// // 개같이 없는 경우 확인
// getCountryData('aespa');
// // 이웃 없는 경우 확인
// getCountryData(`australia`);

// // Coding Challenge #1
// // Coding Challenge #1
// // Coding Challenge #1

// // In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates.
// // For that, you will use a second API to geocode coordinates.
// // So in this challenge, you’ll use an API on your own for the first time �

// // Your tasks:
// // PART 1
// // 1. Create a function 'whereAmI' which takes as inputs a latitude value('lat') and a longitude value('lng') (these are GPS coordinates, examples are in test data below).
// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 1000000
//     ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${
//         data.languages[data.cioc?.toLowerCase()]
//       }</p>
//       <p class="country__row"><span>💰</span>${
//         Object.keys(data.currencies)[0]
//       }</p>
//       </div>
//       </article>
//       `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const whereAmI = function (lat, lng) {
//   // 2. Do “reverse geocoding” of the provided coordinates.
//   // Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name.
//   // Use this API to do reverse geocoding: https://geocode.xyz/api.
//   // The AJAX call will be done to a URL with this format:
//   // https://geocode.xyz/52.508,13.381?geoit=json.

//   // Use the fetch API and promises to get the data.
//   // Do not use the 'getJSON' function we created, that is cheating �
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=939844197099445593250x389`
//   )
//     .then(
//       // 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
//       res => {
//         // 5. This API allows you to make only 3 requests per second.
//         // If you reload fast, you will get this error with code 403.(지금 시도해보니까 에러가 안나는데 에러가 난다고 가정하자)
//         // This is an error with the request.
//         // Remember, fetch() does not reject the promise in this case.
//         // So create an error to reject the promise yourself, with a meaningful error message

//         // console.log(res);
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//       }
//     )
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.state}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     })
//     // 4. Chain a .catch method to the end of the promise chain and log errors to the console
//     .catch(err => console.error(`${err.message}`));
// };

// // Test data:
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// // whereAmI(-33.933, 18.474);

// // PART 2
// // 6. Now it's time to use the received data to render a country.
// // So take the relevant attribute from the geocoding API result, and plug it into the countries API(https://restcountries.com/v3.1/name/${country}) that we have been using.

// // 7. Render the country and catch any errors, just like we have done in the last lecture(you can even copy this code, no need to type the same code)

// // GOOD LUCK �

// // Building a Simple Promise
// // Building a Simple Promise
// // Building a Simple Promise

// // 프로미스는 여느 빌트인 객체들처럼 Promise constructor로 만든다.
// // 그리고 딱 하나의 executor function이라는 인자를 받는다.
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('로또 추첨 시작 ...');
//   setTimeout(function () {
//     if (Math.random() > 0.5) {
//       // resolve 함수가 실행되면 promise가 풀필드, 혹은 리졸브드 됐다고 해준다.
//       resolve('You won! 🎉');
//     } else {
//       // reject 함수가 실행되면 promise가 rejected됐다고 해준다.
//       reject(new Error('You lost! 😭'));
//     }
//   }, 1234);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// // fetch가 하는 것처럼 이 안에서 프로미스를 만들고, 리턴할거다.
// const wait = seconds =>
//   // 타이머가 삑나는 경우는 없으므로 reject는 없어도 된다.
//   new Promise(function (resolve) {
//     // 그냥 기다리기만 하는게 목적이라 resolve에 따로 값을 줄 필요가 없다.
//     setTimeout(resolve, seconds * 1000);
//   });

// wait(1)
//   .then(() => {
//     console.log('1 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

// // much better than this:

// // setTimeout(() => {
// //   console.log(`1 second passed`);
// //   setTimeout(() => {
// //     console.log(`2 second passed`);
// //     setTimeout(() => {
// //       console.log(`3 second passed`);
// //       setTimeout(() => {
// //         console.log(`4 second passed`);
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// // 풀필드 혹은 리젝티드된 프로미스를 즉시 만드는 방법도 있다
// // Static methods
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error(`Problem!`)).catch(x => console.error(x));

// // Promisifying the Geolocation API
// // Promisifying the Geolocation API
// // Promisifying the Geolocation API

// // 기억하시죠? 겟커렌트포지션의 두 argument는 각각 성공, 실패시 호출되는 콜백이다.
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     // 콜백함수로 쓰이는 resolve
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));

// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 1000000
//     ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${
//         data.languages[data.cioc?.toLowerCase()]
//       }</p>
//       <p class="country__row"><span>💰</span>${
//         Object.keys(data.currencies)[0]
//       }</p>
//       </div>
//       </article>
//       `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       console.log(pos);
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=939844197099445593250x389`
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.state}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     })
//     .catch(err => console.error(`${err.message}`));
// };

// btn.addEventListener('click', whereAmI);

// // Consuming Promises with Async/Await
// // Consuming Promises with Async/Await
// // Consuming Promises with Async/Await
// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 1000000
//     ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${
//         data.languages[data.cioc?.toLowerCase()]
//       }</p>
//       <p class="country__row"><span>💰</span>${
//         Object.keys(data.currencies)[0]
//       }</p>
//       </div>
//       </article>
//       `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   // Geoloacation
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   // Reverse Geocoding
//   const resGeo = await fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=939844197099445593250x389`
//   );
//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);

//   // Country data
//   const res = await fetch(
//     `https://restcountries.com/v3.1/name/${dataGeo.country}`
//   );
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };

// whereAmI();
// console.log(`FIRST`);

// // Error Handling With try...catch
// // Error Handling With try...catch
// // Error Handling With try...catch
// // try{
// //   const x= 2
// //   x= 3
// // } catch(err) {
// // 	console.log(err) // TypeError: Assignment to constant variable.
// //   alert(err.message)
// // }
// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 1000000
//     ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${
//         data.languages[data.cioc?.toLowerCase()]
//       }</p>
//       <p class="country__row"><span>💰</span>${
//         Object.keys(data.currencies)[0]
//       }</p>
//       </div>
//       </article>
//       `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geoloacation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse Geocoding
//     const resGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=939844197099445593250x389`
//     );
//     if (!resGeo.ok) throw new Error(`Problem getting location data`);

//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error(`Problem getting country`);
//     const data = await res.json();

//     console.log(data);
//     renderCountry(data[0]);
//     // 에러 발생용
//     // renderCountry('asepa');
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);
//   }
// };

// // f5연타로 에러발생용
// whereAmI();
// whereAmI();
// whereAmI();
// whereAmI();
// console.log(`FIRST`);

// // 비동기 작업에서는 뭔가 잘못될 여지가 항상, 매우 많다.
// // 에러 핸들링에 꼭 익숙해져야한다.

// // // Returning Values from Async Functions
// // // Returning Values from Async Functions
// // // Returning Values from Async Functions

// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       data.population / 1000000
//     ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${
//         data.languages[data.cioc?.toLowerCase()]
//       }</p>
//       <p class="country__row"><span>💰</span>${
//         Object.keys(data.currencies)[0]
//       }</p>
//       </div>
//       </article>
//       `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // Geoloacation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse Geocoding
//     const resGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=939844197099445593250x389`
//     );
//     if (!resGeo.ok) throw new Error(`Problem getting location data`);

//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error(`Problem getting country`);
//     const data = await res.json();

//     renderCountry(data[0]);

//     return `You are in ${dataGeo.state}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// // const city = whereAmI();
// // console.log(city);

// console.log(`1: Will get location`);
// // 리턴하면 펫치처럼 펜딩상태의 프로미스를 바로 던지고, 비동기작업이 다 끝나면 우리가 리턴의 value에 준 값으로 풀필드된다.
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2. ${city}`);
//   } catch (err) {
//     console.error(`2. ${err.message} 💥`);
//   }
//   console.log(`3: Finished getting location`);
// })();

// Running Promises in Parallel
// Running Promises in Parallel
// Running Promises in Parallel
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(
      data.map(data => {
        const [capital] = data[0].capital;
        return capital;
      })
    );
  } catch (err) {
    console.error(`${err} 💥`);
  }
};

get3Countries('portugal', 'spain', 'france'); // (3) ['Lisbon', 'Madrid', 'Paris']
