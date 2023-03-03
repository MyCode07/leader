import { gsap } from "gsap";

import ScrollToPlugin from "gsap/ScrollToPlugin.js";
import ScrollTrigger from "gsap/ScrollTrigger.js";

const tl = gsap.timeline()

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', function (e) {
    const slider = document.querySelector('.home__slider-wrapper');
    let speed = 1;
    let locked = false;

    if (slider) {
        if (document.querySelector('.home').getBoundingClientRect().top == 0 && window.innerWidth > 800) {
            // document.body.classList.add('_noscroll')

            // problema
        }

        const scrollHeight = slider.scrollHeight - window.innerHeight;
        let delay = 0
        if (window.innerWidth > 800) {
            delay = 0.5
        }

        tl.to('.home__slider', {
            opacity: 1,
            duration: 0.5,
            delay: delay,
            onComplete: function () {

                let interval = setInterval(() => {
                    if (window.innerWidth > 800) {
                        if (speed < scrollHeight && locked == false) {
                            speed++;

                            slider.style.transform = `translateY(${-speed}px)`;
                        }
                        if (speed == scrollHeight) {
                            aimationEnd = true
                        }
                    }
                    else {
                        clearInterval(interval);
                    }

                }, 16);

            }
        })



        let aimationEnd = false
        document.querySelector('.home').addEventListener('wheel', function (e) {
            const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

            if (document.querySelector('.home').getBoundingClientRect().top == 0 && window.innerWidth > 800) {
                locked = true;

                speed += e.deltaY;

                if (speed < 0) {
                    speed = 0
                }
                if (speed > scrollHeight) {
                    speed = scrollHeight

                    if (delta == -1) {
                        // document.body.classList.remove('_noscroll')
                    }
                    aimationEnd = true
                }
                else {
                    // document.body.classList.add('_noscroll')
                }

                slider.style.transform = `translateY(${-speed}px)`;

                setTimeout(() => {
                    locked = false;
                }, 1000);
            }
        });

        window.addEventListener('scroll', (e) => {
            if (document.querySelector('.home').getBoundingClientRect().top == 0 && window.innerWidth > 800) {
                // document.body.classList.add('_noscroll')
            }
        })
    }
})



tl.to('h1 span i', {
    height: 'auto',
    duration: 0.5,
    delay: 0.5,
    stagger: 0.5
})

tl.to('h2 span i', {
    height: 'auto',
    duration: 0.5,
    delay: 0.5,
    stagger: 0.5
})
