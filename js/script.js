const clockSpan = document.getElementById('time');
const dateSpan = document.getElementById('date');
const yearSpan = document.getElementById('year');

showTime = () => {
  clockSpan.innerHTML = `${moment().format('h:mm')}`;
  dateSpan.innerHTML = `${moment().format('DD.MM')}`;
  yearSpan.innerHTML = `${moment().format('YYYY')}`;
};
setInterval(showTime, 1000);

var options = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.08,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
};

//  background animation

grained('#main-grained', options);
grained('#loader-grained', options);

// loader animation

const loaderAnimation = () => {
  const loaderTl = anime
    .timeline({})
    // .add({
    //   targets: '.loader-img',
    //   opacity: 1,
    //   delay: anime.stagger(250, { start: 300 }),
    //   begin: () => {
    //     anime({
    //       targets: '.counter',
    //       value: [1, 100],
    //       duration: 4000,
    //       easing: 'easeInOutCubic',
    //       round: 1,
    //     });
    //   },
    // })
    // .add(
    //   {
    //     targets: '.loader-content',
    //     easing: 'easeInOutCubic',
    //     opacity: 0,
    //     duration: 1500,
    //   },
    //   '-=900'
    // )
    // .add(
    //   {
    //     targets: '#loader',
    //     easing: 'easeInOutCubic',
    //     opacity: 0,
    //     duration: 1500,
    //     complete: () => {
    //       const loader = document.getElementById('loader');
    //       loader.style.display = 'none';
    //     },
    //   },
    //   '-=700'
    // )
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
        targets: '.fade-in-top',
        easing: 'easeInOutCubic',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
      },
      '-=900'
    )
    .add(
      {
        targets: '.h-portrait',
        easing: 'linear',
        opacity: [0, 1],
        keyframes: [
          { translateY: -20, translateX: -20, duration: 500 },
          { translateY: -40, translateX: 0, duration: 500 },
          { translateY: -20, translateX: 20, duration: 400 },
          { translateY: -1, translateX: -2, duration: 400 },
          { translateY: -9, translateX: -15, duration: 400 },
          { translateY: -15, translateX: 0, duration: 400 },
        ],
      },
      '-=700'
    );
};

loaderAnimation();

<<<<<<< HEAD
const fadeInBottomCollection = document.getElementsByClassName('fadein-bottom');
const fadeInBottomArray = [].slice.call(fadeInBottomCollection);

const fadeInBottomAnimation = () => {
  fadeInBottomArray.forEach((object) => {
    object.style.opacity = 0;

    new Waypoint({
      element: object,
      handler: function () {
        anime({
          targets: object,
          easing: 'easeInOutCubic',
          duration: 1000,
          opacity: [0, 1],
          translateY: [20, 0],
          loop: false,
        });
        this.destroy();
      },
      offset: '75%',
    });
  });
};

fadeInBottomAnimation();

const projectsAnimationTrigger = document.querySelector('.projects-timeline');
const projectsContainer = document.querySelector('.project-main-container');

const projectsAnimation = () => {
  projectsAnimationTrigger.style.opacity = 0;
  projectsContainer.style.transform = 'rotate(13deg) translateX(100%) ';

  new Waypoint({
    element: projectsAnimationTrigger,
    handler: function () {
      const tl = anime
        .timeline({
          easing: 'easeInOutCubic',
        })
        .add({
          targets: '.projects-h',
          keyframes: [
            { opacity: 1, duration: 1 },
            { translateY: ['200%', 0], duration: 800 },
          ],
        })
        .add(
          {
            targets: '.project-main-container',
            translateX: 0,
            duration: 2000,
          },
          '-=700'
        );
      this.destroy();
    },
    offset: '75%',
  });
};

projectsAnimation();

const junorPositionTrigger = document.querySelector(
  '.junior-position-container'
);

const juniorPositionHeadingsCollection = document.querySelectorAll(
  '.position-h'
);

const juniorPositionHeadingsArray = [].slice.call(
  juniorPositionHeadingsCollection
);

const juniorPositionAnimation = () => {
  juniorPositionHeadingsArray.forEach((heading) => {
    heading.style.transform = 'translateY(115%)';
  });

  new Waypoint({
    element: junorPositionTrigger,
    handler: function () {
      const tl = anime
        .timeline({
          easing: 'easeInOutCubic',
        })
        .add({
          targets: '.position-h',
          translateY: 0,
          duration: 1000,
        })
        .add({
          targets: '.position-h',
          translateY: 0,
          duration: 1000,
        })
        .add(
          {
            targets: '.position-h-overlay-1',
            easing: 'easeInOutCubic',
            keyframes: [
              { translateX: [300, 0], translateY: [200, 0], duration: 1600 },
            ],
          },
          800
        )
        .add(
          {
            targets: '.position-h-overlay-2',
            easing: 'easeInOutCubic',
            keyframes: [
              { translateX: [-200, 0], translateY: [200, 0], duration: 1600 },
            ],
          },
          800
        )
        .add(
          {
            targets: '.position-h-overlay-3',
            easing: 'easeInOutCubic',
            keyframes: [
              { translateX: [300, 0], translateY: [200, 0], duration: 1600 },
            ],
          },
          800
        )
        .add(
          {
            targets: '.position-p',
            opacity: [0, 1],
            translateY: [100, 0],
          },
          '-=500'
        );
      this.destroy();
    },
    offset: '60%',
  });
};

juniorPositionAnimation();
=======
var controller = new ScrollMagic.Controller();

const animatedObjectsCollection = document.getElementsByClassName('animated-p');
const animatedObjectsArray = [].slice.call(animatedObjectsCollection);

new ScrollMagic.Scene({
  triggerElement: '#animate',
  triggerHook: 0.9, // show, when scrolled 10% into view
  offset: 50, // move trigger to center of element
})
  .setVelocity('#animate', { opacity: 0 }, { duration: 400 })
  .addTo(controller);

animatedObjectsArray.forEach((object) => {});
>>>>>>> fe2696cafd813ffeef13b7d9a923403261cc458c

// zapasowy kod animacji loadera

// const img1 = document.getElementById('loader-img1');
// const img2 = document.getElementById('loader-img2');
// const img3 = document.getElementById('loader-img3');
// const img4 = document.getElementById('loader-img4');
// const img5 = document.getElementById('loader-img5');
// const img6 = document.getElementById('loader-img6');
// const img7 = document.getElementById('loader-img7');
// const img8 = document.getElementById('loader-img8');
// const img9 = document.getElementById('loader-img9');
// const img10 = document.getElementById('loader-img10');
// const img11 = document.getElementById('loader-img11');

// imgArray1 = [img1, img2, img3, img4];
// imgArray2 = [img5, img6, img7, img8, img9, img10, img11];

// imgArray1.forEach((img) => {
//   img.style.opacity = 0;
// });

// imgArray2.forEach((img) => {
//   img.style.opacity = 0;
// });

// anime({
//   targets: imgArray1,
//   opacity: 1,
//   duration: 1000,
//   delay: anime.stagger(250, { start: 300 }),
//   endDelay: -800,
//   begin: () => {
//     anime({
//       targets: '.counter',
//       value: [1, 100],
//       duration: 4000,
//       easing: 'easeInOutCubic',
//       round: 1,
//     });
//   },
//   complete: () => {
//     anime({
//       targets: imgArray2,
//       opacity: 1,
//       duration: 1000,
//       delay: anime.stagger(250),
//       endDelay: -650,
//       loop: 1,
//       complete: () => {
//         anime({
//           targets: imgArray2,
//           opacity: 0,
//         });
//       },
//     });
//   },
// });
