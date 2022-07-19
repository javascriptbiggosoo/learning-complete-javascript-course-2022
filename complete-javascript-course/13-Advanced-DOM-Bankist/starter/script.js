'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// 189하려고 긁어온 스크롤///////////
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////
// 189. Event Delegation: Implementing Page Navigation
// 189. Event Delegation: Implementing Page Navigation
// 189. Event Delegation: Implementing Page Navigation

// 자 이제 event delegation을 봅시다.
// 네비게이션에서 섹션으로 스무스 스크롤을 구현해볼거예요
// 페이지 네비게이션

// 자 네비게이션 앵커에 다 리스너를 줘 볼까요?
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     // HTML 보면 앵커에 href="#section--1" 를 해놨는데 id가 section--1 인 element로 가는 기능을 합니덩(부록) 스무스 스크롤 안할거면 이걸로도 거능;
//     e.preventDefault(); // 어차피 스무스 스크롤 구현할거니까 그거 이제 차단박음
//     const id = this.getAttribute('href'); // getAttribute 전에도 봤지요? 렐러티브 URL 그대로 뽑아준 애
//     // this.herf 하면 앱솔루트 URL 줌
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // 일단은 완성쓰

//     // 근데 만약 버튼이 10000개고 그걸 포이치로 저 콜백함수 다 붙인다면? 오우오우; 저 똑같은 콜백함수를 횟수 그대로, 10000개 복사본을 만들어쓴다~~
//     // 그건 성능 저하의 원인이 되므로 events delegation이란걸 해보죠
//   });
// });

// events delegation
// 만개의 버튼에 각각 콜백함수를 부여하는게 아니라 부모노드에 있는 하나의 함수가 타겟에게 함수를 갖다쓰도록 해준다
// 보면 알겠지만 JS에서 공식으로 만든건 아니고 널리 쓰이는 개발 패턴

// 1. 공통 조상에 이벤트 리스너를 달아줍니다.
// (전 시간 이해 잘 했나용? 자식을 클릭하면 이벤트 버블링에 의해 부모의 이벤트 리스너도 반응한다는)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. 이벤트가 어디서 발생했는지 확인합니다.
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////

// // 183. Selecting, Creating, and Deleting Elements
// // 183. Selecting, Creating, and Deleting Elements
// // 183. Selecting, Creating, and Deleting Elements

// // Selecting elements
// // Selecting elements

// // 요 documentElement가 html 문서이고 이걸 조작하면 스타일을 건드릴 수 있다
// console.log(document.documentElement); // 얘네는 쿼리셀렉터 나부랭이도 필요엄슴
// console.log(document.head); // 얘네는 쿼리셀렉터 나부랭이도 필요엄슴
// console.log(document.body); // 얘네는 쿼리셀렉터 나부랭이도 필요엄슴

// const allSections = document.querySelectorAll('.section');
// console.log(allSections); // NodeList(4) [section#section--1.section...

// // 이번에는 무슨 HTML컬렉션이라는게 return된다
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons); // HTMLCollection(9) [button.btn--text....
// // NodeList랑 다른점, 얘는 DOM이 바뀌는 즉시 실시간 업데이트가 된다는듯
// // 크롬 개발자도구에서 버튼 하나를 지우고 그대로 콘솔에서 console.log(allButtons)를 입력하면 현재 상태를 반영해서 HTMLCollection(8)이 출력되는데 반해
// // 위의 allSections의 경우 저 시점에서 가져온 값이 고정이라, section클래스 가진거 하나를 지운후 로그를 띄워도 console.log(allSections); 가 이전과 같은 NodeList(4)을 출력한다
// // 이 차이로 나중에 활용할 수 있는게 생긴다고하니 일단 킵인마인드

// console.log(document.getElementsByClassName('btn')); // 얘도 live(자막은 life라고나옴..) HTML collection를 리턴
// // 앞서 말한것 처럼 HTMLCollection를 유용하게 쓸 때가 있는데, 기본적으론 쿼리셀렉터, 쿼리셀렉터를 쓸 예정입니다

// // Creating and inserting elements
// // Creating and inserting elements

// // .insertAdjacentHTML은 배웠지용? ㅎㅎ

// const message = document.createElement('div'); // div를 만들었다. 다만 박아넣을 위치만 주면 화면에 뜰 수 있는데 아직 DOM 어느 곳에도 등록되지 않았다.
// message.classList.add('cookie-message');
// message.innerHTML = `We use cookied for improved functionality and analytics, <button class="btn btn--close-cookie">Got it!</button>`;

// const header = document.querySelector('.header');
// header.prepend(message); // 헤더의 가장 윗부분에 message를 담아보기
// header.append(message); // 헤더의 가장 아랫부분에 message를 담아보기
// // 위 prepend와 append를 같은 element에 써넣으면 나중에 실행되는 코드만 반영된다.
// // 그 이유는 DOM안에 있는 live element는 두 곳에 동시에 존재할 수 없기 때문이고, 그래서 live element인 message는 위아래 모두 있는게 아니라 append 메서드만 적용되서 아래에 박혀있는것
// // Dom element는 unique하기 때문에 항상 한 곳에만 있을 수 있다는걸 킵인마인드

// // 이러면 위아래 다 만들 수 있지
// // header.append(message.cloneNode(true));

// // Delete elements
// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// // 184. Styles, Attributes and Classes
// // 184. Styles, Attributes and Classes
// // 184. Styles, Attributes and Classes

// // 혹시 미래에 주석 추가중이라면 여기에 맞춰서 그냥 해주시면 됩니다 코드를 조금 지우거나 위치를 바꿔봤는데 이게 제가 이해가 편할 듯 해용

// // Styles
// message.style.backgroundColor = '#37383d';
// // style property가 css에서와는 다르게 camel case인거 기억하시지요?
// message.style.width = '120%';

// console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// // lement.style 프로퍼티는 class에 우리가 지정해넣은 속성은 저장해두지 않는다 이 코드에서 color는 css파일에서 직접 색상을 부여했는데 style.color로 아무것도 안나오는걸 볼 수 있다.
// console.log(message.style.color); //
// // element.style 프로퍼티는 inline style만 저장해두기 때문에 이것을 이용해서 모든 style을 다 읽어올 수는 없다. block 속성인 height는 나오는게 없다
// console.log(message.style.height); //

// // 암튼 스타일 프로퍼티로 우리가 지정은 할수 있는데 읽어오는건 다 못읽어온다는얘기

// // 그래도 뽑아오고싶어
// // getComputedStyle() 함수
// console.log(getComputedStyle(message)); // 이안에 모든 style property 담겨있음
// // (우리가 직접 css로 설정하지 않고 브라우저 등이 디폴트로 해놓은 값들도 포함)
// console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // 지금한거, 문자열로 리턴되는거 숫자로 뽑아온 후에 40 + px 해주기 height 커짐

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // 이렇게하면 css 에서 root에 커스텀프로퍼티(css 변수) 박는효과를 낼 수 이슴 setProperty 메소드 첫인자는 프로퍼티변수이름 두번째는 프로퍼티밸류

// // Attributes  (htmkl 파일 attribute 보면서 하세여)
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // Bankist logo
// console.log(logo.className); // nav__logo
// logo.alt = 'Beautiful minimalist logo';

// // getAttribute()
// // Non-standard
// // standard인 애들은 위처럼 바로 꺼내올 수 있는데 이렇게 designer 같은 개같은 attribute를 임의로 만들어 쓰면 그런건 logo의 property에 없고 못꺼내온다
// console.log(logo.designer); // undefined
// // 이런 개같은 애트리뷰트 꺼내오는법
// console.log(logo.getAttribute('designer')); // Jonas
// // relative URL absolute URL
// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // http://127.0.0.1:5500/complete-javascript-course/13-Advanced-DOM-Bankist/starter/#
// // 지금 보면 html파일에 적힌 이미지 주소랑 콘솔로그찍힌 주소가 다른데 콘솔에는 aabsulute URL이 출력된거라고함

// console.log(link.getAttribute('href')); // #
// // 그것도 겟 애트리뷰트로 꺼내오면 그냥 써놓은 relative URL 그대로를 가져옴. 이렇게 그대로 가져오는 것도 간혹 필요하니까 킵인마인드하라고

// // 이런걸 써먹을일이 있을까.. 암튼 개같은 애트리뷰트 만들어서 갖다박는법
// logo.setAttribute('company', 'Bankist');

// // Data attributes
// // 애트리뷰트 이름이 data로 시작되는 애들은 먼가 다름.. 암튼 먼가 다름..
// // 이 데이터 애트리뷰트는 항상 dataset 프로퍼티에 저장됨
// console.log(logo.dataset.versionNumber); // 3.0

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // 185. Implementing Smooth Scrolling
// // 185. Implementing Smooth Scrolling
// // 185. Implementing Smooth Scrolling
// // 다음 강의에서 스크롤이 불편해서 Features 쪽 링크를 지웠슴다 다시 돌려놔주셔야할겁니다

// // 옛날방식과 모던방식을 보여줄거예요
// // 누를곳
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// // 갈곳
// const section1 = document.querySelector('#section--1');

// // // modern smooth scrolling
// // btnScrollTo.addEventListener('click', function (e) {
// //   section1.scrollIntoView({ behavior: 'smooth' });
// // });
// // // 끝, 수고하셨슴다~ 아 ㅋㅋㅋㅋ

// // 원리를 알기위해 옛날 방법을 알아보자
// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   // .getBoundingClientRect(): top, right, bottom, left, x, y ,height, width가 담겨있다. x는 left, y는 top의 값과 일치한다.
//   // 주의할점은 top, left등이 페이지의 최상단으로부터 현재 element의 거리를 나타내는게 아니고 유저가 보고있는 브라우저 화면 끝부분과의 거리를 뱉어낸다.
//   // 즉 스크롤을 내린 후 클릭을 하면 값이 달라진다는 소리다.
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
//   // window.pageXOffset, window.pageYOffset: 현재 이용자가 X,Y 축에서 각 얼마나 스크롤 했는지 거리를 나타낸다

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );
//   // clientHeight, clientWidth:브라우저 창크기, 줄여보고 클릭해보셈 줄어듬

//   // Scrolling 옛날방식
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
// });

// // 188. Event Propagation in Practice
// // 188. Event Propagation in Practice
// // 188. Event Propagation in Practice

// // 스포: 이부분은 사실 대충 알만한 내용이다.

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// // 자 이벤트 핸들러를 붙여볼라고 합니다.
// // nav__link 클래스에 붙여줄건데 얘는 부모를 끝까지 따라가면 header란걸 알아주세요
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();

//   console.log('LINK', e.target, e.currentTarget);
// });
// // 부모들에도 리스너를 달아보자
// // 이걸 눌러서 확인해보면 이벤트가 부모에게 전달되고 자식에겐 안간다는 걸 볼 수 있지요?
// // 이렇게 올라가는걸 이벤트 버블링이라고 한다구요
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//     // target: 정확히 어디에서 event가 발생했는가
//     // currentTarget: 어디에서 이벤트를 받았는가
//     // 클릭 결과 셋 다 색은 다르지만 타겟은 Features nav__link 출력
//   },
//   true
//   // 이제 버블링 말고 캡처링을 봅시다.(스포: 별로 안중요)
//   // 분명 event는 document root에서 내려가는 캡처링 페이즈, 다시 타고 올라가는 버블링 페이즈 둘이 있다고 했는데 이 실습에서 리스너는 버블링 페이즈때만 eventlistening을 하고 있습니덩
//   // 왜냐하믄 그게 default라서,
//   // 캡처링 페이즈에 event를 받으려면 이벤트 리스너에 세번째 파라미터로 true를 주면됩니다.
//   // 왕부모인 .nav를 true로 바꾸고 출력해보면 NAV>>LINK>>CONTAINER입니다. 캡처링 페이즈에 이벤트를 받는다는 것을 알 수 있죠
//   // 혹시 이게 헷갈리면 전 강의 슬라이드를 다시 봅시다 ㅎㅎ
// );

// // 근데 캡쳐링은 요즘 딱히 쓰이는 경우는 없어용 버블링, 캡쳐링은 예전에 브라우저가 웹표준을 안지킬때나 신경써야했던 부분이고 요즘은 뭐..   딱히.. 라네

// // DOM Traversing
// // DOM Traversing
// // DOM Traversing

// const h1 = document.querySelector('h1');

// // Going downwards: child
// // Going downwards: child

// // 쿼리셀렉트는 document말고 element도 가질수 있었지요?
// console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]0: span.highlight1: span.highlightlength: 2[[Prototype]]: NodeList
// // querySelectorAll은 h1에서 얼마나 깊은 자식이든 다 꺼낸다(중요)
// // 직속 자식을 꺼내려고 할 때에도 querySelectorAll는 기어코 돔트리 끝까지 찍고 확인한다 어떤 상황에선 성능적으로 문제를 일으킬 수 있고 의도하지 않은 애들까지 가져올 수도 있겠다.

// // 자식
// console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]

// // 직속 자식
// console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

// // 첫째 자식
// h1.firstElementChild.style.color = 'white'; // 흰색

// // 막 자식
// h1.lastElementChild.style.color = 'crimson'; // 피색

// // Going upwards: parents
// // Going upwards: parents

// console.log(h1.parentNode); // div.header__title

// console.log(h1.parentElement); // div.header__title
// // element이자 node니깐 위랑 같아용

// // 직속 부모가 아니라 할아버지 이상을 찾을때는 closest로
// // 클로제스트은 쿼리셀렉터의 반대로 작동한다고 보믄 댐
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // 화면 노래짐
// h1.closest('h1').style.background = 'var(--gradient-primary)'; // 화면 초래짐
// // event delegation에서 쓰일 일이 많을거예용 기억해두면 좋아요

// // Going sideways: siblings
// // Going sideways: siblings

// // js에선 몇가지 이유땜에 인접해있는 자매에만 접근할 수 있덩
// console.log(h1.previousElementSibling); // 자기랑 부모 사이에 아무것도 ㅇ벗어서 null 뱉음
// console.log(h1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

// // 모든 자매 가져오기 trick
// console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

// /////////
// // h1 자매들 전부 찐따로(작아지게) 만드는 알고리즘
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
// // HTML 콜렉션이 배열 형태이긴 하지만  array메소드를 상속받지않아 JS array는 아니다.
// // 그래도 이터러블하고 array에 spread 할 수 있다.(js array로 변환시킬수도 있다.)

// // Building a Tabbed Component
// // Building a Tabbed Component
// // Building a Tabbed Component
// // goal: 탭하나 클릭하면 지금 보이는건 숨기고 숨긴걸 보이게 할 거여요

// const tabs = document.querySelectorAll('.operations__tab'); // 버튼 셋
// const tabsContainer = document.querySelector('.operations__tab-container'); // 컨테이너
// const tabsContent = document.querySelectorAll('.operations__content'); // 컨텐츠 셋

// tabsContainer.addEventListener('click', function (e) {
//   // 버튼에 있는 data-tab 애트리뷰트를 이용해야 탭을 꺼낼 수 있는데 버튼안에 span이 포함되어 있어 이 처리도 해줘야하는 까다로운 상황
//   // span에서 버블링되는 경우와
//   // 바로 button 누르는 경우가 있을 수 있다
//   // 족보를 타고올라 operations__tab인 부모에게 발동되도록하면 커버된다
//   const clicked = e.target.closest('.operations__tab'); // 클릭한 버튼
//   // 클로제스트는 이렇게 event delegation을 쓸 때 유용하다
//   // console.log(clicked);

//   // 아래는 버튼을 위한 작업인데 버튼 수준에선 당연히 문제 없지만 탭 컨테이너에 이벤트리스너를 달아놓은 상황이라 탭 컨테이너는 closest('.operations__tab')가 null이라 classList를 부르면 에러가 난다
//   // 이부분은 클릭해도 아무것도 안일어나게 해보죠
//   // Guard clause: 조건에 맞지 않으면 아무것도 안하고 바로 리턴하는 것
//   if (!clicked) return;
//   // 이제 null은 나오지만 거기에 클래스를 붙이려는 일이 없어서 에러는 없다능

//   // remove active classes
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(c => c.classList.remove('operations__content--active'));

//   // Active tab
//   clicked.classList.add('operations__tab--active');

//   // Active content area
//   // console.log(clicked.dataset.tab); // html보믄 data-tab 애트리뷰트 있음
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add(`operations__content--active`);
// });

// Passing Arguments to Event Handlers
// Passing Arguments to Event Handlers
// Passing Arguments to Event Handlers

// 링크 하나에 마우스를 hover하면 나머지는 페이드아웃시켜보자
// 이걸 통해 매우 배울 가치가 있는 how to pass arguments into event handler를 체험해봅니다

// 물론 첫 작업은 작업할 element를 골라야 겠지요
const nav = document.querySelector('.nav'); // 로고를 포함한 네비게이션 최상위 컨테이너

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // 최상단 찍고 거기서 찾기를 해볼건데여..
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // 두번 올라가는 대신 클로제스트를 써봅시다 만약 부모가 훨씬 많았더라도 이런식이면 굳이 여러번 확인하면서 타고 오를 필요가 없죠
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this; // 물론 클래스를 추가하는 방식이 낫겠지만 강의는 이게 핵심이 아니니깐
      }
    });
    logo.style.opacity = this;
  }
};

// Passing Arguments to Event Handlers
nav.addEventListener('mouseover', handleHover.bind(0.5)); //자,함수 호출이라면 그냥 argument를 때려박으면 될텐데 이벤트 핸들러는 함수 호출이 아니고 그냥 함수를 갖다 박지요?
// add event 리스너는 이벤트 핸들러로 '함수'가 올 것을 가정하고 작동하지만 '함수 호출'을 갖다넣으면 그것은 함수 실행의 결과, 즉 평범한 value다.
// 그래서 default argument주는 방식을 bind로 지정해놔야합니다
// bind에 argument로 준 값은 해당 함수의 this가 된다
// 이 this가 argument마냥 돌아갈 것이다.
// 이벤트 핸들러는 parameter로서 오직 e(event)만  가질 수 있기때문에 이런식으로 코딩하는것.
// eventHandler 함수에 다른 argument는 못들어감
// 다른 value를 넣고싶다면 이렇게 bind-this를 쓰면 됨다
// 하나 이상 넣고싶으면 그 this가 array 혹은 object면 되겠지요?

nav.addEventListener('mouseout', handleHover.bind(1));

// 추상화 팁: 일단은 함수로 만드는 것이 기본, parameter 로 줄 것이 무엇인가는 나중에 찾고 일단은 중복되는 코드의 차이를 비교한다
// 중복되든말든 일단 붙여넣고, 이실습의 경우 뭐가 다른가 보니 opacity부분이었음

// Lifecycle DOM Events
// // Lifecycle DOM Events
// // Lifecycle DOM Events
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(`HTML parsed and DOM tree built!`, e);
// }); // DOMContentLoaded 이벤트는 DOM이 다 완성되면 발생한다

// window.addEventListener('load', function (e) {
//   console.log(`Page fully loaded`, e);
// }); // load 이벤트는 모든 리소스가 로드되면 발생한다

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(`Page is about to close`, e);
//   e.returnValue = '';
// }); // beforeunload 이벤트는 페이지가 종료되기 전에 발생한다
// // 탭닫기나 즐겨찾기 페이지로 이동하면 프롬프트 띄우게하는 코드인데
// // 이거 현재 작동안험. 제한적인 상황에서만 되는듯
// // 이게 바로 예전 브라우저의 함정카드인듯
// // 이제는 글 작성중인데 나가실래요? 묻는정도라고 쓰고 남용은 무조건 지양하라고함
