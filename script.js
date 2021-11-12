
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

//스크롤에 따른 view method 버튼 + sound
let soundvol = document.getElementById("storm");
soundvol.volume = 0.8;

var checkScroll = function(){
  requestAnimationFrame(checkScroll);
  const vmbtnsWrap = document.querySelector('.vmbtns-wrap');
  const mainCanvas = document.querySelector('main');
  var mainPosY = mainCanvas.getBoundingClientRect().top;

  if(!vmbtnsWrap.getAttribute("class").includes('fade-in')){
    if(mainPosY < -100) {
      vmbtnsWrap.classList.remove('noshow');
      setTimeout(() => vmbtnsWrap.classList.add('fade-in'), 100);
    }
  }
  if(vmbtnsWrap.getAttribute("class").includes('fade-in')){
    if(mainPosY >= -100) {
      vmbtnsWrap.classList.remove('fade-in');
      setTimeout(() => vmbtnsWrap.classList.add('noshow'), 100);
    }
  }
  if(mainPosY >= -1000 && mainPosY < 0){
    soundvol.volume = 0.8 + 0.0005*mainPosY;
  }if(mainPosY >= 0) {
    soundvol.volume = 0.8;
  }if(mainPosY < -1000) {
    soundvol.volume = 0.2;
  }
}
checkScroll();

//데이터 매니징

let requestURL = "https://raw.githubusercontent.com/himy3210/semi-basement/main/article.json";
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text';
request.send();
request.onload = function() {
  const datatext = request.response;
  const data = JSON.parse(datatext);
  loadLists(data, "지역", 0);
  loadLists(data, "장애", 1);
  loadLists(data, "국적", 2);
  loadLists(data, "젠더", 3);
  loadLists(data, "교육", 4);
  loadLists(data, "나이", 5);
  loadLists(data, "소득", 6);
  unitArr.push(document.querySelectorAll('.unit'));
  addlistener();
}

const content = document.querySelectorAll('#Lists-title');
let tagname; let tagindex; let unitArr = new Array();

function loadLists(jsonObj, tagname, tagindex) {
  const eArticles = jsonObj['eArticle'];
  const thesis = jsonObj['Thesis'];
  const journal = jsonObj['Journal'];

  for(let i = 0; i < eArticles.length; i++) {
    if (eArticles[i].tags[0] == tagname) {
      if (eArticles[i].similarity == 1) {
        const subli = document.createElement('li');
        subli.classList.add('unit');
        subli.textContent = eArticles[i].title;
        content[tagindex].appendChild(subli);
      }
      if (!eArticles[i].similarity == 1) {
        continue;
      }  
    }
    if (!eArticles[i].tags[0] == tagname) {
      continue;
    }
  }
  for(let i = 0; i < thesis.length; i++) {
    if (thesis[i].tags[0] == tagname) {
      if (thesis[i].similarity == 1) {
        const subli = document.createElement('li');
        subli.classList.add('unit');
        subli.textContent = thesis[i].title;
      content[tagindex].appendChild(subli);
      }
      if (!thesis[i].similarity == 1) {
        continue;
      }  
    }
    if (!thesis[i].tags[0] == tagname) {
      continue;
    }
  }
  for(let i = 0; i < journal.length; i++) {
    if (journal[i].tags[0] == tagname) {
      if (journal[i].similarity == 1) {
        const subli = document.createElement('li');
        subli.classList.add('unit');
        subli.textContent = journal[i].title;
      content[tagindex].appendChild(subli);
      }
      if (!journal[i].similarity == 1) {
        continue;
      }  
    }
    if (!journal[i].tags[0] == tagname) {
      continue;
    }
  }
}

//팝업 열기

let index; let compareT;
const popSubtitle = document.querySelector('.subtitle h2');
const popInfo = document.querySelector('.info h3');
const popPeNews = document.querySelector('.e-news h6');
const popLink = document.querySelector('.p-link a');
let titledata;

function openPop(index){
  compareT = unitArr[0][index].textContent;
  
  //내용 초기화
  popSubtitle.textContent = "";
  popInfo.textContent = "";
  popPeNews.textContent = "";
  popLink.setAttribute('href', "");
  popPeNews.setAttribute('id', "");

  //내용 로드
  let requestURL2 = "https://raw.githubusercontent.com/himy3210/semi-basement/main/article.json";
  let request2 = new XMLHttpRequest();
  request2.open('GET', requestURL2);
  request2.responseType = 'text';
  request2.send();
  request2.onload = function() {
    const datatext = request2.response;
    const data = JSON.parse(datatext);
    compareTitle(data, compareT);
  }
}

function compareTitle(jsonObj, titledata) {
  const eArticles = jsonObj['eArticle'];
  const thesis = jsonObj['Thesis'];
  const journal = jsonObj['Journal'];

  for(let i = 0; i < eArticles.length; i++) {
    if (eArticles[i].title == titledata) {
      popSubtitle.textContent = eArticles[i].title;
      popInfo.textContent = eArticles[i].name + ", " + eArticles[i].press + ", " + eArticles[i].date;
      popPeNews.innerHTML = eArticles[i].paragraph;
      popLink.setAttribute('href', eArticles[i].link);
    } if (!eArticles[i].title == titledata) {
      continue;
    }
  }

  for(let i = 0; i < thesis.length; i++) {
    if (thesis[i].title == titledata) {
      popSubtitle.textContent = thesis[i].title;
      popInfo.textContent = thesis[i].name + ", " + thesis[i].date;
      popPeNews.textContent = thesis[i].paragraph;
      popPeNews.setAttribute('id', "non-news");
      popLink.setAttribute('href', thesis[i].link);
    } if (!thesis[i].title == titledata) {
      continue;
    }
  }

  for(let i = 0; i < journal.length; i++) {
    if (journal[i].title == titledata) {
      popSubtitle.textContent = journal[i].title;
      popInfo.textContent = journal[i].name + ", " + journal[i].date;
      popPeNews.innerHTML = journal[i].paragraph;
      popPeNews.setAttribute('id', "non-news");
      popLink.setAttribute('href', journal[i].link);
    } if (!journal[i].title == titledata) {
      continue;
    }
  }
} 

const popWindow = document.querySelector('#pop-window');
const body = document.querySelector('body');

function addlistener() {
  for(let a = 0; a < unitArr[0].length; a++) {
    console.log("add " + a);
    unitArr[0][a].addEventListener("click", ()=>{
      console.log("click " + a);
      openPop(a);
      popWindow.setAttribute('class', "");
      body.setAttribute('class', 'scroll-lock');
    })
  }
}


//팝업 닫기
var closePop = function(){
  if(!popWindow.getAttribute('class').includes('popdown')){
    popWindow.setAttribute('class', 'fade-out');
    setTimeout(() => popWindow.classList.add('noshow'), 200);

    body.classList.remove('scroll-lock');
  }
}

const closeBtn = document.querySelector('.close');


//ABOUT 화면
const aboutBtn = document.querySelector('.about'); 
aboutBtn.addEventListener("click", () =>{
  const abtPg = document.querySelector('#aboutPage');
  const footer = document.querySelector('.footer');

  body.classList.toggle('scroll-lock');
  abtPg.classList.toggle('noshow');

  //아래로 
  if(!abtPg.getAttribute("class").includes('noshow') && !footer.getBoundingClientRect().top==0){
    var abtPosY = footer.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: abtPosY,
      behavior: 'smooth'
    });
  }

  //위로
  if(abtPg.getAttribute("class").includes('noshow') && footer.getBoundingClientRect().top==0){
    var abtPosY2 = abtPosY - window.innerHeight + 60
    window.scrollTo({
      top: abtPosY2,
      behavior: 'smooth'
    });
  }
});



// function goToScroll() {
//   const abtPg = document.querySelector('#aboutPage');
//   abtPg.setAttribute('class','');
//   let abtPosY = abtPg.getBoundingClientRect().top;
//   window.scrollTo( 0, 8738);
//   //body.classList.add('scroll-lock');
// }
