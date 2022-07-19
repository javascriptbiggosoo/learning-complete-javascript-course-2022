'use strict';
// 지난 리팩토링처럼 일일이 쿼리셀렉터로 땡겨오는게 아니라 자주 쓰는건 미리 변수로 선언해두자

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  // classList property는 두개의 method를 가졌어요(remove, add)
  modal.classList.remove('hidden');
  // 클래스 이름을 갖다 쓰는데 '.hidden' 이 아니다??
  // 애초에 class를 가져올 것이 전제이기에 클래스임을 구분하기 위한 dot이 필요가 없는 것.. (처음엔 오히려 헷갈려. 오히려 안좋아. 하지만 나중엔? 오히려 좋아.)
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  console.log('Button clicked');
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
console.log(btnOpenModal);
for (let i = 0; i < btnOpenModal.length; i++) {
  console.log(btnOpenModal[i]);

  btnOpenModal[i].addEventListener(
    'click',
    // 이 function은 event handler라고 한다.
    // 여태 event handler를 익명함수 통째로 박아 넣다가 처음으로 선언된 함수를 호출했다.
    //'함수()'가 아닌 '함수'를 갖다쓰는건 생소할 수 있다.
    // 함수()는 함수 호출이다.
    // 그러니까 'click', openModal()을 입력하는건 그냥 함수를 실행해버리는거다
    // 이 경우는 함수를 실행하는것 목표이고
    // argument로 '함수 호출'을 원하는 것이 아니라 호출할 '함수'를 원하는 것이다.
    // 암튼 설계가 그렇게 됐다는 소리. 예전엔 뭔가 와닿지 않았는데 지금은 받아들여지는 부분
    openModal
    // 만약 뒤에 괄호를 붙인다면(openModal() << 이모양) 그냥 첨부터 모달이 열려있다.
    // 그리고 버튼을 눌러도 모달이 열리지 않는다.

    // 1. 코드 실행 직후 '함수'호출에 의해 모달이 열린 것
    // 2. 함수가 아닌 함수호출이 들어가있다. 즉 '함수호출'호출이 되고 이 함수호출호출은 모달을 여는 기능이 없다.
  );
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

const escapeNow = function (e) {
  // 우리 핸들러 펑션은 이벤트가 일어나길 기다리고 있습니다.
  // (그) 이벤트가 실행되면 js가 한 object를 생성합니다.
  // 그 object는 모든 정보를 갖고있구요.
  // 이벤트 핸들러 함수에 만들어진 object를 받아오는법? parameter에 아무거나 넣으면 그 argument로 해당 object가 쏙 들어옴;
  // 물런 무슨 이름을 주던 ㄱㅊ
  // 여기서 e parameter에는 그저 아까 JS가 만든 object가 argument로 갈 뿐임
  console.log(e);
  // 이걸로 키를 입력할 때마다 keyboardEvent objectdml key key(키-키 ㅋㅋ)가 바뀌는 것을 볼 수 있지요?
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  // contains는 in 비스무리인데 classList의 전유물은 아님!
};

// 이번에 쓸 키보드 입력은 클릭처럼 특정 element가 대상이 아니다.
// 어디서 esc를 누르든 모달이 꺼지게 할 것이고 이런걸 글로벌 이벤트라고 한다.
document.addEventListener('keydown', escapeNow);
// document 자체도 addEventListener 메소드를 갖고있다.
