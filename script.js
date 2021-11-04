window.onload = function(){

  //스크롤 속도
  window.addEventListener('scroll', throttle(parallax, 14));

  function throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  };
  function parallax() {
    var scrolled = window.pageYOffset;
    var parallax = document.querySelector(".title");
    var coords = (scrolled * -0.6) + 'px'
    parallax.style.transform = 'translate(-50%,' + coords + ')';
  };

  //스크롤 위치
  var checkScroll = function(){
    requestAnimationFrame(checkScroll);
    const vmbtnsWrap = document.querySelector('.vmbtns-wrap');
    const mainCanvas = document.querySelector('main');
    var mainPosY = mainCanvas.getBoundingClientRect().top;

    if(!vmbtnsWrap.getAttribute("class").includes('fade-in')){
      if(mainPosY < -100) {
        vmbtnsWrap.classList.remove('noshow');
        vmbtnsWrap.classList.remove('fade-out')
        vmbtnsWrap.classList.add('fade-in');
      }
    }
    if(vmbtnsWrap.getAttribute("class").includes('fade-in')){
      if(mainPosY >= -100) {
        vmbtnsWrap.classList.remove('fade-in');
        vmbtnsWrap.classList.add('fade-out');
      }
      
    }
  }
  checkScroll();
}

//팝업 닫기
var closePop = function(){
  const popWindow = document.querySelector('#pop-window');
  popWindow.classList.add('popdown');

  // if(!popWindow.getAttribute('class').includes('noshow')){
  //   popWindow.classList.add('noshow');
  // }
}

//click 인식이 이상한듯
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener("click", closePop());