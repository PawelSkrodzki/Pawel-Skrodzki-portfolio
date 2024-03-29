window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// date functions

const clockSpan = document.getElementById('time');
const dateSpan = document.getElementById('date');
const yearSpan = document.getElementById('year');

showTime = () => {
  clockSpan.innerHTML = `${moment().format('h:mm')}`;
  dateSpan.innerHTML = `${moment().format('DD.MM')}`;
  yearSpan.innerHTML = `${moment().format('YYYY')}`;
};
setInterval(showTime, 1000);

//  background grained

var options = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.08,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
};

grained('#main-grained', options);
grained('#loader-grained', options);

//SCROLLING FUNCTIONS

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
  window.addEventListener('touchmove', preventDefault, wheelOpt);
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// LOCOMOTIVESCROLL AND GSAP FUNCTION

let pageContainer = document.querySelector('.main-container');

gsap.registerPlugin(ScrollTrigger);

const locomotiveAndGsapInitializer = () => {
  ScrollTrigger.matchMedia({
    '(max-width: 767)': function () {
      const elementsToAnimate = [
        ...document.querySelectorAll(
          '.fadein-bottom-start, .fadein-top-start, .fadein-left-start, .fadein-right-start, .single-photo, .single-media, .project-photo-overlay'
        ),
      ];

      elementsToAnimate.forEach((element) => {
        element.style.opacity = '1';
        element.style.transition = '0s';
        element.style.transform = 'translateY(0)';
        element.style.transform = 'translateX(0)';
      });
    },
    '(min-width: 768px)': function () {
      const scroller = new LocomotiveScroll({
        el: pageContainer,
        smooth: true,
        multiplier: 0.7,
      });

      scroller.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
          return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: pageContainer.style.transform ? 'transform' : 'fixed',
      });

      let pinWrap = document.querySelector('.project-main-container');
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth / 2;

      gsap.to('.project-main-container', {
        scrollTrigger: {
          scroller: pageContainer,
          scrub: true,
          trigger: '.projects-section-container',
          pin: true,
          anticipatePin: 1,
          start: 'top top',
          end: pinWrapWidth,
        },
        x: -horizontalScrollLength,
        ease: 'none',
      });

      ScrollTrigger.addEventListener('refresh', () => scroller.update());

      ScrollTrigger.refresh();
    },
  });
};

// LOADER ANIMATION

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomMovementX = () => {
  const random = getRandomNumber(-3000, 3000);
  if (random < window.innerWidth / 1.9 && random > -(window.innerWidth / 1.9)) {
    return getRandomMovementX();
  } else return random;
};

const randomMovementY = () => {
  const random = getRandomNumber(-2000, 2000);
  if (random < window.innerHeight / 1.9 && random > -(window.innerHeight / 1.9)) {
    return randomMovementY();
  } else return random;
};

const loaderTl = anime
  .timeline({})
  .add({
    targets: '.loader-img',
    opacity: 1,
    delay: anime.stagger(250, { start: 300 }),
    begin: () => {
      anime({
        targets: '.counter',
        value: [1, 100],
        duration: 4000,
        easing: 'easeInOutCubic',
        round: 1,
      });
      disableScroll();
    },
  })
  .add(
    {
      targets: '.loader-img',
      easing: 'easeInOutCubic',
      translateX: getRandomMovementX,
      translateY: randomMovementY,
      rotate: () => {
        return anime.random(-360, 360);
      },
      duration: 2000,
      direction: 'alternate',
    },
    '-=800'
  )
  .add(
    {
      targets: '.loader-content',
      easing: 'easeInOutCubic',
      opacity: 0,
      duration: 1500,
    },
    '-=900'
  )
  .add(
    {
      targets: '#loader',
      easing: 'easeInOutCubic',
      opacity: 0,
      duration: 1500,
      complete: () => {
        document.body.style.overflow = 'show';
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
      },
    },
    '-=700'
  )
  .add(
    {
      targets: '.h-first-line',
      easing: 'easeInOutCubic',
      translateX: ['-100%', 0],
      duration: 2500,
    },
    '-=1000'
  )
  .add(
    {
      targets: '.h-second-line',
      easing: 'easeInOutCubic',
      translateX: ['120%', 0],
      duration: 2500,
    },
    '-=2500'
  )
  .add(
    {
      targets: '.h-portrait',
      easing: 'easeInOutCubic',
      opacity: [0, 1],
      duration: 700,
      begin: () => {
        const imgAnimation = anime({
          targets: '.h-portrait',
          easing: 'linear',
          loop: true,
          keyframes: [
            { translateY: 30, translateX: 20, duration: 700 },
            { translateY: 60, translateX: 0, duration: 700 },
            { translateY: 30, translateX: -20, duration: 700 },
            { translateY: 0, translateX: 0, duration: 700 },
          ],
        });
        locomotiveAndGsapInitializer();
        document.querySelector('.arrow-container img').style.opacity = 0;
      },
      complete: () => {
        const last = anime({
          targets: '.arrow-container img',
          easing: 'linear',
          duration: 1200,
          translateX: [-50, 50],
          loop: true,
          begin: () => {
            enableScroll();
            document.querySelector('.arrow-container img').style.opacity = 1;
          },
        });
      },
    },
    '-=500'
  );

// LOTTIE ANIMATIONS

const svgHireMe = document.querySelector('.hire-svg');
const svgHireMeContainer = document.querySelector('.hire-me-container');

const hireMeAnim = bodymovin.loadAnimation({
  wrapper: svgHireMe,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets5.lottiefiles.com/packages/lf20_3doegq7p.json',
});

svgHireMeContainer.addEventListener('mouseover', () => {
  const currentFrame = hireMeAnim.currentFrame;
  hireMeAnim.setDirection(1);
  hireMeAnim.goToAndPlay(currentFrame, true);
});

svgHireMeContainer.addEventListener('mouseout', () => {
  const currentFrame = hireMeAnim.currentFrame;
  hireMeAnim.setDirection(-1);
  hireMeAnim.goToAndPlay(currentFrame, true);
});

const svgContactMe = document.querySelector('.contact-svg');
const svgContactMeContainer = document.querySelector('.contact-me-container');

const contactMeAnim = bodymovin.loadAnimation({
  wrapper: svgContactMe,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets3.lottiefiles.com/packages/lf20_c47tkgvl.json',
});

svgContactMeContainer.addEventListener('mouseover', () => {
  const currentFrame = contactMeAnim.currentFrame;
  contactMeAnim.setDirection(1);
  contactMeAnim.goToAndPlay(currentFrame, true);
});

svgContactMeContainer.addEventListener('mouseout', () => {
  const currentFrame = contactMeAnim.currentFrame;
  contactMeAnim.setDirection(-1);
  contactMeAnim.goToAndPlay(currentFrame, true);
});

// MENU ANIMATIONS

const indexElement = document.querySelector('.index-menu');
const menuElement = document.querySelector('.menu');

const openMenu = () => {
  anime({
    targets: '.menu-item',
    easing: 'easeInOutCubic',
    opacity: [0, 1],
    translateX: [20, 0],
    delay: anime.stagger(200),
    duration: 500,
    begin: () => {
      menuElement.classList.add('open');
      menuElement.style.display = 'block';
    },
    update: () => {
      indexElement.onclick = 'null';
    },
  });
};

const closeMenu = () => {
  anime({
    targets: '.menu-item',
    easing: 'easeInOutCubic',
    opacity: 0,
    translateX: [0, 20],
    delay: anime.stagger(200),
    duration: 500,
    complete: () => {
      menuElement.classList.remove('open');
      menuElement.style.display = 'none';
    },
    update: () => {
      indexElement.onclick = 'null';
    },
  });
};

indexElement.addEventListener('click', () => {
  let isMenuOpen = menuElement.classList.contains('open');

  if (!isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
});

// CURSOR FUNCTIONS

if (window.innerWidth >= 992) {
  const cursor = document.querySelector('.cursor');
  const cursorAnimItems = [
    ...document.querySelectorAll(
      '.project-photo-overlay, .menu-project-title, .menu-item img, .media-link span, .media-link img , .studio-link span, .studio-link img '
    ),
  ];

  document.addEventListener('mousemove', (e) => {
    cursor.setAttribute('style', 'top: ' + (e.clientY - 4) + 'px; left: ' + (e.clientX - 4) + 'px;');
  });

  cursorAnimItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      cursor.classList.remove('active');
    });
  });

  const menuObject = document.querySelector('.index-menu');
  const menuCursorText = document.querySelector('.menu-cursor-text');

  menuObject.addEventListener('click', () => {
    let isMenuOpen = menuElement.classList.contains('open');
    if (!isMenuOpen) {
      menuCursorText.textContent = 'close';
    } else {
      menuCursorText.textContent = 'open';
    }
  });

  menuObject.addEventListener('mouseenter', () => {
    cursor.classList.add('active-menu');
  });

  menuObject.addEventListener('mouseout', () => {
    cursor.classList.remove('active-menu');
  });
}
