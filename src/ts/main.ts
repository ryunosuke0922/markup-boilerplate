import ScrollMagic from 'ScrollMagic';
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

class ScrollFade {
  constructor(targetClass = '.js-scroll-fade') {
    const animationClass = 'is-animation';

    const section = document.querySelectorAll(`${targetClass}:not(.is-animation)`);
    if (section.length === null) {
      return;
    }

    const controller = new ScrollMagic.Controller();
    for (let i = 0; i < section.length; i++) {
      const scene = new ScrollMagic.Scene({
        triggerElement: section[i],
        triggerHook: 'onEnter',
        reverse: false,
        offset: 200,
      }).addTo(controller);
      scene.on('enter', () => {
        section[i].classList.add(animationClass);
      });
      scene.on('leave', () => {
        section[i].classList.remove(animationClass);
      });
      // scene.on('end', () => {});
    }
  }
}

new ScrollFade();
