window.onload = function () {
  const offset = document.querySelector('#lokiMenu').offsetHeight;
  let sections = {};
  document.querySelectorAll('section').forEach(e => {
    sections[e.id] = {
      top: e.offsetTop,
      bottom: e.offsetTop + e.offsetHeight
    };
  });
  let scrollSpy = () => {
    // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // 因平台不同有不同解讀方法
    const
      startY = document.scrollingElement.scrollTop, // 新語法可跨平台
      viewTop = startY + offset; //原滾動處下修至選單高度之偏移
    for (const key in sections) {
      if (sections[key].top <= viewTop && viewTop <= sections[key].bottom) {
        let turnOff = document.querySelector(`#lokiMenu a.active:not([href="#${key}"])`);
        if (turnOff) turnOff.classList.remove('active'); //如果存在持有.active但不是持有href=key的人，取消他的active
        let turnOn = document.querySelector(`#lokiMenu a[href="#${key}"]:not(.active)`);
        if (turnOn) turnOn.classList.add('active'); //如果存在未持有.active但持有href=key的人，增加他的active
      }
    };
  };

  let indexShown = () => {
    const
      viewWidth = document.scrollingElement.offsetWidth,
      indexBottom = document.querySelector('#lokiSlider').offsetHeight,
      targetMenu = document.querySelector('#lokiMenu'),
      targetArrow = document.querySelector('#lokiArrow'),
      startY = document.scrollingElement.scrollTop; // 新語法可跨平台

    if (viewWidth >= 992) { //屬於大螢幕時才會做判斷
      if (startY < indexBottom - offset) { //於slider內
        targetMenu.classList.remove('bg-dark');
        targetArrow.classList.remove('shown');
      } else {
        targetMenu.classList.add('bg-dark');
        targetArrow.classList.add('shown');
      }
    } else targetMenu.classList.add('bg-dark');
  }

  window.onscroll = () => {
    scrollSpy();
    indexShown();
  };
  window.onresize = () => { //當有人對window重新調整尺寸時
    indexShown();
  }
  scrollSpy();
  indexShown();

  // scroll to id  => idea by https://gist.github.com/andjosh/6764939
  document.querySelectorAll("#lokiMenu a,#lokiArrow a").forEach(e => {
    e.onclick = function (event) {
      event.preventDefault();
      const targetID = e.getAttribute("href");

      scrollToId(document.querySelector(targetID).offsetTop - offset + 1, 1500);
    };
  });

  function scrollToId(toY, duration) {
    const
      startNode = document.scrollingElement, // 新語法可跨平台
      startY = startNode.scrollTop,
      changeY = toY - startNode.scrollTop,
      startTime = +new Date();

    Math.easeInOutQuad = function (t, b, c, d) {
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    let animateScroll = function () {
      console.log(1);
      const currentTime = +new Date() - startTime;
      let val = Math.easeInOutQuad(currentTime, startY, changeY, duration);
      startNode.scrollTop = val;
      if (currentTime < duration) requestAnimationFrame(animateScroll); //frame pre 60/s => 100ms
    };
    animateScroll();
  }
};