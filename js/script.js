window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent'),
    btn = document.querySelectorAll('.description-btn');

  // console.log(tab);
  // console.log(info);
  // console.log(tabContent);
  // console.log(btn);


  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  //timer;

  let deadLine = '2018-12-02';

  function getTimeRemeining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()), //разница между датами. кол-во миллисекун,
      s = Math.floor((t / 1000) % 60).toString(),
      m = Math.floor((t / 1000 / 60) % 60).toString(),
      // h = Math.floor((t / (1000 * 60 * 60)));
      h = Math.floor((t / 1000 / 60 / 60) % 24).toString();
    // d = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'h': h,
      'm': m,
      's': s,
      // 'd': d
    };

  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      // days = timer.querySelector('.days'),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemeining(endtime);
      // days.textContent = t.d;
      // console.log(t.h);
      if (t.h.length < 2) {
        hours.textContent = '0' + t.h;
      } else {
        hours.textContent = t.h;
      }
      if (t.m.length < 2) {
        minutes.textContent = '0' + t.m;
      } else {
        minutes.textContent = t.m;
      }
      if (t.s.length < 2) {
        seconds.textContent = '0' + t.s;
      } else {
        seconds.textContent = t.s;
      }

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';

      }
    }
  }
  setClock('timer', deadLine);



  //вызываем поп ап
  let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

  more.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', () => {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';

  });

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
  }
  //первая попытка
  // for (let i in btn){
  //   btn[i].addEventListener('click',  () => {
  //     overlay.style.display = 'block';
  //     this.classList.add('more-splash');
  //     document.body.style.overflow = 'hidden';
  //   });
  // }

  //2я попытка
  // for (let i of btn) {
  //   i.addEventListener('ckick', () => {
  //     console.log('done');
  //   });

  // }

  let message = {
    loadding: 'Загррузка...',
    soccess: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };


  let form = document.querySelector('.main-form'),
    formF = document.querySelector('#form'),
    input = document.getElementsByTagName('input'),
    statusMessege = document.createElement('div');
  // console.log(formF);

  statusMessege.classList.add('status');

  function someName(a) {
    a.addEventListener('submit', function (e) {
      event.preventDefault();
      a.appendChild(statusMessege);

      let request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      // request.setRequestHeader('Content-Type', 'application/x-www-form-urrlencoded');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

      let formData = new FormData(a);
      let obj = {};
      formData.forEach(function (value, key) {
        obj[key] = value;
      });
      let json = JSON.stringify(obj);
      // request.send(formData);
      request.send(json);

      request.addEventListener('readystatechange', function () {
        if (request.readyState < 4) {
          statusMessege.innerHTML = message.loadding;
        } else if (request.readyState === 4 && request.status == 200) {
          statusMessege.innerHTML = message.soccess;
        } else {
          statusMessege.innerHTML = message.failure;
        }
      });

      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }
    });

  }
  someName(form);
  someName(formF);

//slides
  let slideIndex = 1, //первый слайд

    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');
  //функция скрытия все слайды, и показывала только один слайд. 
  //можно в аргумент передавать номер слайда, который будет показываться на странице
  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    slides.forEach((item) => item.style.display = 'none');

    // for (let i = 0; i < slides.length; i++) {
    //   slides[i].style.display = 'none';
    // }
    dots.forEach((item) => item.classList.remove('dot-active'));
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  prev.addEventListener('click', function () {
    plusSlides(-1);
  });

  next.addEventListener('click', function () {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', function (event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });


  //calc

  let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;
  totalValue.innerHTML = 0;

  persons.addEventListener('change', function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '' || restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * place.options[place.selectedIndex].value;
    }
  });

  restDays.addEventListener('change', function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '' || restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * place.options[place.selectedIndex].value;
    }
  });

  place.addEventListener('change', function () {
    if (restDays.value == '' || persons.value == '' || restDays.value == 0 || persons.value == 0) {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });

  persons.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  });

  restDays.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  });


});